export const fetchUsersRankedPoints = async () => {
    return fetch("https://keytask.keytoe.nl/keytask_backend/users-ranked-points")
    .then(function(result){
      if(!result.ok){
       alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
      }
      return result.json();
      })
      .then((user) => {
        return user;
      })
  };

  export const fetchUsersRankedTasks = async () => {
    return fetch("https://keytask.keytoe.nl/keytask_backend/users-ranked-tasks")
    .then(function(result){
      if(!result.ok){
       alert("Er is iets fout gegaan. Zie de console log voor meer info.\nHTTP status " + result.status);
      }
      return result.json();
      })
      .then((user) => {
        return user;
      })
  };