import { atom } from "recoil";
import { PageData } from "../models/PageData";

interface PageView {
  isLoading: boolean;
  data: PageData[];
}

export const pagesState = atom<PageView>({
  key: "pages",
  default: {
    isLoading: true,
    data: [],
  },
});
