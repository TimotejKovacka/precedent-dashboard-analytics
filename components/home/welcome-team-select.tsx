import { trpc } from "@/lib/trpc";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { ChevronRight, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";

export default function WelcomeTeamSelect() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debounced = useDebouncedCallback((value) => setSearchQuery(value), 200);

  if (!session || !session.user) {
    return <></>;
  }

  useEffect(() => {
    searchRef.current?.focus();
  });

  const pushQueryParam = (id: string) => {
    router.push({ pathname: "/", query: { teamId: id } }, undefined, {
      shallow: true,
    });
  };

  const teams = trpc.team.list.useQuery({ userId: session.user.id });

  return (
    <div className="flex h-[calc(100vh_-_64px)] w-full items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-cyan-100">
      <motion.div className="flex h-3/4 w-full flex-col md:w-3/4">
        <div className="relative m-4 rounded-md bg-white">
          <div className="absolute right-0 flex h-full items-center px-4">
            <Search />
          </div>
          <div className="relative inline-flex w-full cursor-text items-center">
            <input
              type="text"
              ref={searchRef}
              placeholder="Team name..."
              className="w-full rounded-md bg-inherit p-3 pr-12 text-xl transition-all "
              onChange={(e) => debounced(e.target.value.toLowerCase().trim())}
            />
          </div>
        </div>
        <div className="h-full w-full overflow-y-auto px-4 pb-4">
          {teams.data?.items
            .filter((item) => item.name.toLowerCase().includes(searchQuery))
            .map((item, index) => (
              <>
                <button
                  type="button"
                  title={item.name}
                  onClick={() => pushQueryParam(item.id)}
                  className="border-1 mt-3 flex w-full items-center justify-between rounded-md p-2 transition-all first-of-type:mt-0 hover:bg-slate-200 focus:bg-slate-200 active:bg-slate-200"
                >
                  <span>{item.name}</span>
                  <ChevronRight />
                </button>
                <hr className="my-8 h-px border-0 bg-gray-200 last-of-type:hidden dark:bg-gray-700" />
              </>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
