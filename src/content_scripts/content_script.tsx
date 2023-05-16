import React from "react";
import ReactDOM from "react-dom/client";
import Button from "../components/Button";
import "../index.css";
import ScrapingHandler from "../providers/ScrapingHandler";
import { getToday } from "../utils/time";
import { VERSE_BASE_URL, VERSE_KEY } from "../utils/constant";
import VersePopper from "../components/VersePopper";
import StorageHandler from "../providers/StorageHandler";
import { RawVerse } from "../utils/type";

function ContentScript() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [verseOfDay, setVerseOfDay] = React.useState<RawVerse>({
        verse: [],
        address: "",
    });

    React.useEffect(() => {
        const storageHandler = new StorageHandler();
        storageHandler.get(VERSE_KEY, (verseData) => setVerseOfDay(verseData));
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <Button onClick={handleClick} />
            <VersePopper
                open={open}
                anchorEl={anchorEl}
                verses={verseOfDay.verse}
                address={verseOfDay.address}
            />
        </>
    );
}

const index = document.createElement("div");
index.id = "mae-ext";
document.body.appendChild(index);

ReactDOM.createRoot(index).render(
    <React.StrictMode>
        <ContentScript />
    </React.StrictMode>
);
