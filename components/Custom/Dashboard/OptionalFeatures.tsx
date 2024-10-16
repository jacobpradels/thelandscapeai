import React from "react";
import { backyardFeatures } from "@/libs/styles";
const OptionalFeatures = ({ optionalFeatures, setOptionalFeatures }: { optionalFeatures: string[]; setOptionalFeatures: (features: string[]) => void }) => {
  const [search, setSearch] = React.useState("");
  const filteredFeatures = Object.entries(backyardFeatures)
    .sort((a, b) => a[1].popularity > b[1].popularity ? -1 : 1)
    .filter((feature) => !optionalFeatures.includes(feature[0]) && (!search || feature[0].toLowerCase().includes(search.toLowerCase())))
  const inputRef = React.useRef<HTMLInputElement>(null);
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="label uppercase font-bold">Optional Features</label>
      <div className="dropdown text-black">
        <input
          type="text"
          ref={inputRef}
          placeholder="Search"
          className="input input-bordered w-full text-white"
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              inputRef.current!.value = "";
              setOptionalFeatures([...optionalFeatures, search]);
              setSearch("");
              (document.activeElement as HTMLElement).blur();
            }
          }}
        />
        <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full max-w-xs p-2 shadow text-white block overflow-x-hidden overflow-y-auto max-h-48 sm:max-h-64">
          {filteredFeatures.length === 0 ? (
            <li className="text-center min-h-8 flex items-center justify-center">
              Press enter to add &quot;{search}&quot;
            </li>
          ) : (
            filteredFeatures.map((feature) => (
              <li
                key={feature[0]}
                className="capitalize"
                onClick={() => {
                  setOptionalFeatures([...optionalFeatures, feature[0]]);
                  setSearch("");
                  inputRef.current!.value = "";
                  (document.activeElement as HTMLElement).blur();
                }}
              >
                <a className="flex justify-between items-center">
                  <span className="truncate">{feature[0]}</span>
                  <span className="text-xs shrink-0">
                    {feature[1].popularity > 75 ? "🔥" : ""}
                  </span>
                </a>
              </li>
            )))}
        </ul>
      </div>
      <div className="flex flex-wrap gap-2">
        {optionalFeatures.map((optional) => (
          <div className={`badge badge-outline capitalize ${backyardFeatures[optional as keyof typeof backyardFeatures] ?? { popularity: 0 }.popularity > 75 ? "animated-gradient-background" : "badge-outline"}`} key={optional}>{optional}</div>
        ))}
      </div>
    </div>
  );
}

export default OptionalFeatures;