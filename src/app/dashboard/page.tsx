"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Modal } from "../components/Modal";
import CreateTaskForm from "../components/CreateTaskForm";
import { CloseRounded } from "@mui/icons-material";
import Card from "../components/Card";
import { Task } from "../lib/types";

export default function Page() {
  const [name, setName] = useState("User");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      withCredentials: true,
    });
    router.push(`/`);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/task`,
        {
          withCredentials: true,
        }
      );
      setName(response.data.data.doc[0].userId.name);
      setTasks(response.data.data.doc);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [tasks]);
  const handleButtonClick = () => {
    setIsActive((prevState) => !prevState);
  };

  const handleFormSubmitSuccess = () => {
    setIsActive(false); // Close the modal
  };

  return (
    <div className="container flex w-screen min-h-screen">
      <div>
        {isActive && (
          <Modal>
            <div className="bg-state-300 p-10">
              <div className="flex justify-end">
                <button className="text-black" onClick={handleButtonClick}>
                  <CloseRounded />
                </button>
              </div>
              <CreateTaskForm onSubmitSuccess={handleFormSubmitSuccess} />
            </div>
          </Modal>
        )}
      </div>
      <div className="bg-slate-100 w-1/4 min-h-screen">
        <h1 className="m-3 font-bold">{name}</h1>
        <div className="flex justify-center items-center">
          <button
            className="bg-violet-950 text-white p-3 rounded-md"
            onClick={handleButtonClick}
          >
            Create Task +
          </button>
          <button
            className="bg-violet-950 text-white p-3 rounded-md m-3"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="bg-slate-300 w-screen min-h-screen flex">
        <div className="w-1/4">
          <h1 className="ml-2 xl font-bold bg-white w-fit p-4 rounded">
            {" "}
            To-Do
          </h1>
          {tasks
            .filter((task) => task.status === "To-Do")
            .map((task) => (
              <Card
                key={task._id}
                taskid={task._id}
                task_title={task.task_title}
                task_description={task.task_description}
                status={task.status}
                priority={task.priority}
                due_date={task.due_date}
              />
            ))}
        </div>
        <div className="w-1/4">
          <h1 className="xl font-bold bg-white w-fit p-4 rounded">
            {" "}
            In Progress
          </h1>
          {tasks
            .filter((task) => task.status === "In Progress")
            .map((task) => (
              <Card
                key={task._id}
                taskid={task._id}
                task_title={task.task_title}
                task_description={task.task_description}
                status={task.status}
                priority={task.priority}
                due_date={task.due_date}
              />
            ))}
        </div>
        <div className="w-1/4">
          <h1 className="xl font-bold bg-white w-fit p-4 rounded">
            {" "}
            Under Review
          </h1>
          {tasks
            .filter((task) => task.status === "Under Review")
            .map((task) => (
              <Card
                key={task._id}
                taskid={task._id}
                task_title={task.task_title}
                task_description={task.task_description}
                status={task.status}
                priority={task.priority}
                due_date={task.due_date}
              />
            ))}
        </div>
        <div className="w-1/4">
          <h1 className="xl font-bold bg-white w-fit p-4 rounded">
            {" "}
            Completed
          </h1>
          {tasks
            .filter((task) => task.status === "Completed")
            .map((task) => (
              <Card
                key={task._id}
                taskid={task._id}
                task_title={task.task_title}
                task_description={task.task_description}
                status={task.status}
                priority={task.priority}
                due_date={task.due_date}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
