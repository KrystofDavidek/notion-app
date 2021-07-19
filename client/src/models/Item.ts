export enum Label {
  ToDo = "To-do",
  Doing = "Doing",
  Done = "Done",
}
export interface Item {
  _id: string;
  id: number;
  text: string;
  media_id: number;
  page_id: string;
  order: number;
  done: boolean;
  label: Label;
  created_at: number;
  modified_at: number | null;
  deleted_at: number | null;
  imageURL: string;
}
