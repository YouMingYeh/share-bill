"use server";

import { createGroup } from "@/utils/supabase/group";
import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export async function submitCreateGroupForm(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const type = formData.get("type") as string;
  const uuid = randomUUID();
  const created_at = new Date().toISOString();

  const group: Group = {
    id: uuid,
    name,
    created_at,
    description,
    type,
  };

  const data = await createGroup(group);

  redirect(`/start?step=2&groupid=${data.id}`);
}
