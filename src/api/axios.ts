import axios from "axios";

// 백엔드가 준비될 때까지 존재하지 않는 URL로 설정하여 즉시 에러 처리
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:9999";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000, // 1초 후 타임아웃 (빠르게 Mock 데이터로 전환)
});
