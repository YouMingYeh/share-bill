import { createClient } from "./server";
import { cookies } from "next/headers";

export const createUserConnectsGroup = async (
  user_connects_group: UserConnectsGroup,
) => {
  ("use server");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_connects_group")
    .insert([user_connects_group])
    .select();

  return { data, error };
};

export const getUserConnectsGroup = async (group_id: string | undefined) => {
  if (group_id === "undefined" || !group_id) {
    return [];
  }
  ("use server");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("user_connects_group")
    .select()
    .eq("group_id", group_id);

  if (error) {
    throw new Error("Failed to fetch group data");
  }
  return data;
};
