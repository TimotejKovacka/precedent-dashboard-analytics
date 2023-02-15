import { DefaultSelectProjectItem } from "@/types/Project";
import { Plus } from "lucide-react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import ColumnCardContent from "./column-card";

export interface ProjectsColumnProps {
  columnId: string;
  projects: DefaultSelectProjectItem[];
}

export default function ProjectsColumn({
  columnId,
  projects,
}: ProjectsColumnProps) {
  console.log(columnId);
  return (
    <div className="flex h-full w-full flex-col overflow-auto">
      <div className="flex items-center justify-between">
        <h5>{columnId}</h5>
        <button type="button" title="Add project">
          <Plus />
        </button>
      </div>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            className="grid flex-auto grid-flow-col grid-cols-1 overflow-y-auto overflow-x-hidden"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {projects &&
              projects.map((project, index) => (
                <Draggable draggableId={project.id} index={index} key={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="h-min rounded-md bg-white"
                    >
                      <ColumnCardContent project={project} />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
