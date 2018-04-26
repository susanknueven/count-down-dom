const getTeamNames = () => 
  fetch("http://localhost:3000/api/teamNames", { method: "GET" })
    .then(response => {
      const promise = response.json();
      return promise;
    });

const writeTeamNames = teamNames =>
  fetch("http://localhost:3000/api/teamNames", {
    method: "POST",
    body: JSON.stringify(teamNames)
  })
    .then(response => {
      const promise = response.json();
      return promise;
    })
    .then(myJson => {
      return myJson;
    })
    .catch(err => {
      console.log("error writing team names:", err);
    });
