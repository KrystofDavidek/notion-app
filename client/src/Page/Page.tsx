import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import { activePageState, itemsState } from "../store/atoms";
import { fetcher, putFetcher } from "../utils/fetcher";
import { BoardView } from "./PageContent/BoardView/BoardView";
import { ListView } from "./PageContent/ListView/ListView";
import "./Page.css";
import { Item } from "../models/Item";

export const Page = () => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(itemsState);
  const { data, error } = useSWR(`page/${activePage.data?._id}/notes`, fetcher);

  useEffect(() => {
    const set = () => {
      if (items.isLoading && data) {
        setItems({ isLoading: false, data: [...data].sort(compareItems) });
      }
    };
    set();
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

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

  const view = activePage.data?.isBoardView ? <BoardView /> : <ListView />;
  return (
    <div className="page">
      <h1>{activePage.data.title}</h1>
      <div className="switchButtons">
        <button
          onClick={() => switchView(true)}
          type="button"
          className={activePage.data.isBoardView ? "switchButtons__board-active" : "switchButtons__board-inactive"}
        >
          Board View
        </button>
        <button
          onClick={() => switchView(false)}
          type="button"
          className={activePage.data.isBoardView ? "switchButtons__list-inactive" : "switchButtons__list-active"}
        >
          List View
        </button>
      </div>
      {view}
    </div>
  );
};
