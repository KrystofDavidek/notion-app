import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import { activePageState, itemsState } from "../store/atoms";
import { fetcher } from "../utils/fetcher";
import { BoardView } from "./PageContent/BoardView/BoardView";
import { ListView } from "./PageContent/ListView/ListView";
import "./Page.css"

export const Page = () => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const [items, setItems] = useRecoilState(itemsState);
  const { data, error } = useSWR(`http://localhost:5000/page/${activePage.data?._id}/notes`, fetcher);

  useEffect(() => {
    const set = () => {
      if (items.isLoading && data) {
        setItems({ isLoading: false, data: data });
      }
    };
    set();
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  const switchView = async (boardView: boolean) => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    }
    try {
      boardView ? await fetch(`http://localhost:5000/switchPageToBoardView/${activePage.data._id}`, requestOptions)
        : await fetch(`http://localhost:5000/switchPageToListView/${activePage.data._id}`, requestOptions);
    } catch {
      throw Error("Switching between list view and board view was not successful.")
    }
    const newPage = { ...activePage.data }
    newPage.isBoardView = boardView;
    setActivePage({data: newPage})
  }


  const view = activePage.data?.isBoardView ? <BoardView /> : <ListView />;
  return (
    <div className="page">
      <h1>{activePage.data.title}</h1>
      <div className="switchButtons">
        <button onClick={() => switchView(true)} type="button" className={activePage.data.isBoardView ? "switchButtons__board-active" : "switchButtons__board-inactive"}>Board View</button>
        <button onClick={() => switchView(false)} type="button" className={activePage.data.isBoardView ? "switchButtons__list-inactive" : "switchButtons__list-active"}>List View</button>
      </div>
      {view}
    </div>
  )
};
