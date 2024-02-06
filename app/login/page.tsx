import Link from "next/link";
import { Button } from "@/components/ui/button";

import { RocketIcon, ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { signIn } from "@/utils/supabase/auth";
import { SubmitButton } from "@/components/SubmitButton";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-4 top-4 py-2 px-2 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        回首頁
      </Link>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground align-middle"
        action={signIn}
      >
        <h1 className="text-3xl font-bold text-center">登入</h1>
        <label className="text-md" htmlFor="email">
          電子郵件
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          密碼
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton label={"登入"} />

        <blockquote className="mt-6 border-l-2 pl-6">
          <span className="italic">還沒有帳號嗎？ </span>
          <Link
            href="/register"
            className="no-underline text-foreground font-bold hover:underline "
          >
            點我註冊
          </Link>
        </blockquote>
        {searchParams?.message == "success" && (
          <Alert variant="default">
            <RocketIcon className="h-4 w-4" />
            <AlertTitle>註冊成功！</AlertTitle>
            <AlertDescription> 請繼續登入。</AlertDescription>
          </Alert>
        )}
        {searchParams?.message == "failed" && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>錯誤！</AlertTitle>
            <AlertDescription> 請檢查您的電子郵件和密碼。</AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}
