import { MoreHorizontal, MoreVertical } from "lucide-react";

export interface ColumnCardContentProps {
  project: { id: string; name: string; description: string };
}

export default function ColumnCardContent({ project }: ColumnCardContentProps) {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex max-w-full items-center justify-center rounded-2xl">
          <span className="truncate px-3">{project.name}</span>
        </div>
        <button>
          <MoreHorizontal />
        </button>
      </div>
    </>
  );
}
