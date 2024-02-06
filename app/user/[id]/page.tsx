import { getProfile } from "@/utils/supabase/profile";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import { notFound } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import Link from "next/link";

export default async function Group({ params }: { params: { id: string } }) {
  const { id } = params;
  const profile = await getProfile(id);

  if (!profile) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 items-center">
      <Avatar className=" w-1/2 aspect-square  h-fit">
        <AvatarImage
          src={profile?.picture_url}
          alt={(profile?.username as string).substring(0, 2)}
        />
        <AvatarFallback>
          {(profile?.username as string).substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <h1 className="text-xl">{profile?.username}</h1>
      <h2 className="text-md">{profile.email}</h2>
      <h2 className="text-muted-foreground">
        創建於： {new Date(profile?.created_at).toLocaleDateString()}
      </h2>
      <Separator className="my-4" />
      <MyTabs profile={profile} />
    </div>
  );
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { updateProfile } from "@/utils/supabase/profile";
import { revalidatePath } from "next/cache";
import { SubmitButton } from "@/components/SubmitButton";
import { Scroll } from "lucide-react";
import { getUserConnectsGroupByUserId } from "@/utils/supabase/user_connects_group";
import CopyToClipBoardButton from "@/components/CopyToClipBoardButton";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { translateType } from "@/lib/utils";

export async function MyTabs({ profile }: { profile: Profile }) {
  const response = (await getUserConnectsGroupByUserId(profile?.id)) as any;

  console.log(response?.data);

  async function submit(formData: FormData) {
    "use server";
    const username = formData.get("username");
    const picture_url = formData.get("picture_url");

    const profileToUpdate: ProfileUpdate = {
      id: profile.id,
      username: username as string,
      picture_url: picture_url as string,
    };
    const response = await updateProfile(profileToUpdate);
    if (response?.error) {
      throw new Error(response.error.message);
    }

    revalidatePath(`/user/${profile.id}`);
  }

  return (
    <Tabs defaultValue="profile" className="w-full h-1/2">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="profile">個人資料</TabsTrigger>
        <TabsTrigger value="group">我的群組</TabsTrigger>
      </TabsList>
      <TabsContent value="profile">
        <Card>
          <form action={submit}>
            <CardHeader>
              <CardTitle>個人資料</CardTitle>
              <CardDescription>
                你可以在這裡編輯你的個人資料，按下儲存以更新
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">使用者名稱</Label>
                <Input
                  id="username"
                  defaultValue={profile?.username}
                  name="username"
                  required
                  minLength={2}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="picture_url">大頭照連結</Label>
                <Input
                  id="picture_url"
                  defaultValue={profile?.picture_url as string}
                  name="picture_url"
                />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton label={"儲存"} />
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="group">
        <Card>
          <CardHeader>
            <CardTitle>我的群組</CardTitle>
            <CardDescription>
              這裏是你的群組列表，你可以在這裡管理你的群組
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Carousel>
              <CarouselContent>
                {response?.data.map((record: any) => {
                  return (
                    <CarouselItem key={record.group.id}>
                      <GroupItem
                        id={record.group.id}
                        name={record.group.name}
                        type={record.group.type}
                        description={record.group.description}
                      />
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

import { headers } from "next/headers";
import { Button } from "@/components/ui/button";

const GroupItem = ({
  id,
  name,
  type,
  description,
}: {
  id: string;
  name: string;
  type: string;
  description: string;
}) => {
  const origin = headers().get("origin");
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>描述： {description}</CardDescription>
      </CardHeader>
      <CardContent className="">
        <CardDescription>類型： {translateType(type)}</CardDescription>
        <div className="absolute right-1 bottom-1">
          <Button asChild>
            <Link href={`/group/${id}`}>前往群組</Link>
          </Button>
        </div>

        <div className="absolute right-1 top-1">
          <CopyToClipBoardButton url={`${origin}/group/${id}`} />
        </div>
      </CardContent>
    </Card>
  );
};
