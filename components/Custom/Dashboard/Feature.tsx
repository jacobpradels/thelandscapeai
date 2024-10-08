import { Pencil } from "lucide-react";

const Feature = ({feature}: {feature: string}) => {
  return (
    <div className="flex items-center gap-2 capitalize w-full justify-between">
      {feature}
      <button className="">
        <Pencil className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Feature;