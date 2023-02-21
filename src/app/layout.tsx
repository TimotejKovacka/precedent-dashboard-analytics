import { useSignInModal } from "@/components/layout/sign-in-modal";
import useScroll from "@/lib/hooks/use-scroll";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AUTHED_MENU,
  FADE_IN_ANIMATION_SETTINGS,
  UNAUTHED_MENU,
} from "@/lib/constants";
import UserDropdown from "@/components/layout/user-dropdown";
import { LogIn, LogOut } from "lucide-react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <html lang="en">
      <head /> {/* Might not need to be included, since SEO will populate*/}
      <body>
        <SignInModal />
        {!session && (
          <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-50 via-white to-cyan-100" />
        )}
        <div className="flex font-semibold">
          <div
            className={`fixed top-0 left-[65px] w-[calc(100%-65px)] ${
              scrolled
                ? "border-b border-gray-200 bg-white/50 backdrop-blur-xl"
                : "bg-white/0"
            } z-30 transition-all`}
          >
            <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
              <Link
                href="/"
                className="flex items-center font-display text-2xl"
              >
                <Image
                  src="/logo.png"
                  alt="Precedent logo"
                  width="30"
                  height="30"
                  className="mr-2 rounded-sm"
                />
                <p>Agiled</p>
              </Link>
              <div>
                <AnimatePresence>
                  {!session && status !== "loading" ? (
                    <motion.button
                      className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black"
                      onClick={() => setShowSignInModal(true)}
                      {...FADE_IN_ANIMATION_SETTINGS}
                    >
                      Sign In
                    </motion.button>
                  ) : (
                    <UserDropdown />
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
          <div className="w-[68.5px] text-[#a48cd2]">
            <div className="z-1200 fixed top-0 left-0 flex h-full w-[65px] flex-col whitespace-nowrap bg-[#1e095c] shadow-none">
              <div className="flex min-h-[64px] justify-center">
                <Image
                  src="/logo.png"
                  alt="Precedent logo"
                  width="40"
                  height="40"
                  className="rounded-sm object-contain"
                ></Image>
              </div>
              <div className="flex h-full flex-col items-center justify-between py-5">
                <menu className="flex flex-col gap-6">
                  {!session && status !== "loading" ? (
                    <>
                      {UNAUTHED_MENU.map((item, index) =>
                        item.href.includes("github.com") ? (
                          <a
                            href={item.href}
                            className="flex items-center font-display text-2xl"
                            key={index}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <item.icon className="h-7 w-7" />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center font-display text-2xl"
                            key={index}
                          >
                            <item.icon className="h-7 w-7" />
                          </Link>
                        ),
                      )}
                    </>
                  ) : (
                    <></>
                  )}
                  {session &&
                    AUTHED_MENU.map((item, index) => (
                      <Link
                        href={item.href}
                        className="flex items-center font-display text-2xl"
                        key={index}
                      >
                        <item.icon className="h-7 w-7" />
                      </Link>
                    ))}
                </menu>
                <div>
                  {!session ? (
                    <button
                      onClick={() => setShowSignInModal(true)}
                      type="button"
                      title="Sign-in"
                    >
                      <LogIn className="h-7 w-7" />
                    </button>
                  ) : (
                    <button
                      onClick={() => signOut({ redirect: true })}
                      type="button"
                      title="Sign-out"
                    >
                      <LogOut className="h-7 w-7" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <main
            className={`flex w-full flex-col items-center justify-center pt-16 ${
              session && "bg-white"
            } bg-gradient-to-br from-indigo-50 via-white to-cyan-50`}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

export const metadata = {
  title: {
    default: "Agiled",
    template: "Agiled | %s",
  },
  description: {
    default:
      "Agile dashboard provides a solution to keep track of your ongoing and finished projects for a team you are part of. On top of that it helps you stay on top of your tasks & meetings",
    template: "%s",
  },
  authors: [
    {
      name: "Timotej Kovacka",
      url: "https://www.linkedin.com/in/timotejkovacka/",
    },
  ],
};
