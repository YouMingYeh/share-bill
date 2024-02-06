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

export async function StepTwo({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) {
  console.log(searchParams);
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-10">
      <Alert className="h-32">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle className="text-2xl">
          {searchParams.groupid ? "群組創建成功！" : "Oops, 你好像沒有創建群組"}
        </AlertTitle>
        <AlertDescription className="text-md">
          {searchParams.groupid
            ? "你已經成功創建了一個新的群組。點開下方的按鈕，查看詳細資訊。\n若要繼續教學，請點擊下一步。"
            : "沒關係，你可以再試一次或繼續下一步教學。"}
        </AlertDescription>
      </Alert>
      {searchParams.groupid && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">查看詳細資訊</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>群組資訊</DrawerTitle>
                <DrawerDescription>
                  你剛剛創建了一個新的群組，你可以透過連結邀請朋友加入。
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>
                  <Link href={`/group/${searchParams?.groupid}`}>
                    直接進入群組
                  </Link>
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      )}
      <Button>
        <Link href="start?step=3">下一步</Link>
      </Button>
    </div>
  );
}
