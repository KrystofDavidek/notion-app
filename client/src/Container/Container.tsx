import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Page from "../Page/Page";
import { Menu } from "../Menu/Menu";
import { PageData } from "../Page/Page";
import { fetcher } from "../utils/fetcher";
import "./Container.css";

export default function Container() {
  const [pages, setPages] = useState<PageData[]>([]);
  const { data, error } = useSWR("http://localhost:5000/pages", fetcher);

  useEffect(() => {
    function fetchPages() {
      setPages(data);
    }
    fetchPages();
  });

  return (
    <div className="container">
      <Menu pages={pages} />
      <Page />
    </div>
  );
}
