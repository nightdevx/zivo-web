export interface Album {
  company_id: string;
  created_at: string;
  id: string;
  service_id: string;
  cover_image: {
    id: string;
    url: string;
    image_path: string;
  };
  service: {
    id: string;
    name: string;
  };
  images: {
    id: string;
    url: string;
  }[];
}

export interface AlbumInsert {
  cover_image: string | null;
  service_id: string;
  images: {
    image_id: string;
  }[];
}
export interface AlbumUpdate {
  id: string;
  company_id: string;
  service_id: string;
}
