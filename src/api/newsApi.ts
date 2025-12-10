import type {
  NewsItem,
  NewsListResponse,
  CreateNewsRequest,
  CreateNewsResponse,
  NewsExistsResponse,
  NewsSummary,
  CategoryType,
} from "../types/news";
import type {
  Quiz,
  QuizSubmission,
  QuizResult,
  CreateQuizRequest,
  CreateQuizResponse,
  GetQuizResponse,
  SubmitQuizAnswerRequest,
  SubmitQuizAnswerResponse,
} from "../types/quiz";
import { axiosInstance } from "./axios";
import { MOCK_NEWS_SUMMARY, MOCK_QUIZ } from "./mockData";

export const newsApi = {
  // 1. 뉴스 전체 조회 (페이지네이션)
  getAllNews: async (
    page: number = 0,
    size: number = 20
  ): Promise<NewsListResponse> => {
    const { data } = await axiosInstance.get<NewsListResponse>("/api/v1/news", {
      params: { page, size },
    });
    return data;
  },

  // 2. 카테고리별 뉴스 조회
  getNewsByCategory: async (category: CategoryType): Promise<NewsItem[]> => {
    const { data } = await axiosInstance.get<NewsItem[]>(
      `/api/v1/news/category/${category}`
    );
    return data;
  },

  // 3. 단일 뉴스 조회
  getNewsById: async (newsId: number): Promise<NewsItem> => {
    const { data } = await axiosInstance.get<NewsItem>(
      `/api/v1/news/${newsId}`
    );
    return data;
  },

  // 4. 뉴스 저장 (크롤러/배치 서버용)
  createNews: async (
    newsData: CreateNewsRequest
  ): Promise<CreateNewsResponse> => {
    const { data } = await axiosInstance.post<CreateNewsResponse>(
      "/api/v1/news",
      newsData
    );
    return data;
  },

  // 5. 중복 URL 여부 확인
  checkNewsExists: async (url: string): Promise<NewsExistsResponse> => {
    const { data } = await axiosInstance.get<NewsExistsResponse>(
      "/api/v1/news/exists",
      {
        params: { url },
      }
    );
    return data;
  },

  // ========== 퀴즈 API (API 명세 기준) ==========

  // 6. 퀴즈 생성
  createQuiz: async (
    quizData: CreateQuizRequest
  ): Promise<CreateQuizResponse> => {
    const { data } = await axiosInstance.post<CreateQuizResponse>(
      "/api/v1/quizzes",
      quizData
    );
    return data;
  },

  // 7. 퀴즈 조회
  getQuizById: async (quizId: number): Promise<GetQuizResponse> => {
    const { data } = await axiosInstance.get<GetQuizResponse>(
      `/api/v1/quizzes/${quizId}`
    );
    return data;
  },

  // 8. 퀴즈 답안 제출
  submitQuizAnswer: async (
    answerData: SubmitQuizAnswerRequest
  ): Promise<SubmitQuizAnswerResponse> => {
    const { data } = await axiosInstance.post<SubmitQuizAnswerResponse>(
      "/api/v1/quiz-answers",
      answerData
    );
    return data;
  },

  // ========== 기존 API (유지) ==========
  getNewsSummary: async (time?: string): Promise<NewsSummary> => {
    try {
      const params = time ? { time } : {};
      const { data } = await axiosInstance.get<NewsSummary>("/news/summary", {
        params,
      });
      return data;
    } catch (error) {
      console.warn("Failed to fetch news summary, using mock data:", error);
      return MOCK_NEWS_SUMMARY;
    }
  },

  getTodayQuiz: async (time?: string): Promise<Quiz> => {
    try {
      const params = time ? { time } : {};
      const { data } = await axiosInstance.get<Quiz>("/quiz/today", {
        params,
      });
      return data;
    } catch (error) {
      console.warn("Failed to fetch today's quiz, using mock data:", error);
      return MOCK_QUIZ;
    }
  },

  // 기존 API (하위 호환용 - 레거시)
  submitQuizAnswerLegacy: async (submission: QuizSubmission): Promise<QuizResult> => {
    try {
      const { data } = await axiosInstance.post<QuizResult>(
        "/quiz/submit",
        submission
      );
      return data;
    } catch (error) {
      console.warn(
        "Failed to submit quiz answer, using mock validation:",
        error
      );
      const isCorrect = submission.userAnswer === MOCK_QUIZ.correctAnswer;
      return {
        isCorrect,
        correctAnswer: MOCK_QUIZ.correctAnswer,
        explanation: MOCK_QUIZ.explanation,
      };
    }
  },
};
