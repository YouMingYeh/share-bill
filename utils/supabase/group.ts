import { createClient } from "./server";
import { cookies } from "next/headers";

export const getGroup = async (id: string) => {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("group").select().eq("id", id);

  if (error) {
    throw new Error("Failed to fetch group data");
  }
  return data[0];
};

export const createGroup = async (group: Group) => {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("group").insert([group]).select();

  if (error) {
    throw new Error("Failed to create group");
  }

  return data[0];
};
