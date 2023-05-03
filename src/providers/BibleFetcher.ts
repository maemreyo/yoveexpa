class BibleFetcher {
    private readonly srcPath: string = `/src/assets/data/json/en/asv/`;

    private getJsonPath = (bookId: string, chapter: number) =>
        this.srcPath + `${bookId}-${chapter}.json`;

    public fetchJson = async (bookId: string, chapter: number) => {
        const bibleJsonFile = this.getJsonPath(bookId, chapter);
        const chromeFilePath = chrome.runtime.getURL(bibleJsonFile);

        const resposne = await fetch(chromeFilePath);
        const json = resposne.json();
        return await json;
    };
}

export default BibleFetcher;
