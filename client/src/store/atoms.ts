import { atom } from "recoil";
import { Item } from "../models/Item";
import { PageData } from "../models/PageData";
import { EmojiData } from "../models/Icon"

interface PagesView {
  isLoading: boolean;
  data: PageData[];
}
interface ActivePageView {
  isLoading: boolean;
  data?: PageData;
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
    data: []
  }
});

export const activePageState = atom<ActivePageView>({
  key: "activePage",
  default: {
    isLoading: true,
    data: {
      _id: "60d2fe6768d31b560a17415a",
      title: "New page",
      user_id: 0,
      list_page_type: false,
      checkboxes: false,
      icon_id: "",
      created_at: 1624440423764,
      modified_at: 1624440450026,
      deleted_at: null,
      modified_info_id: 1
    },
  },
});

export const itemsStateListView = atom<ItemsView>({
  key: "itemsListView",
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
