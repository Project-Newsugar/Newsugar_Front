import type { NewsSummary } from "../types/news";
import type { Quiz, QuizSubmission, QuizResult } from "../types/quiz";
import { axiosInstance } from "./axios";
import { MOCK_NEWS_SUMMARY, MOCK_QUIZ } from "./mockData";

export const newsApi = {
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

  getNewsByCategory: async (category: string): Promise<NewsSummary> => {
    try {
      const { data } = await axiosInstance.get<NewsSummary>(
        `/news/category/${category}`
      );
      return data;
    } catch (error) {
      console.warn(
        `Failed to fetch news for category ${category}, using mock data:`,
        error
      );
      return {
        summary: `${category} 카테고리의 뉴스 요약 내용입니다.`,
        date: new Date().toISOString(),
      };
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

  submitQuizAnswer: async (submission: QuizSubmission): Promise<QuizResult> => {
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
