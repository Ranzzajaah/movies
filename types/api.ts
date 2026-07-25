export interface CoverImage {
  url: string;
  width?: number;
  height?: number;
}

export interface MediaItem {
  id: string;
  subjectId?: string;
  title: string;
  name?: string;
  cover?: CoverImage;
  posterUrl?: string;
  score?: number;
  releaseYear?: string;
  year?: string;
  duration?: number;
  description?: string;
  introduction?: string;
  subjectType?: number;
}

export interface ApiResponse<T> {
  code: number;
  message?: string;
  data: T;
}

export interface ListResponse<T> {
  items: T[];
  page?: number;
  perPage?: number;
  total?: number;
}
