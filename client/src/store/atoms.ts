import { atom } from "recoil";
import { Item } from "../models/Item";
import { PageData } from "../models/PageData";

interface PagesView {
  isLoading: boolean;
  data: PageData[];
}
interface ActivePageView {
  isLoading: boolean;
  data?: PageData;
}
interface ItemsView {
  isLoading: boolean;
  data: Item[];
}

export const pagesState = atom<PagesView>({
  key: "pages",
  default: {
    isLoading: true,
    data: [],
  },
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
      icon_path: null,
      created_at: 1624440423764,
      modified_at: 1624440450026,
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
