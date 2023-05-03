import { BibleInfo, NotMatch, TranslationId, Url } from "../utils/type";

class BibleParser {
    private getVerseInfo = (href: Url) => {
        const regex = /\/bible\/(\d+)\/(\w+)\.(\d+)\.(\d+)/;
        const match = href.match(regex);

        if (!match) {
            throw new Error("Invalid href format");
        }

        const bookId = match[2];
        const chapter = parseInt(match[3], 10);
        const verse = parseInt(match[4], 10);

        return { bookId, chapter, verse };
    };
    private getBookInfo = (text: string) => {
        console.log("text: ", text);

        const regex = /^(.+?)\s+(\d+:\d+)\s+\((\w+)\)$/;
        const match = text.match(regex);

        if (!match) {
            throw new Error("Invalid text format");
        }

        const bookName = match[1];
        const translationId = match[3].toLowerCase();

        return { bookName, translationId };
    };

    public getInfo = (href: string, text: string): BibleInfo => {
        const { bookId, chapter, verse } = this.getVerseInfo(href);
        const { bookName, translationId } = this.getBookInfo(text);
        return {
            translationId,
            bookId,
            bookName,
            chapter,
            verse,
        };
    };
}

export default BibleParser;
