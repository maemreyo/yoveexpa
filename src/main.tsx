import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import ScrapingHandler from "./providers/ScrapingHandler";

const verseDayUrl = "https://oneway.vn/kinh-thanh";

function Main() {
    const [verseOfDay, setVerseOfDay] = useState<{
        verse: string;
        address: string;
    } | null>(null);

    useEffect(() => {
        const fetchVerseAndParse = async (url: string) => {
            const scrapingHandler = new ScrapingHandler(verseDayUrl);
            const selector = await scrapingHandler.loadSelector();

            const verse = selector("div.quote-bible").first();
            const address = selector("div.bible-to-day").find("p");

            setVerseOfDay({
                verse: verse.text(),
                address: address.text(),
            });
        };

        fetchVerseAndParse(verseDayUrl);
    }, []);

    return (
        <div className="App" style={{ height: 300, width: 300 }}>
            {verseOfDay?.verse}
            <br />
			{verseOfDay?.address}
        </div>
    );
}

ReactDOM.createRoot(document.getElementById("root-main") as HTMLElement).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);
