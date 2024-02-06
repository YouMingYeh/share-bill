import { type } from "os";
import { createClient } from "./server";
import { cookies } from "next/headers";
import { isStringDefined } from "@/lib/utils";

export const getGroupHasUser = async (group_id: string | undefined) => {
  if (!isStringDefined(group_id)) {
    return [];
  }
  ("use server");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("group_has_user")
    .select()
    .eq("group_id", group_id);

  if (error) {
    throw new Error("Failed to fetch group data");
  }
  return data;
};

export const createGroupHasUser = async (
  group_has_user: GroupHasUserCreate,
) => {
  if (!isStringDefined(group_has_user.group_id)) {
    return;
  }
  ("use server");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("group_has_user")
    .insert([group_has_user])
    .select();

  return { data, error };
};
