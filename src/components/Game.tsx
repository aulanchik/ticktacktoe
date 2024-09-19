import React, { useReducer } from "react";
import Grid from "./Grid";
import { generateGrid, clone } from "@/utils";

const Game: React.FC = (): JSX.Element => {
  interface State {
    grid: (string | null)[][];
    turn: "X" | "O";
  }

  const NEXT_TURN = {
    X: "O",
    O: "X",
  } as const;

  const initialState: State = {
    grid: generateGrid(3, 3, () => null),
    turn: "X",
  };

  const reducer = (
    state: State,
    action: { type: string; payload: { posX: number; posY: number } },
  ) => {
    switch (action.type) {
      case "CLICK":
        const { grid, turn } = state;
        const { posX, posY } = action.payload;

        if (grid[posY][posX]) {
          return state;
        }

        const newState = clone(state);

        newState.grid[posY][posX] = turn;
        newState.turn = NEXT_TURN[turn];
        return newState;

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { grid } = state;

  const handleClick = (posX: number, posY: number) => {
    dispatch({ type: "CLICK", payload: { posX, posY } });
  };

  return (
    <div style={{ display: "inline-block" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Grid grid={grid} handleClick={handleClick} />
      </div>
    </div>
  );
};

export default Game;
