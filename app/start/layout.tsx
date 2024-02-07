"use client";
import { redirect, useSearchParams } from "next/navigation";
import NextPage from "@/components/NextPage";
import PreviousPage from "@/components/PreviousPage";

function getPreviousHerf(searchParams: URLSearchParams): string {
  const step = Number(searchParams.get("step"));
  const groupid = searchParams.get("groupid");
  return `/start?step=${step - 1}&groupid=${groupid}`;
}

function getNextHerf(searchParams: URLSearchParams): string {
  const step = Number(searchParams.get("step"));
  const groupid = searchParams.get("groupid");
  return `/start?step=${step + 1}&groupid=${groupid}`;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  if (!searchParams.get("step") || Number(searchParams.get("step")) < 1) {
    redirect("/start?step=1");
  }
  const previousHerf = getPreviousHerf(searchParams);
  const nextHerf = getNextHerf(searchParams);
  return (
    <div className="flex-1 flex flex-col w-full px-8 justify-center items-center">
      <PreviousPage
        href={Number(searchParams.get("step")) > 1 ? previousHerf : "/"}
        label="上一步"
      />
      {Number(searchParams.get("step")) < 4 && (
        <NextPage href={nextHerf} label="跳過" />
      )}

      {children}
    </div>
  );
}
