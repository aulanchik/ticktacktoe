import React from "react";
import Grid from "./Grid";
import { generateGrid } from "@/utils";

const Game: React.FC = (): JSX.Element => {
  const grid = generateGrid(3, 3, () => null);

  return (
    <div style={{ display: "inline-block" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Grid grid={grid} />
      </div>
    </div>
  );
};

export default Game;
