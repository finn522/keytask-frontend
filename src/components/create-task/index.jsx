//Core
import React, { Component } from "react";
//Styles
import styles from "./styles.module.scss";
//Icons
import { Add } from "icons/add";

export class CreateTask extends Component {
  render() {
    return (
      <div className={styles.card} onClick={this.props.onClick}>
        <Add />
        <span>
          Nieuwe taak <br /> aanmaken
        </span>
      </div>
    );
  }
}
export default CreateTask;
