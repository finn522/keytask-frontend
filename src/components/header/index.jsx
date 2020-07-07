//Core
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "helpers/auth-context";
//Components
import HelpModal from "components/help-modal";
import UserModal from "components/user-modal";
//Styles
import styles from "./styles.module.scss";
//Icons
import { KeytoeLogo } from "icons/keytoe-logo";
import { User } from "icons/user";
import { QuestionMark } from "icons/question-mark";

function Header(props) {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [{ user }] = useAuth();

  function toggleHelpModal() {
    setShowHelpModal(!showHelpModal);
  }
  function activateUserModal() {
    setShowUserModal(true);
  }
  function disableUserModal() {
    setShowUserModal(false);
  }

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
                <NavLink exact={true} activeClassName={styles.activeLink} to="/">Taken</NavLink>
                {/* <Link to="/Achievements">Achievements</Link> */}
                {/* <Link to="/Statistieken">Statistieken</Link>   */}
                <NavLink activeClassName={styles.activeLink} to="/Leaderboard">Leaderboard</NavLink>
                <NavLink activeClassName={styles.activeLink} to="/Archief">Archief</NavLink>
              </div>

              <div className={styles.user}>
                <QuestionMark
                  onClick={toggleHelpModal}
                  className={styles.questionmark}
                />
                <User onMouseOver={activateUserModal} onMouseLeave={disableUserModal} className={styles.account} />
              </div>
            </>
          ) : null}
        </div>
        <HelpModal show={showHelpModal} onClose={toggleHelpModal} />
      <UserModal show={showUserModal} />
      </div>
    </>
  );
}

export default Header;
