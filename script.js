

import { getUserIDs, getListenEvents, getSong } from "./data.js";
import{addAnswerRow, getEverydaySongs, getLongestStreakSong, getMostListenedFridaySong, getMostListenedSong, getTopGenres, getTopItem} from "./calculation.js"

window.onload = function () {
  populateUserDropdown()
  
};

function populateUserDropdown() {
  const userSelect = document.getElementById("user-select");
  const users = getUserIDs();

  // default
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "--Select a user--";
  userSelect.appendChild(defaultOption);

  // Populate dropdown with user options
  users.forEach((userId) => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });
}

function handleUserSelection(event) {
  const selectedUserId = event.target.value; 
  const answerDiv = document.getElementById("answers");

  // Clear
  answerDiv.innerHTML = "";

  if (selectedUserId) {
   displayAnswers(selectedUserId);
  }
  else {
    document.getElementById('answers').innerHTML = 'Please select a user.';
  }
}

const userSelect = document.getElementById("user-select");
  userSelect.addEventListener("change", handleUserSelection);


  function displayAnswers(userId){
    const answerDiv = document.getElementById("answers");
    const listenEvents = getListenEvents(userId);

    if (!listenEvents || listenEvents.length === 0) {
      answerDiv.textContent = "This user didn't listen to any songs.";
      return;
    }
    // getMostListenedSong(events, time, artist);
    const mostListenedSongCount = getMostListenedSong(listenEvents, false, false);
    const mostListenedSongTime = getMostListenedSong(listenEvents, true, false);
    const mostListenedArtistCount = getMostListenedSong(listenEvents, false, true);
    const mostListenedArtistTime = getMostListenedSong(listenEvents, true, true);
    const fridayNightSongCount = getMostListenedFridaySong(listenEvents, false);
    const fridayNightSongTime = getMostListenedFridaySong(listenEvents, true);
    const longestStreakSong = getLongestStreakSong(listenEvents);
    const dailySongs = getEverydaySongs(listenEvents);
    const topGenres = getTopGenres(listenEvents);


    let answerHtml = `<table border="1">
      <thead>
        <tr>
          <th>Question</th>
          <th>Answer</th>
          </tr>
      </thead>
      <tbody>`;

    
    answerHtml += addAnswerRow("Most listened song (count)", mostListenedSongCount);
    answerHtml += addAnswerRow("Most listened song (time)", mostListenedSongTime);
    answerHtml += addAnswerRow("Most listened artist (count)", mostListenedArtistCount);
    answerHtml += addAnswerRow("Most listened artist (time)", mostListenedArtistTime);
    answerHtml += addAnswerRow("Friday night song (count)", fridayNightSongCount);
    answerHtml += addAnswerRow("Friday night song (time)", fridayNightSongTime);
    answerHtml += addAnswerRow("Longest streak song", longestStreakSong);
    answerHtml += addAnswerRow("Every day songs", dailySongs);
    answerHtml += addAnswerRow(`Top ${topGenres.length} genres`, topGenres.join(", "));



    answerHtml += `</tbody></table>`;
    answerDiv.innerHTML = answerHtml;
  }