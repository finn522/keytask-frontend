//Core
import React, { useState, useEffect } from "react";
import { useTask, SaveTasks } from "helpers/task-context";
import { SaveCreateTasks, useCreateTask, ResetCreateTask } from "helpers/create-task-context";
import { postTask } from "actions/home";
import { validateForm } from "helpers/validate-form";
//Components
import Calendar from "react-calendar";
//Styles
import styles from "./styles.module.scss";
//Icons
import { Cross } from "icons/cross";

function CreateTaskModal(props) {
  const [{}, setSaveTasks] = useTask();
  const [errors, setErrors] = useState({});
  const [autoReward, setAutoReward] = useState(0);
  const [showCalender, setShowCalender] = useState(false);
  const [
    {
      title,
      customer,
      priority,
      deadline,
      deadline_date,
      creator,
      location,
      description,
      custom_reward,
      reward,
    },
    setCreateTask,
  ] = useCreateTask();
  let data = {
    title: title,
    customer: customer,
    priority: priority,
    deadline: deadline,
    deadline_date: deadline_date,
    creator: creator,
    location: location,
    description: description,
    custom_reward: custom_reward,
    reward: reward,
  };
  useEffect(() => {
    calculatePoints(deadline_date);
  }, [priority, deadline_date, deadline]);
  useEffect(() => {
    if (custom_reward === false) {
      calculatePoints(deadline_date)
    }
  }, [custom_reward]);

  function calculatePoints(value) {
    let modifier = 0;
    switch (priority) {
      case "1":
        modifier = 0.5;
        break;
      case "2":
        modifier = 1;
        break;
      case "3":
        modifier = 2;
        break;
      case "4":
        modifier = 3;
        break;
      default:
        modifier = 0;
        break;
    }
    if (deadline === true) {
      let deadlineModifier = 3;
      let currentDate = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      let deadlineDateParts = value.split("-");
      let deadlineDateObject = new Date(
        +deadlineDateParts[2],
        deadlineDateParts[1] - 1,
        +deadlineDateParts[0]
      );

      let Difference_In_Time =
        deadlineDateObject.getTime() - currentDate.getTime();
      let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      for (let i = Difference_In_Days; i > 0; i--) {
        if (deadlineModifier > 0.1) {
          deadlineModifier = deadlineModifier - 0.1;
        }
      }
      modifier += deadlineModifier;
    }
    setAutoReward(Math.ceil(1000 * modifier));
    if (custom_reward === false) {
      SaveCreateTasks("reward", autoReward, setCreateTask);
    }
  }
  function toggleCalender() {
    setShowCalender(!showCalender);
  }
  function onChangeTrueFalse(e) {
    let inputName = e.currentTarget.name;
    if (e.currentTarget.value === "true") {
      SaveCreateTasks(inputName, true, setCreateTask);
    } else {
      SaveCreateTasks(inputName, false, setCreateTask);
    }
  }
  function onChange(e) {
    let inputName = e.currentTarget.name;
    let value = e.currentTarget.value;
    SaveCreateTasks(inputName, value, setCreateTask);
  }
  function onChangeDeadline(date) {
    date = date.toLocaleDateString("en-GB").replace(/\//g, "-");
    SaveCreateTasks("deadline_date", date, setCreateTask);
  }

  function onSubmit(e) {
    e.preventDefault();
    if (validateForm(data).formIsValid === true) {
      postTask(data).then(closeModal).then(() => SaveTasks(setSaveTasks));
      ResetCreateTask(setCreateTask)
    } else {
      setErrors(validateForm(data).errors);
    }
  }
  function closeModal(e) {
    setErrors({});
    ResetCreateTask(setCreateTask)
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
          <span className={styles.title}>Nieuwe taak aanmaken</span>
          <span onClick={closeModal} className={styles.crossSpan}>
            <Cross className={styles.cross} />
          </span>
          <form>
            {/* Titel */}
            <input
              onChange={onChange}
              type="text"
              placeholder="Titel"
              name="title"
              required
              autoComplete="off"
            />
            <span className={styles.errorMsg}>{errors.title}</span>
            {/* Klant */}
            <input
              onChange={onChange}
              type="text"
              placeholder="Klant"
              name="customer"
              required
              autoComplete="off"
            />
            <span className={styles.errorMsg}>{errors.customer}</span>
            {/* Locatie */}
            <input
              onChange={onChange}
              type="text"
              placeholder="URL"
              name="location"
              required
              autoComplete="off"
            />
            <span className={styles.errorMsg}>{errors.location}</span>
            {/* Prioriteit */}
            <span className={styles.subtitle}>Prioriteit</span>
            <div className={styles.labelList}>
              <div style={{ marginRight: "44px" }}>
                <label className={styles.container}>
                  Laag
                  <input
                    onChange={onChange}
                    type="radio"
                    name="priority"
                    value="1"
                    defaultChecked={priority === 1}
                  />
                  <span className={styles.checkmark}></span>
                </label>
                <label className={styles.container}>
                  Gemiddeld
                  <input
                    onChange={onChange}
                    type="radio"
                    name="priority"
                    value="2"
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
              <div>
                <label className={styles.container}>
                  Hoog
                  <input
                    onChange={onChange}
                    type="radio"
                    name="priority"
                    value="3"
                  />
                  <span className={styles.checkmark}></span>
                </label>
                <label className={styles.container}>
                  Kritiek
                  <input
                    onChange={onChange}
                    type="radio"
                    name="priority"
                    value="4"
                  />
                  <span className={styles.checkmark}></span>
                </label>
              </div>
            </div>
            {/* Deadline */}
            <span className={styles.subtitle}>Deadline</span>
            <div className={styles.labelList}>
              <label
                className={styles.container}
                style={{ marginRight: "40px" }}
              >
                Ja
                <input
                  onChange={onChangeTrueFalse}
                  type="radio"
                  name="deadline"
                  value="true"
                  defaultChecked={deadline === true}
                />
                <span className={styles.checkmark}></span>
              </label>
              <label className={styles.container}>
                Nee
                <input
                  onChange={onChangeTrueFalse}
                  type="radio"
                  name="deadline"
                  value="false"
                />
                <span className={styles.checkmark}></span>
              </label>
            </div>
            {/* Deadline datum */}
            {deadline === true ? (
              <>
                <input
                  onClick={toggleCalender}
                  onChange={onChange}
                  type="text"
                  placeholder="(dd-mm-yyyy)"
                  name="deadline_date"
                  autoComplete="off"
                  value={deadline_date}
                />
                {showCalender ? (
                  <>
                    <div className={styles.background} />
                    <Calendar
                      className={styles.calender}
                      locale="nl-NL"
                      minDate={new Date()}
                      onChange={function (e) {
                        onChangeDeadline(e);
                        toggleCalender();
                      }}
                      value={deadline.date}
                    />
                  </>
                ) : null}
              </>
            ) : null}
            {/* Opmerkingen */}
            <div className={styles.descriptionWrapper}>
              <textarea
                className={styles.description}
                onChange={onChange}
                type="textarea"
                placeholder="Opmerkingen"
                name="description"
              />
              <div className={styles.errorMsg}>{errors.description}</div>
            </div>
            {/* Beloning */}
            <span className={styles.subtitle}>Beloning</span>
            <div className={styles.labelList}>
              <label
                className={styles.container}
                style={{ marginRight: "40px" }}
              >
                Handmatig
                <input
                  onChange={onChangeTrueFalse}
                  type="radio"
                  name="custom_reward"
                  value="true"
                  defaultChecked={custom_reward === true}
                />
                <span className={styles.checkmark}></span>
              </label>
              <label className={styles.container}>
                Automatisch
                <input
                  onChange={onChangeTrueFalse}
                  type="radio"
                  name="custom_reward"
                  value="false"
                />
                <span className={styles.checkmark}></span>
              </label>
            </div>
            {/* Beloning invullen */}
            {custom_reward === true ? (
              <>
              <input
                onChange={onChange}
                type="text"
                placeholder="Beloning"
                name="reward"
                autoComplete="off"
              />
              <span className={styles.errorMsg}>{errors.reward}</span>
              </>
            ) : (
              <div className={styles.autoReward}>{autoReward}<span className={styles.xp}>xp</span></div>
            )}         
            {/* Naam aanmaker */}
            <input
              onChange={onChange}
              type="text"
              placeholder="Naam aanmaker"
              name="creator"
              required
              autoComplete="off"
            />
            <span className={styles.errorMsg}>{errors.creator}</span>
            <button
              className={styles.createButton}
              onClick={onSubmit}
              type="submit"
            >
              Publiceer taak
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTaskModal;
