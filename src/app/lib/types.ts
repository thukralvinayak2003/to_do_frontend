import { number, z } from "zod";

export const signUpSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(3, "Password should be at least 3 characters"),
    confirmPassword: z
      .string()
      .min(3, "Password should be at least 3 characters"),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const createTaskSchema = z.object({
  task_title: z.string(),
  task_description: z.string(),
  due_date: z.string(),
  status: z.string(),
  priority: z.string(),
});

export type TSignUpSchema = z.infer<typeof signUpSchema>;

export type TLogInSchema = z.infer<typeof loginSchema>;

export type TCreateTaskSchema = z.infer<typeof createTaskSchema>;

export type Task = {
  _id: string;
  task_title: string;
  task_description: string;
  due_date: Date;
  status: string;
  priority: string;
};
