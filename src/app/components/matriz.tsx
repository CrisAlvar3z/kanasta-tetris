'use client';

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { BlockProp, ButtonRotateProp, MatrizProp } from "@/app/types";
import Image from 'next/image';

import Rotate90Deg from "@/app/assets/rotate-cw-svgrepo-com.svg";
import RotateNeg90Deg from "@/app/assets/rotate-Ccw-svgrepo-com.svg";
import { CleanButton } from "./clean-button";
import ShareButton from "./share-button";


export default function Matriz({ initialBlocks }: MatrizProp) {
  const [blocks, setBlocks] = useState(initialBlocks);
  const router = useRouter();

  // Leer los parámetros de búsqueda y aplicar el estado al cargar la página
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const coloredBlocks = query.get('coloredBlocks');

      if (coloredBlocks) {
        const parsedBlocks = coloredBlocks.split(',').map(pos => {
          const [row, col] = pos.split('-').map(Number);
          return { row, col, isColored: true };
        });

        setBlocks((prevBlocks) =>
          prevBlocks.map((block) => {
            const matchingBlock = parsedBlocks.find(b => b.row === block.row && b.col === block.col);
            return matchingBlock ? { ...block, isColored: matchingBlock.isColored } : block;
          })
        );
      }
    }
  }, [router]);

  //Actualizar estado cuando se modifiquen los bloques
  useEffect(() => {
    updateSearchParams();
  }, [blocks]);

  // Función para actualizar los parámetros de búsqueda con el estado de los bloques
  const updateSearchParams = () => {
    const coloredBlocks = blocks
      .filter(block => block.isColored)
      .map(block => `${block.row}-${block.col}`)
      .join(',');

    console.log(`Updating search params: ?coloredBlocks=${encodeURIComponent(coloredBlocks)}`); // Debugging line
    router.push(`/?coloredBlocks=${encodeURIComponent(coloredBlocks)}`);
  };

  // Función para manejar el clic en un bloque y pintarlo
  const paintBlock = (row: number, col: number) => {
    const newBlocks = blocks.map((block) =>
      block.row === row && block.col === col
        ? { ...block, isColored: !block.isColored } // Alterna el estado del bloque
        : block
    );
    setBlocks(newBlocks);
  };

  // Función para rotar solo los bloques pintados dentro de la matriz
  const rotateColoredBlocks = (degree: number) => {
    const newBlocks = Array.from({ length: 5 }, (_, row) =>
      Array.from({ length: 5 }, (_, col) => ({
        row,
        col,
        isColored: false
      }))
    ).flat();

    blocks.forEach((block) => {
      if (block.isColored) {
        const newRow = degree === 90 ? block.col : 4 - block.col;
        const newCol = degree === 90 ? 4 - block.row : block.row;
        const updatedBlock = newBlocks.find(
          (b) => b.row === newRow && b.col === newCol
        );
        if (updatedBlock) {
          updatedBlock.isColored = true;
        }
      }
    });

    setBlocks(newBlocks);
  };

  // Función para limpiar todos los bloques pintados
  const cleanBlocks = () => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) => ({ ...block, isColored: false }))
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <section className="flex justify-center gap-4">
        <ButtonRotate degree={90} rotateColoredBlocks={rotateColoredBlocks} />
        <Grid blocks={blocks} paintBlock={paintBlock} />
        <ButtonRotate degree={-90} rotateColoredBlocks={rotateColoredBlocks} />
      </section>
        
      <section className="flex gap-2 justify-center">
        <CleanButton cleanBlocks={cleanBlocks} />
        <ShareButton />
      </section>

    </div>

  );
}

const Grid = ({ blocks, paintBlock }: { blocks: BlockProp[]; paintBlock: (row: number, col: number) => void }) => {
  return (
    <div className="grid grid-cols-5 gap-1">
      {blocks.map((block) => (
        <Block key={`${block.row}-${block.col}`} block={block} paintBlock={paintBlock} />
      ))}
    </div>
  );
}

const Block = ({ block, paintBlock }: { block: BlockProp; paintBlock: (row: number, col: number) => void }) => {
  return (
    <div
      className={`w-[80px] h-80px] border border-black cursor-pointer ${
        block.isColored ? "bg-teal-500" : ""
      }`}
      onClick={() => paintBlock(block.row, block.col)}
    ></div>
  );  
}

const ButtonRotate = ({ degree, rotateColoredBlocks }: ButtonRotateProp) => {
  return (
    <button onClick={() => rotateColoredBlocks(degree)}>{
        degree === 90 
            ? <Image src={Rotate90Deg} width={80} height={80} alt={""} /> 
            : <Image src={RotateNeg90Deg} width={80} height={80} alt={""} />
    }</button>
  );
};