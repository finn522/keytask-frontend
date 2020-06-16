//Core
import React, { Component } from 'react'
//Components
import LeaderboardList from 'components/leaderboard-list'
//Styles
import styles from "./styles.module.scss";

export class Leaderboard extends Component {
    render() {
        return (
            <div className={styles.wrapper}>
                <LeaderboardList/>
            </div>
        )
    }
}

export default Leaderboard
