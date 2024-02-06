import { createClient } from "./server";
import { cookies } from "next/headers";

export const getUserConnectsGroupByUserId = async (user_id: string) => {
  if (!user_id) {
    return [];
  }
  ("use server");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  //   SELECT
  //   group_id, description, name, type
  // FROM
  //   profile AS p
  //   JOIN user_connects_group AS ucg On p.id = ucg.user_id
  //   JOIN public.group AS g ON ucg.group_id = g.id
  const { data, error } = await supabase
    .from("user_connects_group")
    .select(
      `
    id,
    user_id,
    group (id, name, description, type)
  `,
    )
    .eq("user_id", user_id);

  if (error) {
    console.error("Failed to fetch group data", error);
  }

  return { data, error };
};

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
