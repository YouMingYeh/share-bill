import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "./ui/button";
import { signOut } from "@/utils/supabase/auth";
import { getProfile } from "@/utils/supabase/profile";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

import { ExitIcon, EnterIcon } from "@radix-ui/react-icons";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const profile: any = user ? await getProfile(user?.id) : {};

  return user ? (
    <div className="flex items-center gap-1 flex-col">
      <Link href={`/user/${user?.id}`}>
        <Avatar>
          <AvatarImage
            src={profile?.picture_url}
            alt={(profile?.username as string).substring(0, 2)}
          />
          <AvatarFallback>
            {(profile?.username as string).substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </Link>
      <form action={signOut}>
        <Button variant="outline" size="icon">
          <ExitIcon />
        </Button>
      </form>
    </div>
  ) : (
    <Button size="icon" asChild variant={"outline"}>
      <Link href="/login">
        <EnterIcon />
      </Link>
    </Button>
  );
}
