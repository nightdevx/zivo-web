export interface Image {
  id: string;
  image_path: string;
  image_url?: string;
  uploaded_at: string | null;
}

export interface ImageInsert {
  image_path: string;
}
