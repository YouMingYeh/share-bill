import Link from "next/link";
import { SubmitButton } from "@/components/SubmitButton";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { signUp } from "@/utils/supabase/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Register({
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
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={signUp}
      >
        <h1 className="text-3xl font-bold text-center">註冊</h1>
        <label className="text-md" htmlFor="name">
          姓名
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="name"
          placeholder="姓名"
          required
          minLength={2}
        />
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
          minLength={6}
        />
        <SubmitButton label={"註冊"} />
        <blockquote className="mt-6 border-l-2 pl-6">
          <span className="italic">已經有帳號了嗎？ </span>
          <Link
            href="/login"
            className="no-underline text-foreground font-bold hover:underline "
          >
            點我登入
          </Link>
        </blockquote>
        {searchParams?.message === "failed" && (
          <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>錯誤！</AlertTitle>
            <AlertDescription>
              註冊失敗！ 可能是因為該電子郵件不正確或已經被註冊過了。
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  );
}
