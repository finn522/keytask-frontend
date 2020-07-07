async function getUser(user) {
  let response = await fetch(`${process.env.REACT_APP_API_URL}/users`);
  let users = await response.json();

  return new Promise((resolve, reject) => {
    for (var i in users) {
      if (user === users[i].user_name) {
        return resolve(users[i]);
      }
    }
    return reject("Deze gebruiker bestaat niet.");
  });
}

export default getUser;
