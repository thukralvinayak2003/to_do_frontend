import {
  Delete,
  DoneOutline,
  Edit,
  NextPlanRounded,
} from "@mui/icons-material";
import { Chip } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

type CardProps = {
  taskid: string;
  task_title: string;
  task_description: string;
  due_date: Date;
  status: string;
  priority: string;
};

const Card: React.FC<CardProps> = ({
  taskid,
  task_title,
  task_description,
  due_date,
  status,
  priority,
}) => {
  const [completed, setCompleted] = useState(false);

  const handleDelete = async () => {
    return await axios.delete(`http://localhost:3001/api/task/${taskid}`, {
      withCredentials: true,
    });
  };

  const handleProgress = async () => {
    if (status == "To-Do") {
      return await axios.patch(
        `http://localhost:3001/api/task/${taskid}`,
        {
          status: "In Progress",
        },
        { withCredentials: true }
      );
    }
    if (status == "In Progress") {
      return await axios.patch(
        `http://localhost:3001/api/task/${taskid}`,
        {
          status: "Under Review",
        },
        { withCredentials: true }
      );
    }
    if (status == "Under Review") {
      return await axios.patch(
        `http://localhost:3001/api/task/${taskid}`,
        {
          status: "Completed",
        },
        { withCredentials: true }
      );
    }
  };

  const handleComplete = async () => {
    console.log(taskid, " ", completed);

    if (completed == false) {
      setCompleted(true);
      return await axios.patch(
        `http://localhost:3001/api/task/${taskid}`,
        {
          status: "Completed",
        },
        { withCredentials: true }
      );
    } else {
      setCompleted(false);
      return await axios.patch(
        `http://localhost:3001/api/task/${taskid}`,
        {
          status: "Completed",
        },
        { withCredentials: true }
      );
    }
  };

  return (
    <>
      <div className="m-5">
        <div className="block rounded-lg bg-slate-100  p-6 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-black">
          <div>
            <h1 className="font-semibold "> {task_title}</h1>
            <p className="mb-4 text-base">{task_description}</p>
            <Chip label={priority} />
            <Chip color="primary" label={status} className="m-1" />
            <div className="flex">
              <button
                type="button"
                onClick={handleDelete}
                className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-slate-100 /30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                <Delete />
              </button>
              {status != "Completed" ? (
                <div>
                  <button
                    onClick={handleComplete}
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-slate-100 /30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    <DoneOutline />
                  </button>
                  <button
                    onClick={handleProgress}
                    type="button"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-slate-100 /30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                    data-twe-ripple-init
                    data-twe-ripple-color="light"
                  >
                    <NextPlanRounded />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
