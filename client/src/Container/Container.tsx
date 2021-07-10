import React from "react";
import { Page } from "../Page/Page";
import { RecoilRoot } from "recoil";
import { Menu } from "../Menu/Menu";
import "./Container.css";

export const Container: React.FC<{ username: string }> = (username) => {
  return (
    <div className="notion-container">
      <RecoilRoot>
        <Menu />
        <Page />
      </RecoilRoot>
    </div>
  );
};
