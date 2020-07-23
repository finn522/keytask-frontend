//Core
import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "helpers/auth-context";
import { calculateLevel } from "helpers/calculate-level";
//Styles
import styles from "./styles.module.scss";
//Icons
import { KeytoeLogo } from "icons/keytoe-logo";

function Header(props) {
  // const [showHelpModal, setShowHelpModal] = useState(false);
  // const [showUserModal, setShowUserModal] = useState(false);
  const [levelInfo, setLevelInfo] = useState([]);
  const [{ user }] = useAuth();

  useEffect(() => {
    if (user) {
      setLevelInfo(calculateLevel(user.user_points));
    }
  }, [user]);

  // function toggleHelpModal() {
  //   setShowHelpModal(!showHelpModal);
  // }
  // function activateUserModal() {
  //   setShowUserModal(true);
  // }
  // function disableUserModal() {
  //   setShowUserModal(false);
  // }

  return (
    <>
      <div className={[styles.header, styles.wrapper].join(" ")}>
        <div className={[styles.content, styles.wrapper].join(" ")}>
          <Link to="/">
            <KeytoeLogo className={styles.logo} />
          </Link>
          {user ? (
            <>
              <div className={styles.linkset}>
                <NavLink
                  exact={true}
                  activeClassName={styles.activeLink}
                  to="/"
                >
                  Taken
                </NavLink>
                {/* <Link to="/Achievements">Achievements</Link> */}
                {/* <Link to="/Statistieken">Statistieken</Link>   */}
                <NavLink activeClassName={styles.activeLink} to="/Leaderboard">
                  Leaderboard
                </NavLink>
                <NavLink activeClassName={styles.activeLink} to="/Archief">
                  Archief
                </NavLink>
              </div>

              {user.user_name !== "Keytoe" ? (
                <div className={styles.user}>
                  <span style={{ marginRight: "30px" }}>
                    <b>{user.user_completed_tasks}</b> taken voltooid
                  </span>
                  <div className={styles.level}>{levelInfo[1]}</div>
                </div>
              ) : null}
            </>
          ) : null}
        </div>
        {user ? (
          user.user_name !== "Keytoe" ? (
            <div className={styles.progressBar}>
              {levelInfo[0] > 60 ? (
                <div
                  className={[styles.progressBarText, styles.barTextWhite].join(
                    " "
                  )}
                >
                  {user.user_points} / {levelInfo[2]} xp (
                  {Math.floor(levelInfo[0])}%)
                </div>
              ) : (
                <div
                  className={[styles.progressBarText, styles.barTextBlack].join(
                    " "
                  )}
                >
                  {user.user_points} / {levelInfo[2]} xp (
                  {Math.floor(levelInfo[0])}%)
                </div>
              )}

              <div
                style={{ width: levelInfo[0] + "%" }}
                className={styles.progress}
              ></div>
            </div>
          ) : null
        ) : null}
      </div>
    </>
  );
}

export default Header;
