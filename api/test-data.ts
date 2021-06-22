import { ObjectId } from "mongodb";

export enum Label {
  ToDo = "To-do",
  Doing = "Doing",
  Done = "Done",
}

export const createUser = () => {
  return {
    username: "Anonymous",
    email: "",
    password: "",
    role: 0,
    created_at: Date.now(),
    modified_at: null,
    deleted_at: null,
  };
};

export const createPage = (title: string, userId = null, iconPath = null) => {
  return {
    title: title ? title : "New page",
    user_id: userId,
    list_page_type: true,
    checkboxes: false,
    icon_path: iconPath,
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
