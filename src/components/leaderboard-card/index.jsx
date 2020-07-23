//Core
import React, { useEffect, useState } from "react";
import { calculateLevel } from "helpers/calculate-level";
//Styles
import styles from "./styles.module.scss";

function LeaderboardCard(props) {
  const [levelInfo, setLevelInfo] = useState([]);

  useEffect(() => {
    if (props.user) {
      setLevelInfo(calculateLevel(props.user.user_points));
    }
  }, [props.user]);

  return (
    <div className={styles.card}>
      <div className={styles.cardContent}>
        <div className={styles.cardLeft}>
          <div className={styles.cardLeftTop}>
            <div className={styles.level}>{levelInfo[1]}</div>
            <span className={styles.name}>{props.user.user_name}</span>
          </div>
          <span className={styles.tasks}>
            {props.user.user_completed_tasks}{" "}
            <span className={styles.tasksCompleted}>
              {props.user.user_completed_tasks === 1
                ? "voltooide taak"
                : "voltooide taken"}
            </span>
          </span>
        </div>
        <span className={styles.points}>
          {props.user.user_points}
          <span className={styles.xp}>XP</span>
        </span>
      </div>
      <div className={styles.progressBar}>
        {levelInfo[0] > 60 ? (
          <div
            className={[styles.progressBarText, styles.barTextWhite].join(" ")}
          >
            {props.user.user_points} / {levelInfo[2]} xp (
            {Math.floor(levelInfo[0])}%)
          </div>
        ) : (
          <div
            className={[styles.progressBarText, styles.barTextBlack].join(" ")}
          >
            {props.user.user_points} / {levelInfo[2]} xp (
            {Math.floor(levelInfo[0])}%)
          </div>
        )}

        <div
          style={{ width: levelInfo[0] + "%" }}
          className={styles.progress}
        ></div>
      </div>
    </div>
  );
}

export default LeaderboardCard;
