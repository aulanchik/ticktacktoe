import React from "react";

interface CellProps {
  value: string | null;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, onClick }) => {
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
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  );
};

export default Cell;
