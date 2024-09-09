export type BlockProp = {
  row: number;
  col: number;
  isColored: boolean;
};

export type MatrizProp = {
  initialBlocks: BlockProp[];
};

export type ButtonRotateProp = {
  degree: number;
  rotateColoredBlocks: (degree: number) => void;
};

export type CleanButtonProps = {
  cleanBlocks: () => void;
};