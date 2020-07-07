import React from "react";

const CreateTaskContext = React.createContext();

function reducer(currentState, newState) {
  return { ...currentState, ...newState };
}

function useCreateTask() {
  const context = React.useContext(CreateTaskContext);
  if (!context) throw new Error("useTask must be used in CreateTaskContext");

  return context;
}

function CreateTaskProvider(props) {
  const [state, setState] = React.useReducer(reducer, {
      title: "",
      customer: "",
      priority: "1",
      deadline: true,
      deadline_date: (new Date()).toLocaleDateString('en-GB').replace(/\//g,'-'),
      creator: "",
      location: "",
      description: "",
      custom_reward: true,
      reward: "",
  });

  const value = React.useMemo(() => [state, setState], [state]);

  return <CreateTaskContext.Provider value={value} {...props} />;
}
function ResetCreateTask(setState){
  setState({
    title: "",
    customer: "",
    priority: "1",
    deadline: true,
    deadline_date: (new Date()).toLocaleDateString('en-GB').replace(/\//g,'-'),
    creator: "",
    location: "",
    description: "",
    custom_reward: true,
    reward: "",
  })
}
function SaveCreateTasks(input, value, setState){
    setState({
        [input]: value
    });
}

function SaveUpdateTasks(values, setState){
  setState({
    title: values.task_title,
    customer: values.task_customer,
    priority: values.task_priority,
    deadline: values.task_deadline,
    deadline_date: new Date(values.task_deadline_date).toLocaleDateString('en-GB').replace(/\//g,'-'),
    creator: values.task_creator,
    location: values.task_location,
    description: values.task_description,
    custom_reward: values.task_custom_reward,
    reward: values.task_reward,
  });
}

export { CreateTaskProvider, useCreateTask, SaveCreateTasks, SaveUpdateTasks, ResetCreateTask };
