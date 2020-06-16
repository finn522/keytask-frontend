async function getUser(user) {
  let response = await fetch("http://192.168.178.45:3001/users")
  let users = await response.json();

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      for (var i in users){
        if (user === users[i].user_name){
          return resolve(users[i]);
        } 
      }
      return reject("Deze gebruiker bestaat niet.");
    }, 0)
  );
}

export default getUser;
