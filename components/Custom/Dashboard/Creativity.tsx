import React from "react";

const Creativity = ({ creativity, setCreativity }: { creativity: number, setCreativity: (creativity: number) => void }) => {
  return (
    <div>
      <label className="label uppercase font-bold">Creativity - {creativity / 10}</label>
      <input
        type="range"
        min={0}
        max="100"
        value={creativity}
        className="range animated-gradient-background range-info"
        step={Math.floor(100 / 10)}
        onChange={(e) => setCreativity(parseInt(e.target.value))}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>More realistic</span>
        <span>More creative</span>
      </div>
    </div>
  );
}

export default Creativity;