import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleLogo } from '../assets';

const LoginPage = () => {
  const navigate = useNavigate();

  // 1. 입력값 상태 관리 (State)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // 2. 에러 메시지 상태 관리
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  // 3. 입력 핸들러: 글자를 칠 때마다 state 업데이트
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 타이핑 시작하면 해당 필드의 에러 메시지 삭제 (UX 향상)
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // 4. 유효성 검사 (Validation)
  const validate = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    // 이메일 검사 (간단한 정규식)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = '올바른 이메일 형식이 아닙니다.';
      isValid = false;
    }

    // 비밀번호 검사
    if (!formData.password) {
      newErrors.password = '비밀번호를 입력해주세요.';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = '비밀번호는 8자 이상이어야 합니다.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 5. 로그인 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // 새로고침 방지

    // 유효성 검사 통과 시에만 실행
    if (validate()) {
      console.log('로그인 시도:', formData);
      // TODO: 나중에 여기서 실제 API 호출 (axios)
      
      // 임시: 성공했다고 치고 온보딩으로 이동
      alert('로그인 성공! (임시)');
      navigate('/onboarding');
    }
  };

  // 6. 구글 로그인 핸들러 (임시)
  const handleGoogleLogin = () => {
    alert('구글 로그인은 추후 GCP 설정 후 연동됩니다.');
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Newsugar 로그인
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          오늘의 뉴스를 가장 쉽고 빠르게 만나보세요.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            이메일
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.password ? 'border-red-500' : 'border-slate-300'
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          로그인하기
        </button>
      </form>

      {/* 구분선과 소셜 로그인 */}
      <div className="my-6 flex items-center">
        <div className="grow border-t border-slate-200"></div>
        <span className="mx-4 text-xs text-slate-400">또는</span>
        <div className="grow border-t border-slate-200"></div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
      >
        <GoogleLogo className="w-5 h-5" />
        <span className="text-slate-700">Google로 계속하기</span>
      </button>

      <div className="mt-6 text-center text-sm text-slate-500">
        아직 계정이 없으신가요?{' '}
        <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
          회원가입
        </Link>
      </div>
    </div>
  )
}

export default LoginPage