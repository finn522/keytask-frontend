export const fetchTasks = async () => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks`)
    .then(function (result) {
      if (!result.ok) {
        alert(
          "Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " +
            result.status
        );
      }
      return result.json();
    })
    .then((task) => {
      return task;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const fetchTasksFilters = async (
  user,
  myTask,
  claimedTask,
  openTask
) => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      user: user,
      myTask: myTask,
      claimedTask: claimedTask,
      openTask: openTask,
    }),
  })
    .then(function (result) {
      if (!result.ok) {
        alert(
          "Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " +
            result.status
        );
      }
      return result.json();
    })
    .then((task) => {
      return task;
    })
    .catch((e) => {
      console.log(e);
    });
};

export const deleteTask = async (task_id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/delete-task`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id: task_id }),
  })
    .then(function (result) {
      if (!result.ok) {
        alert(
          "Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " +
            result.status
        );
      }
      return result.json();
    })
    .then((info) => {
      console.log(info);
    });
};

export const claimTask = (task_id, user_id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/tasks/` + task_id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ task_id: task_id, user_id: user_id }),
  })
    .then(function (result) {
      if (!result.ok) {
        alert(
          "Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " +
            result.status
        );
      }
      return result.json();
    })
    .then((info) => {
      console.log(info);
    });
};

export const finishTask = (task_id, user_id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/users/` + user_id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ task_id: task_id, user_id: user_id }),
  })
    .then(function (result) {
      if (!result.ok) {
        alert(
          "Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " +
            result.status
        );
      }
      return result.json();
    })
    .then(changeStatusTask(task_id))
    .then((info) => {
      console.log(info);
    });
};

export const postTask = (data) => {
  return fetch(`${process.env.REACT_APP_API_URL}/insert-task`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (result) {
      if (!result.ok) {
        alert(
          "Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " +
            result.status
        );
      }
      return result.json();
    })
    .then((info) => {
      console.log(info);
    });
};

export const updateTask = (data) => {
  return fetch(`${process.env.REACT_APP_API_URL}/update-task/` + data.id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(function (result) {
      if (!result.ok) {
        alert(
          "Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " +
            result.status
        );
      }
      return result.json();
    })
    .then((info) => {
      console.log(info);
    });
};

export const changeStatusTask = async (task_id) => {
  return fetch(`${process.env.REACT_APP_API_URL}/status-task/` + task_id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ id: task_id }),
  })
    .then(function (result) {
      if (!result.ok) {
        alert(
          "Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " +
            result.status
        );
      }
      return result.json();
    })
    .then((info) => {
      console.log(info);
    });
};
