import React from "react";
import { Game } from "@/components";

const App: React.FC = (): JSX.Element => {
  return (
    <div>
      <h1>Tic-tac-toe</h1>
      <Game />
    </div>
  );
};

export default App;
