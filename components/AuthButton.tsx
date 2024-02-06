import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "./ui/button";

import { signOut } from "@/utils/supabase/auth";
import { getProfile } from "@/utils/supabase/profile";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile: any = user ? await getProfile(user?.id) : {};

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {profile?.username}!
      <form action={signOut}>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    <Button asChild variant={"outline"}>
      <Link href="/login" className="no-underline text-foreground">
        Login
      </Link>
    </Button>
  );
}
