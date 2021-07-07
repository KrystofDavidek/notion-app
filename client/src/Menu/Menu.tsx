import React, { useEffect } from "react";
import "./Menu.css";
import { PagesList } from "./PagesList/PagesList";
import { AddPageItem } from "./AddPageItem/AddPageItem";
import { useRecoilState } from "recoil";
import { activePageState, pagesState, iconsState } from "../store/atoms";
import useSWR from "swr";
import { fetcher, postFetcher, putFetcher } from "../utils/fetcher";
import ReactLogo from "../assets/app-icon.svg";
import { EmojiData } from "../models/Icon";

export const Menu = () => {
  const [pages, setPages] = useRecoilState(pagesState);
  const [icons, setIcons] = useRecoilState(iconsState);
  const [activePage, setActivePage] = useRecoilState(activePageState);

  const getData = (endpoint: string) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { data, error } = useSWR(endpoint, fetcher);
    return { data: data, error: error };
  };

  const { data: dataPages, error: pagesError } = getData("pages");
  const { data: dataIcons, error: iconsError } = getData("pageIcons");

  useEffect(() => {
    const set = () => {
      if (pages.isLoading && dataPages) {
        setPages({ isLoading: false, data: dataPages });
        setActivePage({ data: dataPages[0] });
      }
      if (icons.isLoading && dataIcons) {
        setIcons({ isLoading: false, data: dataIcons });
      }
    };
    set();
  });

  const addPageItem = async (pageTitle: string) => {
    const page = await postFetcher("page", JSON.stringify({ title: pageTitle }));
    setPages({ isLoading: false, data: [...pages.data, page] });
  };

  const updatePageIcons = async (pageId: string, icon: EmojiData) => {
    const iconRes = icons.data.find((icn) => icn.unified === icon.unified);
    if (iconRes === undefined) {
      createPageIcon(icon);
    }
    try {
      await putFetcher(`updatePageIcon/${pageId}/${icon.unified}`, JSON.stringify({ iconId: icon.unified }));
    } catch {
      throw Error("Updating icon was not successfull.");
    }
    const newPages = [...pages.data];
    const index = pages.data.findIndex((p) => p._id === pageId);
    const newPage = { ...newPages[index] };
    newPage.icon_id = icon.unified;
    newPages[index] = newPage;
    setPages({ isLoading: false, data: [...newPages] });
  };

  const createPageIcon = async (emojiData: EmojiData) => {
    const icon = await postFetcher("icon", JSON.stringify({ emojiData }));
    setIcons({ isLoading: false, data: [...icons.data, icon] });
  };

  if (pagesError) return <div>failed to load</div>;
  if (!dataPages) return <div>loading...</div>;

  if (iconsError) return <div>failed to load</div>;
  if (!dataIcons) return <div>loading...</div>;

  return (
    <nav className="menu">
      <div className="menu__header">
        <img alt="Page icon" className="menu__page-icon" src={ReactLogo} />
        <h1>Notes X</h1>
      </div>
      {icons && <PagesList pages={pages.data} icons={icons.data} updatePageIcons={updatePageIcons} />}
      <AddPageItem addPageItem={addPageItem} />
    </nav>
  );
};
