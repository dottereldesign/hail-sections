export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "x"
  | "linkedin"
  | "youtube";

export type SocialLinksPlaceholderProps = {
  heading: string;
  links: { platform: SocialPlatform; href: string }[];
};
