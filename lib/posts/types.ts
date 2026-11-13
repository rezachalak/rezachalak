export type PostSection = {
  heading?: string;
  body?: string[];
  list?: string[];
  code?: { lang: string; content: string };
  callout?: string;
  /** Render `code` above `body` — for sections that lead with an error message. */
  codeFirst?: boolean;
};

export type PostLink = {
  label: string;
  href: string;
  kind: "slides" | "repo" | "video" | "external";
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  dateISO: string;
  readingTime: string;
  excerpt: string;
  tags: string[];
  event?: string;
  links?: PostLink[];
  sections: PostSection[];
};
