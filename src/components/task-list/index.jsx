//Core
import React, { useState, useEffect } from "react";
import { useFilter, changeInput } from "helpers/filter-context";
import { useAuth } from "helpers/auth-context";
import { useTask, SaveTasks, SaveFilteredTasks } from "helpers/task-context";
import { CreateTaskProvider } from "helpers/create-task-context";
//Components
import Task from "components/task";
import CreateTask from "components/create-task";
import CreateTaskModal from "components/create-task-modal";
import Dropdown from "react-dropdown";
//Styles
import styles from "./styles.module.scss";
//Icons
import { Sort } from "icons/sort";
import {PriorityLow} from "icons/priority-low"
import { PriorityHigh } from "icons/priority-high"

function TaskList(props) {
  var arraySort = require("array-sort");
  const [{ tasks, filteredTasks }, setTasks] = useTask();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [{ myTask, claimedTask, openTask }, setFilter] = useFilter();
  const [{ user }] = useAuth();
  const [selected, setSelected] = useState(null);
  const [sortDirection, setSortDirection] = useState(true);

  const options = [
    { value: "task_title", label: "Naam", className: styles.dropdownoption },
    {
      value: "task_customer",
      label: "Klant",
      className: styles.dropdownoption,
    },
    {
      value: "task_reward",
      label: "Beloning",
      className: styles.dropdownoption,
    },
    {
      value: "task_priority",
      label: "Prioriteit",
      className: styles.dropdownoption,
    },
    {
      value: "task_post_date",
      label: "Aanmaak datum",
      className: styles.dropdownoption,
    },
    {
      value: "task_deadline_date",
      label: "Deadline datum",
      className: styles.dropdownoption,
    },
  ];
  const defaultOption = "SORTEER OP";
  function _onSelect(option) {
    setSelected(option);
  }
  function toggleModal() {
    setShowCreateModal(!showCreateModal);
  }
  function filter(tasks) {
    if (myTask && tasks.task_claimant === user.user_name) {
      return tasks.task_claimant === user.user_name;
    }
    if (
      claimedTask &&
      tasks.task_claimant !== user.user_name &&
      tasks.task_claimant !== null
    ) {
      return (
        tasks.task_claimant !== user.user_name && tasks.task_claimant !== null
      );
    }
    if (openTask && tasks.task_claimant === null) {
      return tasks.task_claimant === null;
    }
  }

  useEffect(() => {
    SaveTasks(setTasks);
  }, []);

  useEffect(() => {
    SaveFilteredTasks(tasks.filter(filter), setTasks);
  }, [myTask, claimedTask, openTask]);

  useEffect(() => {
    applySortBy(selected);
  }, [sortDirection]);

  function onChange(e) {
    let inputName = e.currentTarget.name;
    let value;
    if (inputName === "myTask") {
      value = !myTask;
    } else if (inputName === "claimedTask") {
      value = !claimedTask;
    } else {
      value = !openTask;
    }
    changeInput(inputName, setFilter, value);
  }
  function flipSortBy(e) {
    setSortDirection(!sortDirection);
  }
  function applySortBy(e) {
    if (!e) {
      return;
    }
    let value = e.value;
    if (sortDirection) {
      const sorted = arraySort(filteredTasks, value);
      SaveFilteredTasks(sorted, setTasks);
    } else {
      const sorted = arraySort(filteredTasks, value, { reverse: true });
      SaveFilteredTasks(sorted, setTasks);
    }
  }
  function scrollToBottom(e){
    window.scrollTo({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
  function scrollToTop(e){
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  return (
    <>
    <div className={[styles.scrollToButton, styles.scrollToTop].join(" ")} onClick={scrollToTop}><PriorityHigh /></div>
    <div className={[styles.scrollToButton, styles.scrollToBottom].join(" ")} onClick={scrollToBottom}><PriorityLow /></div>
      <div className={styles.filterAndSort}>
        <div className={styles.filterList}>
          <label className={styles.container}>
            Mijn taken
            <input
              name="myTask"
              onChange={onChange}
              type="checkbox"
              checked={myTask}
            />
            <span
              className={[styles.checkmark, styles.myTask].join(" ")}
            ></span>
          </label>

          <label className={styles.container}>
            Geclaimde taken
            <input
              name="claimedTask"
              onChange={onChange}
              type="checkbox"
              checked={claimedTask}
            />
            <span
              className={[styles.checkmark, styles.claimedTask].join(" ")}
            ></span>
          </label>

          <label className={styles.container}>
            Open taken
            <input
              name="openTask"
              onChange={onChange}
              type="checkbox"
              checked={openTask}
            />
            <span
              className={[styles.checkmark, styles.openTask].join(" ")}
            ></span>
          </label>

          {/* <label className={styles.container}>Four
                        <input type="checkbox"/>
                        <span className={styles.checkmark}></span>
                    </label> */}
        </div>
        <div>
          <Dropdown
            // arrowClosed={<div className={styles.arrowdropdown} />}
            // arrowOpen={<div className={styles.arrowdropdownIsOpen} />}
            className={styles.dropdown}
            controlClassName={styles.controldropdown}
            menuClassName={styles.menudropdown}
            options={options}
            onChange={(e) => {
              _onSelect(e);
              applySortBy(e);
            }}
            value={selected ? selected.label : defaultOption}
            placeholder=""
          />
          {sortDirection ? (
            <Sort
              style={{ cursor: "pointer" }}
              onClick={flipSortBy.bind(this)}
            />
          ) : (
            <Sort
              style={{ transform: "rotate(180deg)", cursor: "pointer" }}
              onClick={flipSortBy.bind(this)}
            />
          )}
        </div>
      </div>
      <div className={styles.list}>
        {!filteredTasks
          ? null
          : filteredTasks.map((task, i) => <Task key={i} task={task} />)}
        <CreateTask onClick={toggleModal.bind(this)} />
      </div>
      <CreateTaskProvider>
        <CreateTaskModal show={showCreateModal} onClose={toggleModal} />
      </CreateTaskProvider>
    </>
  );
}

export default TaskList;
