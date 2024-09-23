import React, { useReducer } from "react";
import { generateGrid, clone, flatten } from "@/utils";
import Grid from "./Grid";

const Game: React.FC = (): JSX.Element => {
  interface State {
    grid: (string | null)[][];
    status: string;
    turn: "X" | "O";
  }

  const initialState: State = {
    grid: generateGrid(3, 3, () => null),
    status: "IN_PROGRESS",
    turn: "X",
  };

  const NEXT_TURN: Record<"X" | "O", "X" | "O"> = {
    X: "O",
    O: "X",
  };

  const verifyCombo = (a: string | null, b: string | null, c: string | null) =>
    a && b && c && a === b && b === c;

  const createWinningCombinations = (gridSize: number) => {
    const combos = [];

    for (let row = 0; row < gridSize; row++) {
      combos.push(
        Array.from({ length: gridSize }, (_, col) => row * gridSize + col),
      );
    }

    for (let col = 0; col < gridSize; col++) {
      combos.push(
        Array.from({ length: gridSize }, (_, row) => row * gridSize + col),
      );
    }

    combos.push(Array.from({ length: gridSize }, (_, i) => i * gridSize + i));
    combos.push(
      Array.from(
        { length: gridSize },
        (_, i) => i * gridSize + (gridSize - 1 - i),
      ),
    );

    return combos;
  };

  const checkWinner = (flattenGrid: (string | null)[], gridSize: number) => {
    const winningCombinations = createWinningCombinations(gridSize);

    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (verifyCombo(flattenGrid[a], flattenGrid[b], flattenGrid[c])) {
        return flattenGrid[a];
      }
    }

    return null;
  };
  const reducer = (
    state: State,
    action: { type: string; payload?: { posX: number; posY: number } },
  ) => {
    const { grid, turn, status } = state;

    if (
      (status === "SUCCESS" || status === "DRAW") &&
      action.type !== "RESET"
    ) {
      return state;
    }

    switch (action.type) {
      case "RESET":
        return initialState;

      case "CLICK": {
        if (!action.payload || status === "SUCCESS" || status === "DRAW")
          return state;

        const { posX, posY } = action.payload;
        if (grid[posY][posX]) return state;

        const newState = clone(state);
        newState.grid[posY][posX] = turn;

        const flatArr = flatten(newState.grid);
        const winner = checkWinner(flatArr, 3);

        if (winner) {
          return { ...newState, status: "SUCCESS", turn: winner };
        }

        if (!flatArr.includes(null)) {
          return { ...newState, status: "DRAW" };
        }

        return { ...newState, turn: NEXT_TURN[turn] };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { grid, status, turn } = state;

  return (
    <div style={{ display: "inline-block" }}>
      <Grid
        grid={grid}
        handleClick={(posX, posY) =>
          dispatch({ type: "CLICK", payload: { posX, posY } })
        }
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <p style={{ margin: 0 }}>
          {status === "SUCCESS"
            ? ""
            : status === "DRAW"
              ? "It's a draw!"
              : `Next turn: ${turn}`}
        </p>
        <p style={{ display: "inline-block", margin: 0 }}>
          {status === "SUCCESS" ? `Winner: ${turn} has won!` : ""}
        </p>
        <button type="button" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Game;
