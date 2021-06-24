export interface PageData {
  _id: string;
  title: string;
  user_id: number;
  list_page_type: boolean;
  checkboxes: boolean;
  icon_path: string | null;
  created_at: number;
  modified_at: number | null;
  deleted_at: number | null;
}
