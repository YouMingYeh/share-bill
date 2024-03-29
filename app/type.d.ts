type Profile = {
  id: string;
  username: string;
  created_at: string;
  picture_url: string | null;
  email: string;
};

type ProfileUpdate = {
  id: string;
  username: string;
  picture_url: string | null;
};

type Group = {
  id: string;
  name: string;
  created_at: string;
  description: string;
  type: string;
};

type GroupHasUserCreate = {
  group_id: string;
  username: string;
  is_owner: boolean;
};

type GroupHasUser = {
  id: string;
  group_id: string;
  username: string;
  is_owner: boolean;
  balance: number;
};

type UserConnectsGroup = {
  group_has_user_id: string;
  group_id: string;
  user_id: string;
};

type UndefinedOrNull = undefined | null | "undefined" | "null";

type Member = {
  name: string | null;
  username: string;
  email: string | null;
  picture_url: string | null;
  is_owner: boolean;
  balance: number;
};

type Payment = {
  payer: Member;
  payee: Member;
  amount: number;
};
