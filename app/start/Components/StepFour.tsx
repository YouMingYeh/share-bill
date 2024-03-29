import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { RocketIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isStringDefined } from "@/lib/utils";

export async function StepFour({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) {
  const groupIdExists = isStringDefined(searchParams?.groupid);

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-10">
      <Alert className="h-fit">
        <RocketIcon className="h-4 w-4" />
        <AlertTitle className="text-2xl">
          {groupIdExists ? "準備進入群組" : "Oops, 你好像沒有創建群組"}
        </AlertTitle>
        <AlertDescription className="text-md">
          {groupIdExists
            ? "你已經成功創建了並連結到了群組。點擊下方按鈕進入群組吧"
            : "沒關係，你可以再試一次。"}
        </AlertDescription>
      </Alert>
      {groupIdExists && (
        <Button asChild>
          <Link href={`group/${searchParams?.groupid}`}>進入群組</Link>
        </Button>
      )}
    </div>
  );
}
