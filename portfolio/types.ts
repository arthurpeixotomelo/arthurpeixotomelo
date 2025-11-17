

export type Props = {
  context: any,
  user: {
    avatar_url: string;
    name: string;
    bio: string;
    location: string;
    public_repos: number;
    followers: number;
    following: number;
  },
  repos: [
    {
      name: string;
      private: boolean;
      homepage: string | null;
      topics: [];
    }
  ]
};

export type Repo = {
  repo: {
    name: string;
    private: boolean;
    homepage: string | null;
    topics: [];
  }
}