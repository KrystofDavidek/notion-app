import React, { useEffect } from "react";
import "./Menu.css";
import { PagesList } from "./PagesList/PagesList";
import { AddPageItem } from "./AddPageItem/AddPageItem";
import { useRecoilState } from "recoil";
import { activePageState, pagesState } from "../store/atoms";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const Menu = () => {
  const [activePage, setActivePage] = useRecoilState(activePageState);
  const { data, error } = useSWR("http://localhost:5000/pages", fetcher);
  const [pages, setPages] = useRecoilState(pagesState);

  useEffect(() => {
    const set = () => {
      if (pages.isLoading && data) {
        setPages({ isLoading: false, data: data });
      }
    };
    set();
  });

  const addPageItem = async (pageTitle: string) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ title: pageTitle }),
    };
    const response = await fetch("http://localhost:5000/page", requestOptions);
    const page = await response.json();
    setPages({ isLoading: false, data: [...pages.data, page] });
  };

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <nav className="menu">
      <h1 className="menu__header">
        <img alt="Page icon" className="menu__page-icon" src="/client/src/assets/page-school.svg" />
        Notes X
      </h1>
      <PagesList pages={pages.data} />
      <AddPageItem addPageItem={addPageItem} />
    </nav>
  );
};
