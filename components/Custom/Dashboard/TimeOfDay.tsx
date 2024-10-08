import React from "react";
import { Sunrise, Sunset, Sun, Moon } from "lucide-react";

const TimeOfDay = ({ timeOfDay, setTimeOfDay }: { timeOfDay: number, setTimeOfDay: (timeOfDay: number) => void }) => {
  return (
    <div>
      <label className="label uppercase font-bold">Time of Day</label>
      <input
        type="range"
        min={0}
        max="100"
        value={timeOfDay}
        className="range animated-gradient-background range-accent"
        step={Math.floor(100 / 3)}
        onChange={(e) => setTimeOfDay(parseInt(e.target.value))}
      />
      <div className="flex w-full justify-between px-2 text-xs">
        <span><Sunrise /></span>
        <span><Sun /></span>
        <span><Sunset /></span>
        <span><Moon /></span>
      </div>
    </div>
  );
}

export default TimeOfDay;