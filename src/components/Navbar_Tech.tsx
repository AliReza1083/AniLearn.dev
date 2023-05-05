import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

// Icons
import { IoIosArrowDown, IoLogoCss3 } from "react-icons/io";
import { AiFillHtml5 } from "react-icons/ai";
import { HiMenuAlt2 } from "react-icons/hi";

export default function Navbar_Tech({}: Props) {
  const [isNavbar, setIsNavbar] = useState<boolean>(false);
  const [open, setOpen] = useState<number>(0);

  const router = useRouter();

  const CSS = [
    {
      id: 1,
      name: "Flexbox Position",
      link: "/css/flex-position",
    },
    {
      id: 2,
      name: "Z-Index",
      link: "/css/z-index",
    },
  ];

  return (
    <Fragment>
      <nav
        className={`fixed md:sticky top-0 left-0 w-[220px] px-2 py-3 border-r-2 border-white-low-opacity h-screen bg-background-clr md:translate-x-0 duration-200 z-50 ${
          isNavbar ? "translate-x-0" : " -translate-x-full"
        }`}
      >
        <Link href={"/"} className="text-lg font-black text-white">
          AniLearn.dev
        </Link>
        <p className="text-xs">
          Learning something with animation doesn&apos;t get easier than this
        </p>
        <ul className="mt-4 space-y-4">
          <li className="bg-[#22262F]/80 p-2 rounded-md border border-white-low-opacity text-white">
            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={() => setOpen(1)}
            >
              <AiFillHtml5 />
              <span className="grow">HTML</span>
              <IoIosArrowDown />
            </div>
          </li>
          <li className="bg-[#22262F]/80 p-2 rounded-md border border-white-low-opacity">
            <div
              className="flex items-center gap-1 text-white cursor-pointer"
              onClick={() => setOpen(2)}
            >
              <IoLogoCss3 />
              <span className="grow">CSS</span>
              <IoIosArrowDown />
            </div>
            <AnimatePresence>
              {open == 2 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col overflow-hidden font-light"
                >
                  {CSS.map((css) => (
                    <div
                      key={css.id}
                      className={`p-[.8px] ${
                        router.pathname == css.link &&
                        "bg-gradient-to-t from-primary to-background-clr rounded-md"
                      } ${css.id == 1 && "mt-4"}`}
                    >
                      <Link
                        href={css.link}
                        className={`w-full inline-block py-1 px-2 rounded-md ${
                          router.pathname == css.link && "bg-[#15171E]"
                        }`}
                      >
                        {css.name}
                      </Link>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </nav>
      <div
        className={`fixed p-2 text-2xl rounded-full bottom-4 left-4 md:hidden bg-background-clr duration-200 ${
          isNavbar ? "translate-x-56 rotate-12 bg-red-700" : "translate-x-0"
        }`}
        onClick={() => setIsNavbar(!isNavbar)}
      >
        <HiMenuAlt2 />
      </div>
    </Fragment>
  );
}