//Core
import React from "react";
//Styles
import styles from "./styles.module.scss";
//Icons
import { FirstPlace } from "icons/first-place";
import { SecondPlace } from "icons/second-place";

function LeaderboardCardTop(props) {
  function backgroundPointHolder(index) {
    let result = [];
    result.push("background");
    result.push(styles["background"]);
    if (index === 0) {
      result.push(styles[`background--first-place`]);
    } else {
      result.push(styles[`background--second-place`]);
    }
    return result.join(" ");
  }
  return (
    <div className={styles.card}>
      <div className={styles.top}>
      <div className={styles.nameHolder}>
        <span className={styles.name}>{props.user.user_name}</span>
        <span className={styles.tasks}>{props.user.user_completed_tasks} <span className={styles.tasksCompleted}>{props.user.user_completed_tasks === 1 ? ("voltooide taak") : ("voltooide taken")}</span></span>
      </div>
      {props.index === 0 ? <FirstPlace /> : <SecondPlace />}
      </div>
      <div
        className={[
          backgroundPointHolder(props.index),
          styles.pointHolder,
        ].join(" ")}
      >
        <span>
          {props.user.user_points}
          <span className={styles.xp}>XP</span>
        </span>
      </div>
    </div>
  );
}

export default LeaderboardCardTop;
