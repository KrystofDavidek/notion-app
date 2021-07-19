import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import { activePageState, itemsState, iconsState } from "../store/atoms";
import { fetcher, putFetcher } from "../utils/fetcher";
import { BoardView } from "./PageContent/BoardView/BoardView";
import { ListView } from "./PageContent/ListView/ListView";
import "./Page.css";
import { Item } from "../models/Item";

export const Page = () => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(itemsState);
  const [pageIcons, setPageIcons] = useRecoilState(iconsState);

  const getData = (endpoint: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(endpoint, fetcher);
    return { data: data, error: error };
  };

  const { data: dataIcons, error: iconError } = getData("pageIcons");
  const { data: dataItems, error: itemsError} = getData(`page/${activePage.data?._id}/notes`)

  useEffect(() => {
    const set = () => {
      if (items.isLoading && dataItems) {
        setItems({ isLoading: false, data: [...dataItems].sort(compareItems) });
      }
      if (pageIcons.isLoading && dataIcons) {
        setPageIcons({ isLoading: false, data: dataIcons });
      }
    };
    set();
  });

  if (itemsError) return <div>failed to load</div>;
  if (!dataItems) return <div>loading...</div>;

  if (iconError) return <div>failed to load</div>;
  if (!dataIcons) return <div>loading...</div>;

  const compareItems = (a: Item, b: Item) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  };

  const switchView = async (boardView: boolean) => {
    try {
      boardView
        ? await putFetcher(`switchPageToBoardView/${activePage.data._id}`)
        : await putFetcher(`switchPageToListView/${activePage.data._id}`);
    } catch {
      throw Error("Switching between list view and board view was not successful.");
    }
    const newPage = { ...activePage.data };
    newPage.isBoardView = boardView;
    setActivePage({ data: newPage });
  };

  const activePageIcon = pageIcons.data.find((icon) => icon.unified === activePage.data.icon_id)?.emoji;

  const view = activePage.data?.isBoardView ? <BoardView /> : <ListView />;
  return (
    <div className="page">
      <div className="page__header">
        <div className="page__icon">{activePageIcon}</div>
        <h1 className={"page__title"}>{activePage.data.title}</h1>
      </div>
      <div className="switchButtons">
        <button
            onClick={() => switchView(true)} type="button"
            className={activePage.data.isBoardView ? "switchButtons__board-active" : "switchButtons__board-inactive"}>
          <span className="switchButtons__name">Board View</span>
          <img className="switchButtons__icon"
               src={"https://icons.getbootstrap.com/assets/icons/layout-three-columns.svg"} alt="Board layout"/>
        </button>
        <button
            onClick={() => switchView(false)} type="button"
            className={activePage.data.isBoardView ? "switchButtons__list-inactive" : "switchButtons__list-active"}>
          <span className="switchButtons__name">List View</span>
          <img className="switchButtons__icon" src={"https://icons.getbootstrap.com/assets/icons/list-ul.svg"}
               alt="List layout"/>
        </button>
      </div>
      {view}
    </div>
  );
};
