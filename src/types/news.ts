// 백엔드 명세에 맞춘 카테고리 타입
export type CategoryType =
  | "politics"
  | "economy"
  | "society"
  | "it"
  | "sports";

// 단일 뉴스 아이템 (명세서 기준)
export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  url: string;
  category: CategoryType;
  publishedAt: string;
}

// 뉴스 전체 조회 Response (페이지네이션)
export interface NewsListResponse {
  content: NewsItem[];
  page: number;
  size: number;
  totalElements: number;
}

// 뉴스 저장 Request
export interface CreateNewsRequest {
  title: string;
  summary: string;
  url: string;
  category: CategoryType;
  publishedAt: string;
}

// 뉴스 저장 Response
export interface CreateNewsResponse {
  id: number;
  message: string;
}

// URL 중복 확인 Response
export interface NewsExistsResponse {
  exists: boolean;
}

// 뉴스 요약 (기존 기능용 - 유지)
export interface NewsSummary {
  summary: string;
  date: string;
}
