import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Index() {
  return (
    <div className="bg-background text-foreground w-full  flex align-middle justify-center items-center">
      <div className="flex flex-col items-center">
        <Avatar className="w-64 h-64">
          <AvatarImage src="/logo.png" />
          <AvatarFallback>Share Bill</AvatarFallback>
        </Avatar>
        <h1 className="p-2 text-2xl font-bold text-center">
          大人都不當面談錢。
        </h1>
        <h2 className="text-md text-center">會用這個網站算錢</h2>
        <div className="flex justify-center gap-3 p-4">
          <Button asChild variant={"secondary"} size={"lg"}>
            <Link href={"/login"}>登入或註冊</Link>
          </Button>
          <Button variant={"default"} asChild size={"lg"}>
            <Link href={"/start"}>直接開始</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
