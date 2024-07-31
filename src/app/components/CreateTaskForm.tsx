"use client";

import { createTaskSchema, TCreateTaskSchema } from "@/app/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

interface CreateTaskFormProps {
  onSubmitSuccess: () => void;
}

function CreateTaskForm({ onSubmitSuccess }: CreateTaskFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<TCreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: TCreateTaskSchema) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/task",
        data,
        { withCredentials: true }
      );
      onSubmitSuccess();
      router.push(`/dashboard/`);
    } catch (err: any) {
      console.log(err);
    }
  };

  const onInvalid = (errors: any) => console.error(errors);

  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="task_title"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Task title
        </label>
        <input
          id="task_title"
          {...register("task_title")}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 mb-5"
          placeholder="Task Description"
          required
        />
        <label
          htmlFor="task_description"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Task Description
        </label>
        <input
          id="task_description"
          {...register("task_description")}
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-purple-500 dark:focus:border-purple-500 mb-5"
          placeholder="Task Description"
          required
        />
        {errors.task_description && (
          <p className="text-red-500">{errors.task_description.message}</p>
        )}

        <label
          htmlFor="due_date"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Due Date
        </label>
        <input
          id="due_date"
          {...register("due_date")}
          type="date"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-purple-500 dark:focus:border-purple-500"
          required
        />
        {errors.due_date && (
          <p className="text-red-500">{errors.due_date.message}</p>
        )}

        <label
          htmlFor="status"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Status
        </label>
        <select
          id="status"
          {...register("status")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-purple-500 dark:focus:border-purple-500 mb-5"
        >
          <option value="To-Do">To-Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Under Review">Under Review</option>
          <option value="Completed">Completed</option>
        </select>
        {errors.status && (
          <p className="text-red-500">{errors.status.message}</p>
        )}

        <label
          htmlFor="priority"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Priority
        </label>
        <select
          id="priority"
          {...register("priority")}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-purple-500 dark:focus:border-purple-500"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && (
          <p className="text-red-500">{errors.priority.message}</p>
        )}

        <input
          type="submit"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 mt-6"
          disabled={isSubmitting} // Disable the button during submission
        />
      </form>
    </div>
  );
}

export default CreateTaskForm;
