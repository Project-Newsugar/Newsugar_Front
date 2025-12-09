export type CategoryType = '정치' | '경제' | '과학/기술' | '스포츠' | '문화' | '국제';

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  date: string;        
  source: string;
  author: string;
  imageUrl: string;
  summary: string;
  tags: string; 
  originalUrl: string;
};

export interface NewsSummary {
  summary: string;
  date: string;
}
