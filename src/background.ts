import ScrapingHandler from "./providers/ScrapingHandler";
import { getToday } from "./utils/time";
import { VERSE_BASE_URL, VERSE_KEY } from "./utils/constant";
import StorageHandler from "./providers/StorageHandler";

const currentTime = getToday();
const verseUrl = VERSE_BASE_URL + currentTime;

chrome.runtime.onStartup.addListener(async () => {
    fetchVerseAndParse(verseUrl);
});

chrome.tabs.onCreated.addListener(async (tab) => {
    fetchVerseAndParse(verseUrl);
});

const fetchVerseAndParse = async (url: string) => {
    const scrapingHandler = new ScrapingHandler(url);
    const RawVerses = await scrapingHandler.fetchVerse();

    const storageHandler = new StorageHandler();
    storageHandler.set(VERSE_KEY, RawVerses);
};

export {};
