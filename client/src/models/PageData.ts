export interface PageData {
  _id: string;
  title: string;
  user_id: number;
  icon_id: string;
  isBoardView: boolean;
  checkboxes: boolean;
  created_at: number | null;
  modified_at: number | null;
  deleted_at: number | null;
}
