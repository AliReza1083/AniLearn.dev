import React, { useState } from "react";
import { motion } from "framer-motion";

import { PreviewWrapper } from "@/components/Wrapper";

export default function AlignItems() {
  const [position, setPosition] = useState("start");

  const positions = ["start", "end", "center"];

  return (
    <PreviewWrapper className="flex flex-col gap-6">
      <div>
        {positions.map((p, index) => (
          <button
            key={index}
            className="relative isolate cursor-pointer px-3 py-1 capitalize"
            onClick={() => {
              setPosition(p);
            }}
          >
            {p}
            {position === p && (
              <motion.span
                layoutId="AlignItems"
                transition={{ duration: 0.2 }}
                className="absolute inset-0 -z-10 rounded bg-foreground/30 dark:bg-foreground/10"
              />
            )}
          </button>
        ))}
      </div>
      <div className="flex h-24 gap-4" style={{ alignItems: position }}>
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            layout
            key={i}
            className="h-12 w-12 rounded bg-foreground"
          />
        ))}
      </div>
    </PreviewWrapper>
  );
}
