"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";

export function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Please wait..." : label}
    </Button>
  );
}
