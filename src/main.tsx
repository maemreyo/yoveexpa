import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StorageHandler from "./providers/StorageHandler";
import { VERSE_KEY } from "./utils/constant";

function Main() {
    const [verseOfDay, setVerseOfDay] = useState<{
        verse: string;
        address: string;
    } | null>(null);

    useEffect(() => {
        const storageHandler = new StorageHandler()
        storageHandler.get(VERSE_KEY, (verseData) => setVerseOfDay(verseData))
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
