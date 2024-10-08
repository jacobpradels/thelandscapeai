import React from "react";
import { Sunrise, Sunset, Sun, Moon } from "lucide-react";

const Creativity = ({ creativity, setCreativity }: { creativity: number, setCreativity: (creativity: number) => void }) => {
  return (
    <div>
      <label className="label uppercase font-bold">Creativity</label>
      <input
        type="range"
        min={0}
        max="100"
        value={creativity}
        className="range animated-gradient-background range-info"
        step={Math.floor(100 / 4)}
        onChange={(e) => setCreativity(parseInt(e.target.value))}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span>Low</span>
        <span>|</span>
        <span>Medium</span>
        <span>|</span>
        <span>High</span>
      </div>
    </div>
  );
}

export default Creativity;