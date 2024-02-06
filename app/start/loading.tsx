"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

function Loading() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    setProgress(66);
  }, []);

  return <Progress value={progress} className="w-[30%]" />;
}

export default Loading;
