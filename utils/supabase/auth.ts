import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { createProfile } from "./profile";
export const signUp = async (formData: FormData) => {
  "use server";

  const origin = headers().get("origin");
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  const { user } = data;
  const profile: Profile = {
    id: user?.id as string,
    username: name,
    picture_url: null,
    created_at: user?.created_at as string,
  };

  let profileData = await createProfile(profile);

  if (error) {
    return redirect("/register?message=failed");
  }

  return redirect("/login?message=success");
};

export const signIn = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return redirect("/login?message=failed");
  }

  return redirect("/");
};

export const signOut = async () => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  return redirect("/login");
};
