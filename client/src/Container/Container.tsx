import React from "react";
import { Page } from "../Page/Page";
import { RecoilRoot } from "recoil";
import { Menu } from "../Menu/Menu";
import "./Container.css";

export const Container = () => {
  return (
    <div className="container">
      <RecoilRoot>
        <Menu />
        <Page />
      </RecoilRoot>
    </div>
  );
};
