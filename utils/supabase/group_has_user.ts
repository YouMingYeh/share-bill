import { createClient } from "./server";
import { cookies } from "next/headers";

export const getGroupHasUser = async (group_id: string | undefined) => {
  if (group_id === "undefined" || !group_id) {
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
  if (!group_has_user.group_id) {
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
