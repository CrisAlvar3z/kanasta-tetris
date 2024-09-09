import Matriz from "./components/matriz";

export default function Home() {
  
  const initialBlocks = Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => ({
      row,
      col,
      isColored: false, 
    }))
  ).flat();

  return (
    <div className="mt-10">
      <main>
        <Matriz initialBlocks={initialBlocks} />
      </main>
    </div>
  );
}
