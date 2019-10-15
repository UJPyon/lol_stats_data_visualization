const https = require('https');
const http = require('http');
const PORT = 8080;
const server = http.createServer((request, response) => {callAPI(response);});
const apiKey = "enter api key here";
// ENTER LOL MATCH TO FETCH DATA FROM BELOW:
const matchId = "enter match ID here";
const url = `https://na1.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}?api_key=` + apiKey;

server.listen(PORT, () => console.log("Server is listening on port %s", PORT));

function callAPI(response) {
  https.get(url, resp => {
    let data = "";

    resp.on("data", dataChunk => {
      data += dataChunk;
      // data = Object.values(data)[0].map(frame => {
      //   const events = Object.values(frame)[1];
      //   const champion_data = events.filter(
      //     event => Object.values(event)[0] === "CHAMPION_KILL"
      //   );

        // return champion_data;
      // });
    });

    resp.on("end", () => {
      response.end(data);
    });
  })
  .on("error", err => {
    console.log("Error: " + err.message);
  });


}

