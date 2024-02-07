"use client";
import * as React from "react";
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

import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  PersonIcon,
  QuestionMarkCircledIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export function Hint() {
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen} shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button size="icon" variant="outline">
          <QuestionMarkCircledIcon width={"1.2rem"} height={"1.2rem"} />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="fixed m-0">
        <DrawerHeader className="text-left">
          <DrawerTitle>我是誰？</DrawerTitle>
          <DrawerDescription>
            我是一個幫你和朋友分帳的工具。你可以創建屬於你和朋友的群組、紀錄你們的消費，我可以幫你們計算誰欠誰錢。
          </DrawerDescription>
          <DrawerTitle>為什麼要使用我？</DrawerTitle>
          <DrawerDescription>
            我沒有廣告，也不會收集你的個人資料，也沒有人數限制。更重要的是，你不用登入也可以使用我。
          </DrawerDescription>
          <DrawerTitle>如何開始？</DrawerTitle>
          <DrawerDescription>
            你可以選擇登入或者直接開始使用我。如果你選擇直接開始，我會幫你創建一個群組，你可以透過連結直接邀請朋友加入。
            如果你選擇登入，你可以管理你的群組、創建只有登入者才能加入的群組，讓你們分帳更安全。
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerTitle>Contact me</DrawerTitle>
          <DrawerDescription>
            <Link href="https://github.com/YouMingYeh" className={"underline"}>
              <div className="flex align-middl gap-1">
                <GitHubLogoIcon />
                @YouMingYeh
              </div>
            </Link>
            <Link href="https://yehyouming.vercel.app" className={"underline"}>
              <div className="flex align-middle gap-1">
                <PersonIcon />
                My Portfolio
              </div>
            </Link>
            <div className="flex align-middle gap-1">
              <EnvelopeClosedIcon />
              b10705052@ntu.edu.tw
            </div>
          </DrawerDescription>
          <DrawerClose asChild>
            <Button variant="outline">取消</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
