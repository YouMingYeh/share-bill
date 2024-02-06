import { createClient } from "./server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getProfile = async (id: string) => {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("profile").select().eq("id", id);

  if (error) {
    throw new Error("Failed to fetch profile");
  }

  return data[0];
};

export const createProfile = async (profile: Profile) => {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("profile")
    .insert([profile])
    .select();

  if (error) {
    redirect("/register?message=failed");
  }

  return data[0];
};

export const updateProfile = async (profile: ProfileUpdate) => {
  "use server";
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("profile")
    .update(profile)
    .eq("id", profile.id);

  console.log(data);

  return { data, error };
};
