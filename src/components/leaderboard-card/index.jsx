//Core
import React from "react";
//Styles
import styles from "./styles.module.scss";

function LeaderboardCard(props) {
  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardLeft}>
          <span className={styles.name}>{props.user.user_name}</span>
          <span className={styles.tasks}>
            {props.user.user_completed_tasks} <span className={styles.tasksCompleted}>{props.user.user_completed_tasks === 1 ? ("voltooide taak") : ("voltooide taken")}</span>
          </span>
        </div>
        <span className={styles.points}>{props.user.user_points}<span className={styles.xp}>XP</span></span>
      </div>
    </div>
  );
}

export default LeaderboardCard;
