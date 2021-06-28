import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import useSWR from "swr";
import { activePageState, itemsState } from "../store/atoms";
import { fetcher } from "../utils/fetcher";
import { BoardView } from "./PageContent/BoardView/BoardView";
import { ListView } from "./PageContent/ListView/ListView";

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

  const view = activePage.data?.isBoardView ? <BoardView /> : <ListView />;
  return <>{view}</>;
};
