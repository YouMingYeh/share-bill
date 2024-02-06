import {
  createUserConnectsGroup,
  getUserConnectsGroup,
} from "@/utils/supabase/user_connects_group";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { getProfile } from "@/utils/supabase/profile";
import { getGroupHasUser } from "@/utils/supabase/group_has_user";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/SubmitButton";
import { redirect } from "next/navigation";

export async function ConnectForm({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const user_connects_group = await getUserConnectsGroup(searchParams?.groupid);

  let connected = false;
  if (user_connects_group?.length > 0) {
    user_connects_group.forEach((user_connects_group) => {
      if (user?.id === user_connects_group.user_id) {
        connected = true;
      }
    });
  }

  const profile: any = user ? await getProfile(user?.id) : {};

  const group_has_users = (await getGroupHasUser(
    searchParams?.groupid,
  )) as GroupHasUser[];

  const group_has_usernames = group_has_users.map(
    (group_has_user) => group_has_user.username,
  );

  const findId = async (group_has_users: GroupHasUser[], username: string) => {
    "use server";
    return await group_has_users.find(
      (group_has_user) => group_has_user.username === username,
    )?.id;
  };

  const sumbit = async (formData: FormData) => {
    "use server";

    const group_has_user_id = await findId(
      group_has_users,
      formData.get("username") as string,
    );

    if (!group_has_user_id) {
      throw new Error("Error finding group_has_user_id");
    }

    if (!user?.id) {
      throw new Error("Error finding user id");
    }

    if (!searchParams?.groupid) {
      throw new Error("Error finding group id");
    }

    const user_connects_group: UserConnectsGroup = {
      id: group_has_user_id,
      user_id: user?.id,
      group_id: searchParams?.groupid,
    };

    const response = await createUserConnectsGroup(user_connects_group);
    if (response?.error) {
      throw new Error("Error creating user connects group");
      return;
    }
    redirect(
      `/start?step=${Number(searchParams.step) + 1}&groupid=${searchParams.groupid}`,
    );
  };
  return (
    <form action={sumbit}>
      <Label htmlFor="name">你是{connected && " (似乎已經連結過ㄌ！)"}</Label>
      <Input
        type="text"
        id="name"
        name="name"
        required
        value={profile?.username}
        disabled
      />
      <Label htmlFor="group_id">群組 ID</Label>
      <Input
        type="text"
        id="group_id"
        name="group_id"
        required
        value={searchParams?.groupid}
        disabled
      />
      <Label htmlFor="username">想連結的使用者</Label>

      <Select name="username">
        <SelectTrigger className="">
          <SelectValue placeholder="選擇你想連結的使用者" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {group_has_usernames.map((username) => (
              <SelectItem key={username} value={username}>
                {username}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="m-2 mt-4 flex justify-center">
        <SubmitButton label="點我連結" />
      </div>
    </form>
  );
}
