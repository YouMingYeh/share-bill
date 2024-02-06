import NextPage from "@/components/NextPage";
import PreviousPage from "@/components/PreviousPage";
import { Progress } from "@/components/ui/progress";
import { redirect } from "next/navigation";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { StepThree } from "./StepThree";

export default function Start({
  searchParams,
}: {
  searchParams: { step: string; groupid: string | undefined };
}) {
  if (!searchParams.step || Number(searchParams.step) < 1) {
    redirect("/start?step=1");
  }
  return (
    <div className=" h-full flex flex-col gap-3 justify-center items-center">
      <div className="fixed top-28 w-4/5 flex flex-col gap-3 align-middle justify-center items-center">
        <h1 className="font-semibold text-xl">第 {searchParams.step} 步</h1>
        <Progress value={Number(searchParams.step) * 25} />
      </div>
      {Number(searchParams.step) === 1 && <StepOne />}
      {Number(searchParams.step) === 2 && (
        <StepTwo searchParams={searchParams} />
      )}
      {Number(searchParams.step) === 3 && <StepThree />}
    </div>
  );
}
