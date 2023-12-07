"use client";

import React, { type ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

import { allContents } from "@/.contentlayer/generated";
import { useGlobalStore } from "@/context";
import { IoMdSearch , IoIosArrowForward } from "react-icons/io";
import { CgHashtag } from "react-icons/cg";

/*eslint-disable*/
function boldText(value: string, searchedText: string) {
  // Escape special characters in the searched text to avoid issues in the RegExp
  const escapedSearchedText = searchedText.replace(
    /[-\/\\^$*+?.()|[\]{}]/g,
    "\\$&"
  );

  // Use a regular expression with the global flag and case-insensitive flag
  const regex = new RegExp(`(${escapedSearchedText})`, "gi");

  // Replace matching text with the bold version
  return value.replace(regex, "<strong class='text-foreground'>$1</strong>");
}
/* eslint-enable */

export function SearchBox() {
  const { setIsSearchPanel } = useGlobalStore();

  const openingHandler = () => {
    setIsSearchPanel(true);
  };

  return (
    <button
      className="mb-4 flex w-full items-center gap-2 rounded-md border border-foreground/20 bg-box px-2 py-1 text-sm text-muted"
      onClick={openingHandler}
    >
      <IoMdSearch className="text-base" />
      <span className="grow text-start">Quick search...</span>
      <span>Ctrl k</span>
    </button>
  );
}

export function SearchContainer() {
  const [inputField, setInputField] = useState("");
  const [contents, setContents] = useState(allContents);
  const { isSearchPanel, setIsSearchPanel } = useGlobalStore();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const closingHandler = () => {
    setIsSearchPanel(false);
    setInputField("");
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputField(event.target.value);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        setIsSearchPanel(true);
        event.preventDefault();
      } else if (event.key === "Escape") {
        setIsSearchPanel(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Focus on the input when the search box is visible
    if (isSearchPanel && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchPanel]);

  const fuse = new Fuse(allContents, {
    keys: ["title", "description"],
  });

  useEffect(() => {
    // Perform fuzzy search when the input changes
    const results = fuse.search(inputField);
    const filteredContents = results.map((result: any) => result.item);
    setContents(filteredContents);
  }, [inputField]);

  // Document Overflow
  useEffect(() => {
    isSearchPanel
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "");

    console.log(allContents);
  }, [isSearchPanel]);

  return (
    isSearchPanel && (
      <div className="fixed left-0 top-0 isolate z-[60] flex h-full w-full justify-center px-4 pt-4 md:pt-24">
        <div
          className="absolute inset-0 -z-10 bg-background/60 backdrop-blur-sm"
          onClick={closingHandler}
        />
        <div className="absolute flex max-h-96 w-full max-w-lg flex-col rounded-lg border border-foreground/20 bg-box">
          {/* search */}
          <label className="flex items-center gap-4 border-b border-foreground/10 px-4 py-3">
            <IoMdSearch className="text-xl" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search documentations"
              className="grow bg-transparent text-sm outline-none placeholder:text-muted"
              onChange={onChangeHandler}
            />
            <span className="rounded bg-muted/20 p-1 text-[8px]">ESC</span>
          </label>
          {/* contents */}
          {inputField.length > 0 && contents.length > 0 ? (
            <ul className="space-y-2 overflow-auto p-4">
              {contents.map((content, index) => (
                <li key={index}>
                  <Link
                    href={content.slug}
                    className="flex items-center gap-4 rounded-md p-2 text-sm text-muted outline-none duration-100 focus:bg-primary/10 focus:text-foreground"
                    onClick={closingHandler}
                  >
                    <span className="flex h-4 w-4 items-center justify-center rounded bg-muted/20 text-xs">
                      <CgHashtag />
                    </span>
                    <div className="flex grow flex-col">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: boldText(content.title, inputField),
                        }}
                      />
                      <span
                        className="text-[10px] leading-4"
                        dangerouslySetInnerHTML={{
                          __html: boldText(content.description, inputField),
                        }}
                      />
                    </div>
                    <span>
                      <IoIosArrowForward />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center text-muted">
              <h2>No recent searches</h2>
            </div>
          )}
        </div>
      </div>
    )
  );
}
