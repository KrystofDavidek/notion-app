import React, { useEffect } from "react";
import "./Menu.css";
import { PagesList } from "./PagesList/PagesList";
import { AddPageItem } from "./AddPageItem/AddPageItem";
import { useRecoilState, useSetRecoilState } from "recoil";
import { pagesState } from "../store/atoms";
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";

export const Menu = () => {
  const [pages, setPages] = useRecoilState(pagesState);
  const setNewPage = useSetRecoilState(pagesState);
  const { data, error } = useSWR("http://localhost:5000/pages", fetcher);

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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: pageTitle }),
    };
    const response = await fetch("http://localhost:5000/page", requestOptions);
    const page = await response.json();
    setNewPage({ isLoading: false, data: [...data, page] });
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
