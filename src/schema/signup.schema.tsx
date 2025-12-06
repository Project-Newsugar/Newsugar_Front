import { z } from "zod";

export const signupSchema = z
  .object({
    name: z
      .string({
        error: "이름을 입력해주세요.",
      })
      .min(1, "이름을 입력해주세요.")
      .max(30, "이름은 30자 이하여야 합니다."),
    email: z
      .string({
        error: "이메일을 입력해주세요.",
      })
      .min(1, "이메일을 입력해주세요.")
      .email("올바른 이메일 형식이 아닙니다."),

    password: z
      .string({
        error: "비밀번호를 입력해주세요.",
      })
      .min(1, "비밀번호를 입력해주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 20자 이하여야 합니다."),

    passwordCheck: z
      .string({
        error: "비밀번호 확인을 입력해주세요.",
      })
      .min(1, "비밀번호 확인을 입력해주세요.")
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .max(20, "비밀번호는 20자 이하여야 합니다."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"], // passwordCheck에 오류 표시
  });

export type SignupForm = z.infer<typeof signupSchema>;
