import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";

//
import { Home, LogIn, LogOut } from "lucide-react";
import { authed_menu, unauthed_menu } from "constants/navigation";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
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
            <Link href="/" className="flex items-center font-display text-2xl">
              <Image
                src="/logo.png"
                alt="Precedent logo"
                width="30"
                height="30"
                className="mr-2 rounded-sm"
              ></Image>
              <p>Precedent</p>
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
                    {unauthed_menu.map((item, index) =>
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
                  authed_menu.map((item, index) => (
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
      {/* <div className="absolute w-full border-t border-gray-200 bg-white py-5 text-center">
        <p className="text-gray-500">
          A free template by{" "}
          <a
            className="font-medium text-gray-800 underline transition-colors"
            href="https://twitter.com/steventey"
            target="_blank"
            rel="noopener noreferrer"
          >
            Steven Tey
          </a>
        </p>
      </div> */}
    </>
  );
}
