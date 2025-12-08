import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthLayout } from './layout/AuthLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OnboardingBasicPage from './pages/OnboardingBasicPage';
import { MainLayout } from './layout/MainLayout';

const router = createBrowserRouter([
{
    element: <AuthLayout />,
    children: [
    { path: '/login', element: <LoginPage /> },
    { path: '/signup', element: <SignupPage /> },
    { path: '/onboarding', element: <OnboardingBasicPage /> },
    ],
},
{
    element: <MainLayout />,
    children: [
      // { path: '/', element: <HomePage /> },
      // { path: '/categories', element: <CategoriesPage /> },
      // { path: '/category/:categoryName', element: <CategoryDetailPage /> },
      // { path: '/news/:newsId', element: <NewsDetailPage /> },
      { path: '/', element: <div>홈페이지 준비중...</div> }
    ],
},
{
    path: '*',
    element: <Navigate to="/" replace />,
},
]);

export default router