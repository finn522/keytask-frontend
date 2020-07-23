export const fetchTasksTitles = async () => {
    return fetch(`${process.env.REACT_APP_API_URL}/tasks-title`)
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