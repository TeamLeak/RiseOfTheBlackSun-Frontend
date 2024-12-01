import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type BlogPost = {
  id: string;
  title: string;
  date: string;
  description: string;
  author: string;
  keywords: string[];
  tags: { text: string; color: string }[];
  featured: boolean; // New field for featured posts
};
