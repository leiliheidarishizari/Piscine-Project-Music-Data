
import { getSong } from "./data.js";

//create new row in table
function addAnswerRow(question, answer) {
    return answer ? `<tr><td><span style="font-weight:bold">${question}</span></td><td>${answer}</td></tr>` : "";
  }


// get top item handler
  function getTopItem(counts) {
    let topItem = "";
    let maxCount = 0;
  
    for (const [key, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        topItem = key;
      }
    }
    return topItem
  }

//getMostListendSong count/time/artist
  function getMostListenedSong(events, time, artist) {
    const songCounts = {};
  
     events.forEach(event => {
      const song = getSong(event.song_id)
      if(artist){
        const key = `${song.artist}`
        songCounts[key] = (songCounts[key] || 0) + (song.duration_seconds)
      }
      else{
      const key = `${song.artist} - ${song.title}`
      songCounts[key] = (songCounts[key] || 0) + (time ? (song.duration_seconds) : 1)
      }
    });

    return getTopItem(songCounts);
 
  }
  
  //getMostListendSong for Friday
  function getMostListenedFridaySong(events, time) {
    const songFriday = {};
  
    events.forEach(event => {
      const date = new Date(event.timestamp);
      const day = date.getDay();
      const hours = date.getHours();

      if ((day === 5 && hours >= 17 )|| (day === 6 &&  hours < 4)) {
        console.log(`date: ${date}, day: ${day}, hours: ${hours}`)
        const song = getSong(event.song_id);
        const key = `${song.artist} - ${song.title}`
        songFriday[key] = (songFriday[key] || 0) + (time ? (song.duration_seconds) : 1)
      }
    });
  
    return getTopItem(songFriday);
  }
  
  //get Longest Streak song
  
  function getLongestStreakSong(events) {
    let maxStreak = 0;
    let currentStreak = 0;
    let lastSong = "";
    let longestSong = [];
  
    events.forEach(event => {
      const song = getSong(event.song_id);
      const key = `${song.artist} - ${song.title}`
  
      if (key === lastSong) {
        currentStreak++;
      } else {
        currentStreak = 1;
        lastSong = key;
      }
  
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
        longestSong = [key];
      } else if(currentStreak === maxStreak){
        longestSong.push(key)
      }
    });
  
    return longestSong ? `${longestSong.join(", ")} (length: ${maxStreak})` : "";
  }
  

  //get everyday song
  function getEverydaySongs(events) {
    const songDays = {};
  
    events.forEach(event => {
      const song = getSong(event.song_id);
      const key = `${song.artist} - ${song.title}`
      const date = new Date(event.timestamp).toDateString();

      songDays[key] = songDays[key] || new Set();
      songDays[key].add(date);
    });
  
    const totalDays = new Set(events.map(x => new Date(x.timestamp).toDateString())).size;
    return Object.keys(songDays).filter(song => songDays[song].size === totalDays).join(", ") || "";
  }
  

  //get top genres
  function getTopGenres(events) {
    const genreCounts = {};
  
    events.forEach(event => {
      const song = getSong(event.song_id);
      genreCounts[song.genre] = (genreCounts[song.genre] || 0) + 1;
    });
  
    const sortedGenres = Object.entries(genreCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([genre]) => genre);
  
    return sortedGenres.length ? sortedGenres : "";
  }


  export{addAnswerRow, getEverydaySongs, getLongestStreakSong, getMostListenedFridaySong, getMostListenedSong, getTopGenres, getTopItem}