import { atom } from "recoil";
import { Item } from "../models/Item";
import { PageData } from "../models/PageData";
import { EmojiData } from "../models/Icon";

interface PagesView {
  isLoading: boolean;
  data: PageData[];
}
interface ActivePageView {
  data: PageData;
}
export interface ItemsView {
  isLoading: boolean;
  data: Item[];
}

interface IconView {
  isLoading: boolean;
  data: EmojiData[];
}

export const pagesState = atom<PagesView>({
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

export const activePageState = atom<ActivePageView>({
  key: "activePage",
  default: {
    data: {
      _id: "",
      title: "New page",
      user_id: 0,
      list_page_type: true,
      checkboxes: false,
      icon_id: "",
      created_at: null,
      modified_at: null,
      deleted_at: null,
    },
  },
});

export const itemsState = atom<ItemsView>({
  key: "items",
  default: {
    isLoading: true,
    data: [],
  },
});

export const itemsStateToDo = atom<ItemsView>({
  key: "itemsToDo",
  default: {
    isLoading: true,
    data: [],
  },
});

export const itemsStateDoing = atom<ItemsView>({
  key: "itemsDoing",
  default: {
    isLoading: true,
    data: [],
  },
});

export const itemsStateDone = atom<ItemsView>({
  key: "itemsDone",
  default: {
    isLoading: true,
    data: [],
  },
});
