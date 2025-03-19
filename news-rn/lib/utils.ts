import { Article } from "./types";

export const splitCategory = (category: string) => {
  return category.split("/")[1];
};

export const filterCategory = ({ categories }: Pick<Article, "categories">) => {
  if (categories?.length < 1) return;

  const list = categories.map((category) => splitCategory(category.label));

  const filtered = new Set(list);

  return Array.from(filtered).join(", ");
};
