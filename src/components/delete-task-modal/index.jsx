//Core
import React from "react";
import { deleteTask } from "actions/home";
import { useTask, SaveTasks } from "helpers/task-context";
//Components

//Styles
import styles from "./styles.module.scss";

function DeleteTaskModal(props) {
  const [{}, setSaveTasks] = useTask();

  function deleteTaskConfirm() {
    deleteTask(props.values.task_id)
      .then(closeModal())
      .then(() => SaveTasks(setSaveTasks));
  }
  function closeModal() {
    props.onClose();
  }
  if (!props.show) {
    return null;
  }
  return (
    <>
      <div className={styles.background} />
      <div className={styles.card}>
        <div className={styles.content}>
          <span className={styles.title}>Weet je het zeker?</span>
          <br />
          <br />
          <div>
            Deze taak wordt voor eeuwig verwijderd. Dat is behoorlijk lang.
          </div>
          <div
            className={[styles.button, styles.accept].join(" ")}
            onClick={deleteTaskConfirm}
          >
            Ja
          </div>
          <div className={[styles.button, styles.decline].join(" ")} onClick={closeModal}>
            Nee
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteTaskModal;
