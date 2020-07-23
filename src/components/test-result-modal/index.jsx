//Core
import React from "react";
//Styles
import styles from "./styles.module.scss";

function TestResultModal(props) {
  function formatResults() {
    let TestResultsJSONified = JSON.parse(props.values);
    let formattedTestResults = "";
    for (let i = 0; i < TestResultsJSONified.length; i++) {
      formattedTestResults +=
        "<li>" +
        TestResultsJSONified[i].testName +
        ": " +
        TestResultsJSONified[i].testStatus +
        "</li>";
    }
    return { __html: formattedTestResults };
  }
  function closeModal() {
    props.onClose();
  }
  if (!props.show) {
    return null;
  }
  return (
    <>
      <div className={styles.background} />
      <div className={styles.card}>

        <div className={styles.content}>
        <div className={styles.title}>Test Resultaten</div>
          <ul dangerouslySetInnerHTML={formatResults()}></ul>
        </div>
        <div
          className={styles.button}
          onClick={closeModal}
        >
          Okay
        </div>
      </div>
    </>
  );
}

export default TestResultModal;
