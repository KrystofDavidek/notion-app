import { ObjectId } from "mongodb";
import { EmojiData } from "./models/Icon";

export enum Label {
  ToDo = "To-do",
  Doing = "Doing",
  Done = "Done",
}

export const createUser = (username:string, password:string) => {
  return {
    username: username,
    email: "",
    password: password,
    role: 0,
    created_at: Date.now(),
    modified_at: null,
    deleted_at: null,
  };
};

export const createPage = (title: string, userId = null, iconId = "1f5d2-fe0f") => {
  return {
    title: title ? title : "New page",
    user_id: userId,
    list_page_type: true,
    checkboxes: false,
    icon_id: iconId,
    created_at: Date.now(),
    modified_at: null,
    deleted_at: null,
  };
};

export const createNote = (pageId: ObjectId, text: string) => {
  return {
    text: text ? text : "New note",
    media_id: 0,
    page_id: pageId,
    order: 0,
    label: Label.ToDo,
    created_at: Date.now(),
    modified_at: null,
    deleted_at: null,
  };
};

export const createIcon = (emojiData: EmojiData) => {
  return {
    unified: emojiData.unified,
    originalUnified: emojiData.originalUnified,
    names: emojiData.names,
    emoji: emojiData.emoji,
    activeSkinTone: emojiData.activeSkinTone    
  }
}