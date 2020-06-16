//Core
import React, { Component } from "react";
import { FilterProvider } from "helpers/filter-context";
//Components
import TaskList from "components/task-list";
//Styles
import styles from "./styles.module.scss";

export class Home extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <FilterProvider>
          <TaskList />
        </FilterProvider>
      </div>
    );
  }
}

export default Home;
