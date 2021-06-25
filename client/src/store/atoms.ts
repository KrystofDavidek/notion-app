import { atom } from "recoil";
import { PageData } from "../models/PageData";
import { EmojiData } from "../models/Icon"

interface PageView {
  isLoading: boolean;
  data: PageData[];
}

interface IconView {
  isLoading: boolean;
  data: EmojiData[];
}

export const pagesState = atom<PageView>({
  key: "pages",
  default: {
    isLoading: true,
    data: [],
  },
});

export const iconsState = atom<IconView>({
  key: "icons",
  default: {
    isLoading: true,
    data: [],
  },
});