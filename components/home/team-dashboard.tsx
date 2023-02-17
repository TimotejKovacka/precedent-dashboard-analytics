import { trpc } from "@/lib/trpc";
import { motion } from "framer-motion";
import { SlidersHorizontal, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Popover from "../shared/popover";
import ProjectsColumn from "./projects-column";
import WebVitals from "./web-vitals";
import { DefaultSelectProjectItem } from "@/types/Project";

export interface TeamDashboardProps {
  teamId: string;
}

export default function TeamDashboard({ teamId }: TeamDashboardProps) {
  const { data: session, status } = useSession();
  const teams = trpc.team.list.useQuery({});
  const [openPopover, setOpenPopover] = useState(false);
  const projects = trpc.project.listByTeam.useQuery({ teamId: teamId });
  const columnOrder: string[] = ["waiting", "in_progress", "completed"];
  const [columns, setColumns] = useState<{
    [key: string]: DefaultSelectProjectItem[];
  }>({
    waiting: [] as DefaultSelectProjectItem[],
    in_progress: [] as DefaultSelectProjectItem[],
    completed: [] as DefaultSelectProjectItem[],
  });
  console.log(columns);

  useEffect(() => {
    if (projects.data) {
      setColumns({
        waiting: projects.data.waiting,
        in_progress: projects.data.in_progress,
        completed: projects.data.completed,
      });
    }
  }, [projects.data]);

  const onDragEnd = (result: DropResult) => {
    if (!columns) return;
    const { destination, source, draggableId } = result;
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return;
    }
    const startColumn = columns[source.droppableId];
    const finishColumn = columns[destination.droppableId];
    if (startColumn === finishColumn) {
      /* Moving Items inside the same column */
      const projectsCopy = Array.from(startColumn);
      const splicedProjects = projectsCopy.splice(source.index, 1);
      projectsCopy.splice(destination.index, 0, splicedProjects[0]);
      setColumns((columns) => ({
        ...columns,
        [source.droppableId]: projectsCopy,
      }));
    } else {
      /* Moving Items between columns */
      const startProjectsCopy = Array.from(startColumn);
      const finishProjectsCopy = Array.from(finishColumn);
      const splicedProjects = startProjectsCopy.splice(source.index, 1);
      finishProjectsCopy.splice(destination.index, 0, splicedProjects[0]);
      setColumns((columns) => ({
        ...columns,
        [source.droppableId]: startProjectsCopy,
        [destination.droppableId]: finishProjectsCopy,
      }));
    }
    return;
  };

  const completedNumberOfProjects: number =
    projects.data?.completed.length || 0;
  const inProgressNumberOfProjects: number =
    projects.data?.in_progress.length || 0;
  const waitingNumberOfProjects: number = projects.data?.waiting.length || 0;
  const totalNumberOfProjects: number =
    completedNumberOfProjects +
    inProgressNumberOfProjects +
    waitingNumberOfProjects;
  const webVitalValue: number =
    Math.round(
      ((inProgressNumberOfProjects + waitingNumberOfProjects) /
        totalNumberOfProjects) *
        100,
    ) || 0;

  return session ? (
    <motion.div
      className="flex h-[calc(100vh-4rem)] w-full flex-col gap-2 px-1 sm:px-2 md:flex-row md:px-4"
      initial="hidden"
      whileInView="show"
      animate="show"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.15,
          },
        },
      }}
    >
      <div className="flex max-h-min w-full flex-col rounded-md bg-[#fff] p-2 md:w-[25%] md:min-w-[200px]">
        <div className="mb-4 flex items-center rounded-md bg-white py-1.5 px-2">
          <div className="flex flex-auto flex-col">
            <p className="text-sm text-gray-500">SELECTED</p>
            <p className="text-lg font-semibold">Design Team</p>
          </div>
          <Popover
            content={
              <div className="max-h-[170px] w-full overflow-y-auto rounded-md bg-white p-2 sm:w-40">
                {teams?.data?.items &&
                  teams.data.items.length > 0 &&
                  teams.data.items.map((team, index) => (
                    <button
                      className={`flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200 disabled:text-slate-400`}
                      disabled={team.id === teamId}
                      key={index}
                    >
                      {team.name}
                    </button>
                  ))}
              </div>
            }
            openPopover={openPopover}
            setOpenPopover={setOpenPopover}
          >
            <button
              onClick={() => setOpenPopover((state) => !state)}
              className="rounded-full bg-[#e08935] p-2 text-[#fff] outline-blue-500 transition-all duration-300 hover:scale-110 hover:outline hover:outline-1 active:scale-110 active:outline active:outline-1"
              title="Select Team"
            >
              <Users />
            </button>
          </Popover>
        </div>
        <div className="mx-auto mb-4 flex h-[150px] w-full max-w-[150px] justify-center">
          <WebVitals value={webVitalValue} />
        </div>
        <div className="w-full p-2">
          <h5 className="pb-2 font-display text-xl">Projects</h5>
          <div className="grid grid-cols-2 grid-rows-2 gap-1.5">
            <div className="rounded-lg bg-[#ecf3ff] p-1.5">
              <p className="text-xs text-gray-500">TOTAL</p>
              <p className="relative ml-4 text-lg after:absolute after:top-[calc(50%_-_10px)] after:left-[-12px] after:h-5 after:w-1 after:rounded-md after:bg-[#4e81e7]">
                {totalNumberOfProjects}
              </p>
            </div>
            <div className="rounded-lg bg-[#ffefe2] p-1.5">
              <p className="text-xs text-gray-500">COMPLETED</p>
              <p className="relative ml-4 text-lg after:absolute after:top-[calc(50%_-_10px)] after:left-[-12px] after:h-5 after:w-1 after:rounded-md after:bg-[#de8a3a]">
                {completedNumberOfProjects}
              </p>
            </div>
            <div className="rounded-lg bg-[#feeeff] p-1.5">
              <p className="text-xs text-gray-500">IN PROGRESS</p>
              <p className="relative ml-4 text-lg after:absolute after:top-[calc(50%_-_10px)] after:left-[-12px] after:h-5 after:w-1 after:rounded-md after:bg-[#eb6ef0]">
                {inProgressNumberOfProjects}
              </p>
            </div>
            <div className="rounded-lg bg-[#f1ecff] p-1.5">
              <p className="text-xs text-gray-500">WAITING</p>
              <p className="relative ml-4 text-lg after:absolute after:top-[calc(50%_-_10px)] after:left-[-12px] after:h-5 after:w-1 after:rounded-md after:bg-[#7c5cce]">
                {waitingNumberOfProjects}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col rounded-md bg-[#fff] p-2 md:w-[75%]">
        <div className="flex items-center justify-between pb-2">
          <h4 className="font-display text-2xl">Projects</h4>
          <div className="flex items-center gap-3">
            <SlidersHorizontal />
            <button type="button" title="Create Project">
              Create Project
            </button>
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid flex-auto grid-cols-3 gap-4">
            {columnOrder.map((columnId, index) => {
              return (
                <ProjectsColumn
                  key={index}
                  projects={columns[columnId]}
                  columnId={columnId}
                />
              );
            })}
            {/* {columns &&
              columns.map((column, index) => (
                <ProjectsColumn key={index} column={column} />
              ))} */}
          </div>
        </DragDropContext>
      </div>
    </motion.div>
  ) : (
    <></>
  );
}
