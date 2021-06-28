export interface PageData {
  _id: string;
  title: string;
  user_id: number;
  icon_id: string;
  list_page_type: boolean;
  checkboxes: boolean;
  created_at: number | null;
  modified_at: number | null;
  deleted_at: number | null;
}
