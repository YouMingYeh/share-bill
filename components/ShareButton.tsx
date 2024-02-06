"use client";

import { Button } from "./ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function ShareButton({
  label,
  urlToShare,
}: {
  label: string;
  urlToShare: string;
}) {
  const [pending, setPending] = useState<boolean>(false);

  const handleShare = async () => {
    setPending(true);
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Share this URL",
          url: urlToShare,
        });
        setPending(false);
      } catch (error) {
        console.error("Something went wrong sharing the url", error);
        setPending(false);
      }
    } else {
      try {
        await navigator.clipboard.writeText(urlToShare);
        setPending(false);
      } catch (err) {
        console.error("Failed to copy: ", err);
        setPending(false);
      }
    }
  };

  return (
    <Button variant={"outline"} onClick={handleShare} disabled={pending}>
      {pending ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : label}
    </Button>
  );
}
