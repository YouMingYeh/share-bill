import NextPage from "@/components/NextPage";
import PreviousPage from "@/components/PreviousPage";
import { Progress } from "@/components/ui/progress";

export default function Login({
  searchParams,
}: {
  searchParams: { step: string };
}) {
  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <PreviousPage
        href={`/start?step=${Number(searchParams.step) - 1}`}
        label="上一步"
      />
      <NextPage
        href={`/start?step=${Number(searchParams.step) + 1}`}
        label="下一步"
      />
      <Progress value={Number(searchParams.step) * 10} />
      {searchParams.step}
    </div>
  );
}
