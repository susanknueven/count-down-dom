const getScores = () =>
  fetch("http://localhost:3000/api/scores", { method: "GET" })
    .then(response => {
      const promise = response.json();
      return promise;
    });

const updateTeamScore = score =>
  fetch("http://localhost:3000/api/scores", {
    method: "PUT",
    body: JSON.stringify(score)
  })
    .then(response => {
      const promise = response.json();
      return promise;
    })
    .then(myJson => {
      return myJson;
    })
    .catch(err => {
      console.log("error updating team score:", err);
    });
const callit = async () => {
  const json = await updateTeamScore({ qIndex: 0, teamIndex: 0, points: 1 })
  console.log(json)
};

const writeScores = scores =>
  fetch("http://localhost:3000/api/scores", {
    method: "POST",
    body: JSON.stringify(scores)
  })
    .then(response => {
      const promise = response.json();
      return promise;
    })
    .then(myJson => {
      return myJson;
    })
    .catch(err => {
      console.log("error writing team scores:", err);
    });