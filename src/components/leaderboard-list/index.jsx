//Core
import React, { useState, useEffect } from "react";
import { fetchUsersRankedPoints } from "actions/leaderboard";
//Components
import LeaderboardCard from "components/leaderboard-card";
import LeaderboardCardTop from "components/leaderboard-card-top";
//Styles
import styles from "./styles.module.scss";

function LeaderboardList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersRankedPoints().then((user) => setUsers(user));
  }, []);

  return (
    <div className={styles.list}>
      <div className={styles.top}>
        {!users
          ? null
          : users.map((user, i) =>
              i > 1 ? null : <LeaderboardCardTop key={i} user={user} index={i} />
            )}
      </div>
      <div className={styles.bottom}>
        {!users
          ? null
          : users.map((user, i) =>
              i < 2 ? null : <LeaderboardCard key={i} user={user} index={i} />
            )}
      </div>
    </div>
  );
}

export default LeaderboardList;
