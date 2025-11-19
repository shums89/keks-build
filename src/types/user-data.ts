export type UserData = {
  id: number;
  name: string;
  email: string;
  avatarUrl: string;
  token: string;
};

export type AuthData = {
  name: string;
  login: string;
  password: string;
  avatarUrl: string | null;
};
