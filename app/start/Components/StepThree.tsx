import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ShareButton } from "@/components/ShareButton";
import CopyToClipBoardButton from "@/components/CopyToClipBoardButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/SubmitButton";
import {
  createGroupHasUser,
  getGroupHasUser,
} from "@/utils/supabase/group_has_user";
import { Separator } from "@/components/ui/separator";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { toast } from "react-hot-toast";
import { ConnectForm } from "./ConnectForm";
import { metadata } from "@/app/layout";
import { defaultUrl, isStringDefined } from "@/lib/utils";

export async function StepThree({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-0">
      <CarouselDemo searchParams={searchParams} />
    </div>
  );
}

function CarouselDemo({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) {
  return (
    <Carousel className="w-full max-w-xs justify-center items-center">
      <CarouselContent className="w-full items-center p-0">
        <CarouselItem className=" flex flex-col justify-center">
          <div className=" flex justify-center ">
            <CardOne searchParams={searchParams} />
          </div>
        </CarouselItem>
        <CarouselItem className=" flex flex-col justify-center">
          <div className=" flex justify-center align-middle">
            <CardTwo searchParams={searchParams} />
          </div>
        </CarouselItem>
        <CarouselItem className=" flex flex-col justify-center">
          <div className=" flex justify-center">
            <CardThree searchParams={searchParams} />
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

const CardOne = ({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) => {
  return (
    <Card className="items-center">
      <CardContent className="w-full h-full flex flex-col justify-center items-center align-middle gap-4 p-6 aspect-square">
        <CardTitle>首先，分享群組連結給朋友吧</CardTitle>
        <CardDescription>
          {isStringDefined(searchParams?.groupid)
            ? "你的朋友可以透過連結加入群組"
            : "但你好似乎好像還沒有創建群組呢...，你可以回到上一步再試一次。"}
        </CardDescription>
        <div className="h-auto flex align-middle gap-4">
          <ShareButton
            label="分享群組連結"
            urlToShare={`${defaultUrl}/${searchParams?.groupid}`}
          />
          <CopyToClipBoardButton
            url={`${defaultUrl}/${searchParams?.groupid}`}
          />
        </div>
      </CardContent>
    </Card>
  );
};

const CardTwo = async ({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) => {
  const group_has_users = await getGroupHasUser(searchParams?.groupid);

  async function handleAddMember(formData: FormData) {
    "use server";
    if (!searchParams?.groupid) return;
    ("use server");
    const username = formData.get("username");
    const is_owner = formData.get("is_owner");

    const group_has_user: GroupHasUserCreate = {
      group_id: searchParams?.groupid as string,
      is_owner: is_owner === "on" ? true : false,
      username: username as string,
    };

    const response = await createGroupHasUser(group_has_user);

    if (response?.error) {
      throw new Error(response.error.toString());
    }

    revalidatePath(`/group/${searchParams?.groupid}`);
  }
  return (
    <Card className="">
      <CardContent className="w-full h-full flex flex-col justify-center items-center align-middle gap-4 p-3 aspect-square">
        <CardTitle>接著，你可以開始新增成員</CardTitle>
        <CardDescription>點擊下方按鈕，新增成員</CardDescription>
        <Dialog>
          <DialogTrigger>打開成員列表</DialogTrigger>
          <DialogContent className="aspect-square max-w-xs lg:max-w-none px-4 ">
            <DialogHeader>
              <DialogTitle>成員列表</DialogTitle>
              <DialogDescription>
                你可以透過連結邀請朋友加入群組，或是直接新增成員，注意這些成員都是還沒驗證的！他們可以再加入之後進行驗證。
              </DialogDescription>
              <form action={handleAddMember}>
                <input
                  className="rounded-md px-4 py-2 bg-inherit border mb-2"
                  type="text"
                  name="username"
                  placeholder="輸入朋友的名稱"
                  required
                />
                <div className="flex space-x-2 justify-center align-middle">
                  <Checkbox id="is_owner" name="is_owner" className="mb-4" />
                  <Label htmlFor="is_owner">他也是擁有者？</Label>
                </div>
                <SubmitButton label="新增成員"></SubmitButton>
              </form>
            </DialogHeader>
            <Separator className="my-4" />
            <DialogFooter className="flex justify-center">
              <ScrollArea>
                {group_has_users.length === 0 && (
                  <p className="text-center">目前還沒有成員</p>
                )}
                {group_has_users.map((group_has_user, index) => {
                  return (
                    <div key={index}>
                      <h2 className="text-center">{group_has_user.username}</h2>
                    </div>
                  );
                })}
              </ScrollArea>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

const CardThree = ({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) => {
  return (
    <Card className="max-w-64">
      <CardContent className="w-full h-full flex flex-col justify-center items-center align-middle gap-4 p-3 aspect-square ">
        <CardTitle>最後，連結你的帳號</CardTitle>
        <CardDescription>（如果你還沒登入，請跳過這一步驟）</CardDescription>
        <CardDescription>
          如果你已經登入，你可以直接連結你的帳號到這個群組!
        </CardDescription>
        <ConnectForm searchParams={searchParams} />
      </CardContent>
    </Card>
  );
};
