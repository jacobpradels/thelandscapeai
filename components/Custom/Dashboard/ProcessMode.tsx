import React from "react";
import { ChevronDown } from "lucide-react";

const ProcessMode = ({ mode, setMode }: { mode: string, setMode: (mode: string) => void }) => {
  const clickHandler = (mode: string) => {
    setMode(mode);
    (document.activeElement as HTMLElement).blur();
  }
  return (
    <div className="dropdown text-white font-bold">
      <label className="label uppercase">Process Mode</label>
      <div tabIndex={0} role="button" className="btn btn-neutral m-1 flex justify-between w-full text-white">
        {mode}
        <ChevronDown className="w-4 h-4" />
      </div>
      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] p-2 shadow w-full text-white">
        <li>
          <a onClick={() => {
            clickHandler("Depth");
          }}>Depth</a>
        </li>
        <li>
          <a onClick={() => {
            clickHandler("Hard Edge");
          }}>Hard Edge</a>
        </li>
        <li>
          <a onClick={() => {
            clickHandler("Soft Edge");
          }}>Soft Edge</a>
        </li>
      </ul>
    </div>
  );
}

export default ProcessMode;