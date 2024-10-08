// @ts-nocheck
import * as React from "react";

import dynamic from "next/dynamic";

export const Index: Record<string, any> = {
  "css-aspect-ratio": {
    name: "css-aspect-ratio",
    component: dynamic(() => import("@/preview/css/aspect-ratio.tsx"), {
      ssr: false,
    }),
  },
  "css-border-radius-2": {
    name: "css-border-radius-2",
    component: dynamic(() => import("@/preview/css/border-radius-2.tsx"), {
      ssr: false,
    }),
  },
  "css-border-radius": {
    name: "css-border-radius",
    component: dynamic(() => import("@/preview/css/border-radius.tsx"), {
      ssr: false,
    }),
  },
  "css-centering-a-div": {
    name: "css-centering-a-div",
    component: dynamic(() => import("@/preview/css/centering-a-div.tsx"), {
      ssr: false,
    }),
  },
  "css-text-mix-blend-mode": {
    name: "css-text-mix-blend-mode",
    component: dynamic(() => import("@/preview/css/text-mix-blend-mode.tsx"), {
      ssr: false,
    }),
  },
};
