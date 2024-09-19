import React from "react";

interface CellProps {
  value: string | null;
}

const Cell: React.FC<CellProps> = ({ value }) => {
  return (
    <div
      style={{ backgroundColor: "#000000", width: "100px", height: "100px" }}
    >
      <button
        type="button"
        style={{
          width: "100%",
          height: "100%",
          fontSize: "3rem",
        }}
      >
        {value}
      </button>
    </div>
  );
};

export default Cell;
