import { Separator } from "@/components/ui/separator";
import { notFound } from "next/navigation";
import { getGroup } from "@/utils/supabase/group";

import { Button } from "@/components/ui/button";
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

// user_connects_group is a subset of group_has_user, so we need to extract the user data from group_has_user if it's not in user_connects_group. Like merge the two arrays.
type Member = {
  name: string | null;
  username: string;
  email: string | null;
  picture_url: string | null;
  is_owner: boolean;
  balance: number;
};

export default async function Group({ params }: { params: { id: string } }) {
  const { id } = params;
  const group = await getGroup(id);
  const user_connects_group = await getUserConnectsGroupByGroupId(id);

  console.log("ucg: ", user_connects_group);

  const group_has_user = await getGroupHasUser(id);

  console.log("ghu: ", group_has_user);

  const members: Member[] = [];

  group_has_user.forEach((ghu) => {
    const found: any = user_connects_group?.find(
      (ucg) => ghu.id === ucg.group_has_user_id,
    );
    if (found) {
      members.push({
        name: found?.profile?.username,
        username: ghu.username,
        email: found.profile?.email,
        picture_url: found.profile?.picture_url,
        is_owner: ghu.is_owner,
        balance: ghu.balance,
      });
    } else {
      members.push({
        name: null,
        username: ghu.username,
        email: null,
        picture_url: null,
        is_owner: ghu.is_owner,
        balance: ghu.balance,
      });
    }
  });

  if (!group) {
    return notFound();
  }

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2 items-center">
      <h1 className="text-xl font-bold">{group?.name}</h1>
      <h2 className="text-md">{group?.description}</h2>
      <h2 className="text-muted-foreground">
        創建於： {new Date(group?.created_at).toLocaleDateString()}
      </h2>
      <Separator className="my-4" />
      <MyTabs members={members} group_id={id} />
      <div className="absolute bottom-10">
        <MyDrawer />
      </div>
    </div>
  );
}

function MyTabs({
  members,
  group_id,
}: {
  members: Member[];
  group_id: string;
}) {
  return (
    <Tabs defaultValue="member" className="w-full h-2/3">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="bill">帳務</TabsTrigger>
        <TabsTrigger value="member">成員</TabsTrigger>
        <TabsTrigger value="summary">總覽</TabsTrigger>
      </TabsList>

      <TabsContent value="bill">
        <BillCard />
      </TabsContent>
      <TabsContent value="member">
        <MemberCard members={members} group_id={group_id} />
      </TabsContent>
      <TabsContent value="summary">
        <SummaryCard />
      </TabsContent>
    </Tabs>
  );
}

function BillCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>帳務</CardTitle>
        <CardDescription>這裏紀錄了你們的帳務紀錄。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">{/* TODO: Content */}</CardContent>
      <CardFooter>{/* TODO: Footer */}</CardFooter>
    </Card>
  );
}

function MemberCard({
  members,
  group_id,
}: {
  members: Member[];
  group_id: string;
}) {
  async function handleAddMember(formData: FormData) {
    "use server";
    const username = formData.get("username");
    const is_owner = formData.get("is_owner");

    console.log("username: ", username);

    const group_has_user: GroupHasUserCreate = {
      group_id: group_id as string,
      is_owner: is_owner === "on" ? true : false,
      username: username as string,
    };

    const response = await createGroupHasUser(group_has_user);

    if (!response) {
      throw new Error("你可能還沒創建群組");
    }

    if (response?.error) {
      throw new Error(response.error.toString());
    }

    revalidatePath(`/group/${group_id}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>成員</CardTitle>
        <CardDescription>
          這裏列出你們的群組成員以及他們的帳務狀況。
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 p-4">
        <ScrollArea className="h-52">
          {members.map((member, index) => (
            <MemberContent key={index} member={member} />
          ))}
        </ScrollArea>
      </CardContent>
      <CardFooter>
        <form action={handleAddMember}>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-2"
            type="text"
            name="username"
            placeholder="輸入新增成員的名稱"
            required
          />
          <div className="flex space-x-2 align-middle justify-end">
            <Checkbox id="is_owner" name="is_owner" className="mb-4" />
            <Label htmlFor="is_owner">他也是擁有者？</Label>
          </div>
          <div className="flex align-middle justify-center">
            <SubmitButton label="新增成員"></SubmitButton>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function MemberContent({ member }: { member: Member }) {
  return (
    <div className=" flex items-center space-x-2 rounded-md border p-3 my-1 relative">
      <Badge
        variant={member.balance >= 0 ? "secondary" : "destructive"}
        className="absolute top-1 right-1"
      >
        收支： {member.balance}
      </Badge>
      <Avatar className=" aspect-square">
        <AvatarImage
          src={member.picture_url as string}
          alt={(member.username as string).substring(0, 2)}
        />
        <AvatarFallback>
          {(member.username as string).substring(0, 2)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{member.username}</p>
        <p className="text-xs text-muted-foreground">
          {member.is_owner ? "擁有者" : "成員"}
        </p>
        <p className="text-sm text-muted-foreground">
          {member.email ? member.email : "沒有提供電子郵件"}
        </p>
      </div>
    </div>
  );
}

function SummaryCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>總覽</CardTitle>
        <CardDescription>這裏列出了你們的群組的總覽。</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">{/* TODO: Content */}</CardContent>
      <CardFooter>{/* TODO: Footer */}</CardFooter>
    </Card>
  );
}

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
import { PlusCircledIcon } from "@radix-ui/react-icons";
import {
  getUserConnectsGroupByGroupId,
  getUserConnectsGroupByUserId,
} from "@/utils/supabase/user_connects_group";
import {
  createGroupHasUser,
  getGroupHasUser,
} from "@/utils/supabase/group_has_user";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SubmitButton } from "@/components/SubmitButton";
import { Checkbox } from "@/components/ui/checkbox";
import { revalidatePath } from "next/cache";
import { Badge } from "@/components/ui/badge";

function MyDrawer() {
  return (
    <Drawer>
      <DrawerTrigger>
        <PlusCircledIcon className="w-10 h-10 hover:w-12 hover:h-12 transition-all" />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
