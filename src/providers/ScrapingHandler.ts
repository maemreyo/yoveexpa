import * as cheerio from "cheerio";
import { RawVerse, Verse } from "../utils/type";

class ScrapingHandler {
    private readonly url: string;

    constructor(url: string) {
        this.url = url;
    }

    public loadSelector = async () => {
        const response = await fetch(this.url);
        const html = await response.text();

        return cheerio.load(html);
    };

    public fetchVerse = async (): Promise<RawVerse> => {
        const selector = await this.loadSelector();

        const verses = selector(".bible-verses").first();
        const verseTextElements = verses
            .find(".leading-8")
            .map((_, element) => {
                const verseNumber = selector(element)
                    .find(".font-bold")
                    .text()
                    .trim();
                const verseContent = selector(element)
                    .contents()
                    .filter((_, el) => el.nodeType === 3)
                    .text()
                    .trim();
                return {
                    number: Number.parseInt(verseNumber),
                    content: verseContent
                } as Verse;
            })
            .get();
        const verse = verseTextElements as Verse[];
        const addressElement = selector("a[href*=passage]").first();
        const address = addressElement.text().trim();

        return {
            verse,
            address,
        } as RawVerse;
    };
}

export default ScrapingHandler;
