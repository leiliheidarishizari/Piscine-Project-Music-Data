
import { getMostListenedSong} from "./calculation.js";
import { getListenEvents} from "./data.js";

const userId = 2;
test("It should return the Most listened song (count) for user 2 ", () => {

    const listenEvents = getListenEvents(userId);
    const mostListenedSongCount = getMostListenedSong(listenEvents, false, false);

    expect(mostListenedSongCount).toEqual("Frank Turner - I Still Believe")
})

test("It should return the Most listened song (time) for user 2 ", () => {

    const listenEvents = getListenEvents(userId);
    const mostListenedSongCount = getMostListenedSong(listenEvents, true, false);
        
    expect(mostListenedSongCount).toEqual("Frank Turner - I Still Believe")
})

test("It should return the Most listened artist (count) for user 2", () => {

    const listenEvents = getListenEvents(userId);
    const mostListenedSongCount = getMostListenedSong(listenEvents, false, true);
    
    expect(mostListenedSongCount).toEqual("Frank Turner")
})

test("It should return the Most listened artist (time) for user 2 ", () => {

    const listenEvents = getListenEvents(userId);
    const mostListenedSongCount = getMostListenedSong(listenEvents, true, true);
    
    expect(mostListenedSongCount).toEqual("Frank Turner")
})