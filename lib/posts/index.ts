import type { Post } from "./types";
import { talosCncfVienna } from "./talos-cncf-vienna-sep-2026";
import { netappTridentOnTalos } from "./netapp-trident-on-talos";

export type { Post, PostSection, PostLink } from "./types";

/** Newest first. */
export const posts: Post[] = [talosCncfVienna, netappTridentOnTalos].sort(
  (a, b) => b.dateISO.localeCompare(a.dateISO),
);
