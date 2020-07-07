//Core
import React, { useState } from "react";
import { claimTask, finishTask } from "actions/home";
import { useAuth } from "helpers/auth-context";
import { useTask, SaveTasks } from "helpers/task-context";
import { CreateTaskProvider } from "helpers/create-task-context";
//Components
import UpdateTaskModal from "components/update-task-modal";
import DeleteTaskModal from "components/delete-task-modal";
import moment from "moment";
import "moment/locale/nl";
//Styles
import styles from "./styles.module.scss";
//Icons
import { Calender } from "icons/calender";
import { Stopwatch } from "icons/stopwatch";
import { Pencil } from "icons/pencil";
import { Chain } from "icons/chain";
import { PriorityLow } from "icons/priority-low";
import { PriorityMedium } from "icons/priority-medium";
import { PriorityHigh } from "icons/priority-high";
import { PriorityCritical } from "icons/priority-critical";

function Task(props) {
  const [{}, setSaveTasks] = useTask();
  const [isFlipped, setIsFlipped] = useState(false);
  const [{ user }] = useAuth();
  const { user_id, user_name } = user;
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  function classNameBorders(status) {
    let result = [];
    result.push("border");
    result.push(styles["border"]);
    if (status && status === user_name) {
      result.push(styles[`border--own`]);
    } else if (status && status !== user_name) {
      result.push(styles[`border--other`]);
    } else {
      result.push(styles[`border--open`]);
    }
    return result.join(" ");
  }

  function handleClick() {
    if (task.task_claimant === null) {
      claimTask(task.task_id, user_id).then(() => SaveTasks(setSaveTasks));
    } else {
      finishTask(task.task_id, user_id).then(() => SaveTasks(setSaveTasks));
    }
  }
  function setDate(date) {
    moment.locale("nl");
    return moment(date).format("L");
  }

  function flipCard() {
    if (!isFlipped) {
      setIsFlipped(true);
    } else {
      setIsFlipped(false);
    }
  }

  function toggleUpdateModal() {
    setShowUpdateModal(!showUpdateModal);
  }
  function toggleDeleteModal() {
    setShowDeleteModal(!showDeleteModal);
  }
  const { task } = props;
  let priorityIcon;
  let buttonText;
  if (task.task_priority === 1) {
    priorityIcon = <PriorityLow />;
  } else if (task.task_priority === 2) {
    priorityIcon = <PriorityMedium />;
  } else if (task.task_priority === 3) {
    priorityIcon = <PriorityHigh />;
  } else {
    priorityIcon = <PriorityCritical />;
  }
  if (task.task_claimant === null) {
    buttonText = <span>Claim Bounty</span>;
  } else {
    buttonText = <span>Bounty Afronden</span>;
  }
  return (
    <>
      <div className={styles.scene}>
        <div
          className={
            isFlipped ? [styles.card, styles.isflipped].join(" ") : styles.card
          }
        >
          <div className={styles.cardFace}>
            <div
              className={[
                classNameBorders(task.task_claimant),
                styles.borderTop,
              ].join(" ")}
            />
            <ul className={styles.content}>
              <li className={styles.top}>
                <span className={styles.title}>{task.task_title}</span>
                {priorityIcon}
              </li>
              <li className={styles.customer}>
                Voor{" "}
                <span style={{ fontFamily: "Open Sans Bold" }}>
                  {task.task_customer}
                </span>
              </li>
              <li className={styles.dates}>
                <span>
                  <Calender />
                  {setDate(task.task_post_date)}
                  {/* {swapDate(task.task_post_date)} */}
                </span>
                {task.task_deadline === 1 ? (
                  <span>
                    <Stopwatch />
                    {setDate(task.task_deadline_date)}
                    {/* {swapDate(} */}
                  </span>
                ) : null}
              </li>
              <li>
                <Pencil />
                {task.task_creator}
              </li>
              <li>
                {task.task_location.includes("https://") ? (
                  <a
                    href={task.task_location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Chain />
                    {task.task_location}
                  </a>
                ) : (
                  <a
                    href={"https://" + task.task_location}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Chain />
                    {task.task_location}
                  </a>
                )}
              </li>
              {task.task_description.split(" ").length > 15 ? (
                <li>
                  {task.task_description.split(" ", 16).join(" ")}...{" "}
                  <span
                    onClick={(e) => flipCard()}
                    style={{ fontFamily: "Open Sans Bold", cursor: "pointer" }}
                  >
                    Lees meer
                  </span>
                </li>
              ) : (
                <li>{task.task_description}</li>
              )}
              <li className={styles.edit}>
                {task.task_status !== "Archived" ? (
                  <span className={styles.bewerken} onClick={toggleUpdateModal}>
                    Bewerken
                  </span>
                ) : null}
                <span
                  className={styles.verwijderen}
                  onClick={toggleDeleteModal}
                >
                  Verwijderen
                </span>
              </li>
              <li className={styles.bottom}>
                <div className={styles.reward}>
                  {task.task_reward}
                  <span className={styles.xp}>xp</span>
                </div>
                {task.task_claimant ? (
                  <span>
                    {task.task_status !== "Archived" ? <span style={{ fontFamily: "Open Sans Bold" }}>
                      Geclaimd door
                    </span> : <span style={{ fontFamily: "Open Sans Bold" }}>
                     Afgerond door
                    </span>}
                    <br />
                    {task.task_claimant}
                    {task.task_status !== "Archived" ? 
                   null :  (<div>op <b>{setDate(task.task_finished)}</b></div>)}
                  </span>
                ) : null}
              </li>
            </ul>
            {(user_name === task.task_claimant ||
              task.task_claimant === null) &&
            user_name !== "Keytoe" &&
            task.task_status !== "Archived" ? (
              <div
                onClick={handleClick}
                className={[
                  classNameBorders(task.task_claimant),
                  styles.borderBottom,
                ].join(" ")}
              >
                {buttonText}{" "}
              </div>
            ) : (
              <div
                className={[
                  classNameBorders(task.task_claimant),
                  styles.borderBottom,
                  styles.borderBottomNull,
                ].join(" ")}
              ></div>
            )}
          </div>
          {task.task_description.split(" ").length > 15 ? (
            <div className={[styles.cardFace, styles.cardFaceBack].join(" ")}>
              <div
                className={[
                  classNameBorders(task.task_claimant),
                  styles.borderTop,
                ].join(" ")}
              />
              <div className={styles.content}>{task.task_description} </div>

              <div
                onClick={(e) => flipCard()}
                className={[
                  classNameBorders(task.task_claimant),
                  styles.borderBottom,
                ].join(" ")}
              >
                Terug
              </div>
            </div>
          ) : null}
        </div>
      </div>
      {task.task_status !== "Archived" ? (
        <CreateTaskProvider>
          <UpdateTaskModal
            show={showUpdateModal}
            onClose={toggleUpdateModal}
            values={task}
          />
        </CreateTaskProvider>
      ) : null}
      <DeleteTaskModal
        show={showDeleteModal}
        onClose={toggleDeleteModal}
        values={task}
      />
    </>
  );
}

export default Task;
