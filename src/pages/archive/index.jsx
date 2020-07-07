//Core
import React, { Component } from "react";
import { FilterProvider } from "helpers/filter-context";
//Components
import ArchiveList from "components/archive-list";
//Styles
import styles from "./styles.module.scss";

export class Archive extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <FilterProvider>
          <ArchiveList />
        </FilterProvider>
      </div>
    );
  }
}

export default Archive;
