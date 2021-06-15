import { selector } from "recoil";
import { pagesState } from "./atoms";

const titleState = selector({
  key: "titleState",
  get: ({ get }) => {
    const pages = get(pagesState);
    const titles = [...new Set(pages.data.map((p) => p.title))];

    return titles;
  },
});
