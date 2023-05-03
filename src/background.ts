import ScrapingHandler from "./providers/ScrapingHandler";
import BibleParser from "./providers/BibleParser";
import * as cheerio from "cheerio";

const verseDayUrl = "https://www.bible.com/verse-of-the-day";

chrome.runtime.onStartup.addListener(async () => {
    fetchVerseAndParse(verseDayUrl);
});

chrome.tabs.onCreated.addListener(async (tab) => {
    fetchVerseAndParse(verseDayUrl);
});

const fetchVerseAndParse = async (url: string) => {
    const bibleParser = new BibleParser();
    const scrapingHandler = new ScrapingHandler(verseDayUrl);
    const selector = await scrapingHandler.loadSelector();

    const firstLink = selector("p.bible-l9gg9c").first();
    const firstText = firstLink.text();

    const secondLink = selector("a.bible-10k3j55").last();
    const href = secondLink.attr("href") || "";

    const dailyVerse = bibleParser.getInfo(href, firstText);

    chrome.storage.sync.set({ dailyVerse });
};

async function checkVerseOfTheDay(url: string) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        // Get the text content of the p tag with class name "chakra-text bible-gwclwa"
        const verseText = $("p.chakra-text.bible-gwclwa").text().trim();

        // Get the current date
        const today = new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        });
        console.log("today", today);

        // Check if the verse text contains the current date
        if (verseText.includes(today)) {
            console.log("Found the verse of the day!");
            return true;
        } else {
            // console.log("Reloading the webpage...");
            // await checkVerseOfTheDay(url);
        }
    } catch (error) {
        console.error(error);
        return false;
    }
}

export {};
