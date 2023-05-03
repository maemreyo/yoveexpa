import * as cheerio from "cheerio";

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
}

export default ScrapingHandler;
