import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { RocketIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { getGroup } from "@/utils/supabase/group";
import { Separator } from "@/components/ui/separator";
import CopyToClipBoardButton from "@/components/CopyToClipBoardButton";

export async function StepFour({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) {
  let group = null;
  if (searchParams.groupid) {
    group = await getGroup(searchParams.groupid);
  }
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-10">
      <Alert className="h-32">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle className="text-2xl">
          {searchParams.groupid ? "準備進入群組" : "Oops, 你好像沒有創建群組"}
        </AlertTitle>
        <AlertDescription className="text-md">
          {searchParams.groupid
            ? "你已經成功創建了並連結到了群組。點擊下方按鈕進入群組吧"
            : "沒關係，你可以再試一次。"}
        </AlertDescription>
      </Alert>
      {searchParams.groupid && (
        <Button asChild>
          <Link href={`group/${searchParams.groupid}`}>進入群組</Link>
        </Button>
      )}
    </div>
  );
}

function translateType(type: string) {
  switch (type) {
    case "normal":
      return "一般";
    case "food":
      return "吃飯";
    case "casual":
      return "休閒";
    case "trip":
      return "旅遊";
    case "other":
      return "其他";
    default:
      return "一般";
  }
}
