import clsx from "clsx";
import useForm from "../hooks/useForm";
import { signupSchema, type SignupForm } from '../schema/signup.schema';

const SignupPage = () => {
  const { values, errors, touched, getInputProps } = useForm<SignupForm>({
    initialValue: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },

    validate: (values) => {
      const result = signupSchema.safeParse(values);

      if (result.success) return {
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
      };

      const newErrors: Record<keyof SignupForm, string> = {
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
      };

      result.error.issues.forEach((err) => {
        const key = err.path[0] as keyof SignupForm;
        newErrors[key] = err.message;
      });

      return newErrors;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Zod 검증 통과한 값:", values);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Newsugar 회원가입
        </h1>
        <p className="text-slate-500 text-sm mt-2">
          오늘의 뉴스를 가장 쉽고 빠르게 만나보세요.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* 이름 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            이름
          </label>
          <input
            {...getInputProps("name")}
            placeholder="홍길동"
            className={clsx(
              "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              touched.name && errors.name
                ? "border-red-500"
                : "border-slate-300"
            )}
          />
          {touched.name && errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        {/* 이메일 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            이메일
          </label>
          <input
            {...getInputProps("email")}
            placeholder="you@example.com"
            type="email"
            className={clsx(
              "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              touched.email && errors.email
                ? "border-red-500"
                : "border-slate-300"
            )}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            비밀번호
          </label>
          <input
            {...getInputProps("password")}
            placeholder="••••••••"
            type="password"
            className={clsx(
              "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              touched.password && errors.password
                ? "border-red-500"
                : "border-slate-300"
            )}
          />
          {touched.password && errors.password && (
            <p className="text-red-500 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            비밀번호 확인
          </label>
          <input
            {...getInputProps("passwordCheck")}
            placeholder="••••••••"
            type="password"
            className={clsx(
              "w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              touched.passwordCheck && errors.passwordCheck
                ? "border-red-500"
                : "border-slate-300"
            )}
          />
          {touched.passwordCheck && errors.passwordCheck && (
            <p className="text-red-500 text-xs mt-1">{errors.passwordCheck}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          회원가입하기
        </button>

        <div className="mt-6 text-center text-sm text-slate-500">
          이미 계정이 있으신가요?{' '}
          <a href="/login" className="text-blue-600 font-semibold hover:underline">
            로그인
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;