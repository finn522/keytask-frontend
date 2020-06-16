import React from "react";
import {fetchTasks} from "actions/home";

const TaskContext = React.createContext();

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useTask() {
  const context = React.useContext(TaskContext);
  if (!context) throw new Error("useTask must be used in TaskProvider");

  return context;
}

function TaskProvider(props) {
  const [state, setState] = React.useReducer(reducer, {
    tasks: [],
    filteredTasks: []
  });

  const value = React.useMemo(() => [state, setState], [state]);

  return <TaskContext.Provider value={value} {...props} />;
}

function SaveTasks(setState){
 fetchTasks().then((response) => {
    setState({
      tasks: response,
      filteredTasks: response
    });
  })
}

function SaveFilteredTasks(tasks, setState){
  setState({
    filteredTasks: tasks
  })
}

export { TaskProvider, useTask, SaveTasks, SaveFilteredTasks };
