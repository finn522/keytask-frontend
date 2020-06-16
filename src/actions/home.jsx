export const fetchTasks = async () => {
  return fetch("http://192.168.178.45:3001/tasks")
      .then(function(result){
      if(!result.ok){
       alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
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

export const fetchTasksFilters = async ( user, myTask, claimedTask, openTask ) => {
  return fetch("http://192.168.178.45:3001/tasks" , {
    method: "POST",
    headers: {
    'Content-type': 'application/json'
    },
    body: JSON.stringify({ user: user, myTask: myTask, claimedTask: claimedTask, openTask: openTask })
  })
  .then(function(result){
    if(!result.ok){
     alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
    }
    return result.json();
    })
  .then((task) => {
    return task;
  })
  .catch((e) => {
    console.log(e);
  });
}

export const deleteTask = async (task_id) => {
  return fetch('http://192.168.178.45:3001/delete-task' , {
    method: "DELETE",
    headers: {
    'Content-type': 'application/json'
    },
    body: JSON.stringify({id: task_id})
})
.then(function(result){
  if(!result.ok){
   alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
  }
  return result.json();
  })
.then((info) => { console.log(info); })
};

export const claimTask = (task_id, user_id) => {
  return fetch("http://192.168.178.45:3001/tasks/"+ task_id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({task_id: task_id, user_id: user_id})
  })
  .then(function(result){
    if(!result.ok){
     alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
    }
    return result.json();
    })
    .then((info) => {
      console.log(info);
    });
  }

  export const finishTask = (task_id, user_id) => {
    return fetch("http://192.168.178.45:3001/users/"+ user_id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({task_id: task_id, user_id: user_id})
    })
    .then(function(result){
      if(!result.ok){
       alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
      }
      return result.json();
      })
    .then(deleteTask(task_id))
    .then((info) => {
      console.log(info);
    })
  }

  export const postTask = (data) => {
    return fetch("http://192.168.178.45:3001/insert-task", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function(result){
        if(!result.ok){
         alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
        }
        return result.json();
        })
      .then((info) => {
        console.log(info);
    })
  }

  export const updateTask = (data) => {
    return fetch("http://192.168.178.45:3001/update-task/"+ data.id, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(function(result){
      if(!result.ok){
       alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
      }
      return result.json();
      })
      .then((info) => {
        console.log(info);
    })
  }