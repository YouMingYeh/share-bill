type Profile = {
  id: string;
  username: string;
  created_at: string;
  picture_url: string | null;
  email: string;
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
};

type UserConnectsGroup = {
  group_has_user_id: string;
  group_id: string;
  user_id: string;
};
