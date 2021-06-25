export interface PageData {
  _id: string;
  title: string;
  user_id: number;
  modified_info_id: number;
  icon_id: string;
  list_page_type: boolean;
  checkboxes: boolean;
  created_at: number;
  modified_at: number | null;
  deleted_at: number | null;
}
