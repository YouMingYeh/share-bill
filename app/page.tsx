import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cookies } from "next/headers";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Index() {
  return (
    <div className="bg-background text-foreground w-full flex align-middle justify-center">
      <div>
        <Avatar className="w-64 h-64">
          <AvatarImage src="/logo.png" />
          <AvatarFallback>Share Bill</AvatarFallback>
        </Avatar>
        <h1 className="p-2 text-2xl font-bold text-center">
          大人都不當面談錢。
        </h1>
        <h2 className="text-md text-center">會私底下再算錢</h2>
        <div className="flex justify-center gap-3 p-4">
          <Button variant={"secondary"} size={"lg"}>
            <Link href={"/login"}>登入</Link>
          </Button>
          <Button variant={"default"} size={"lg"}>
            <Link href={"/start"}>直接開始</Link>
          </Button>
        </div>
      </div>

      {/* <AuthButton /> */}
    </div>
  );
}
