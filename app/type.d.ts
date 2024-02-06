type Profile = {
  id: string;
  username: string;
  created_at: string;
  picture_url: string | null;
};

type Group = {
  id: string;
  name: string;
  created_at: string;
  description: string;
  type: string;
};
