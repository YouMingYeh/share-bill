"use client";
import { redirect, useSearchParams } from "next/navigation";
import NextPage from "@/components/NextPage";
import PreviousPage from "@/components/PreviousPage";

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  if (!searchParams.get("step") || Number(searchParams.get("step")) < 1) {
    redirect("/start?step=1");
  }
  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center gap-2">
      <PreviousPage
        href={
          Number(searchParams.get("step")) > 1
            ? `/start?step=${Number(searchParams.get("step")) - 1}`
            : "/"
        }
        label="上一步"
      />
      <NextPage
        href={`/start?step=${Number(searchParams.get("step")) + 1}`}
        label="跳過"
      />

      {children}
    </div>
  );
}
