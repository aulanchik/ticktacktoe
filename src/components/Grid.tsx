import React from "react";
import Cell from "./Cell";

interface GridProps {
  grid: (string | null)[][];
  handleClick: (colIndex: number, rowIndex: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, handleClick }) => {
  return (
    <div style={{ display: "inline-block", border: "2px solid #777" }}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 2,
          backgroundColor: "#777",
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => (
            <Cell
              key={`${colIndex}-${rowIndex}`}
              onClick={() => handleClick(colIndex, rowIndex)}
              value={value}
            />
          )),
        )}
      </div>
    </div>
  );
};

export default Grid;
