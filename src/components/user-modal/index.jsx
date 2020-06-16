//Core
import React from "react";
import { useAuth } from "helpers/auth-context";
//Components
//Styles
import styles from "./styles.module.scss";

function UserModal(props) {
  const [{ user }] = useAuth();

  if (!props.show) {
    return null;
  }
  return (
    <div className={styles.card}>
      <ul>
        <li>Je bent ingelogd als:</li>
         <li><b>{user.user_name}</b></li>
        {user.user_name === "Keytoe" ? null : (
          <>
            <li><b>{user.user_points}</b> xp</li>
            <li><b>{user.user_completed_tasks}</b> voltooide taken</li>
          </>
        )}
      </ul>
    </div>
  );
}

export default UserModal;
