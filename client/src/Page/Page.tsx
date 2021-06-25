import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import {activePageState, itemsStateDoing, itemsStateDone, itemsStateToDo} from "../store/atoms";
import { fetcher } from "../utils/fetcher";
import { BoardData, BoardView } from "./PageContent/BoardView/BoardView";
import { ListView } from "./PageContent/ListView/ListView";

export const Page = () => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const { data, error } = useSWR(`http://localhost:5000/page/${activePage.data?._id}/notes`, fetcher);
  const [items, setItems] = useRecoilState(itemsStateToDo);
  const boards: BoardData[] = [
    { id: 0, title: "First", itemsState: itemsStateToDo },
    { id: 1, title: "Second", itemsState: itemsStateDoing },
    { id: 2, title: "Third", itemsState: itemsStateDone },
  ];

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

  const view = activePage.data?.list_page_type ? <ListView /> : <BoardView boards={boards} />;
  return <>{view}</>;
};
