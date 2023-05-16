import { FC } from "react";
import { Address, Verse } from "../utils/type";
import { Box, Popper } from "@mui/material";
import TypingAnimation from "./common/TypingAnimation";
import { getDelay } from "../utils/time";

interface IProps {
    open: boolean;
    anchorEl: HTMLElement | null;
    verses: Verse[];
    address: Address;
}

const WRITING_SPEED = 40;
const TITLE = "Verse of the day";

const VersePopper: FC<IProps> = ({ open, anchorEl, verses, address }) => {
    const mapper = (verses: Verse[]) =>
        verses
            .map((verse) => {
                return [verse.number.toString(), verse.content];
            })
            .flat();
    const sentences = mapper(verses);

    function calculateDelays(verses: string[], speed: number): number[] {
        const delays: number[] = [];
        delays.push(0);

        let totalDelay = 0;
        for (let i = 0; i < verses.length - 1; i++) {
            const verse = verses[i];
            const verseDelay = verse.length * speed;
            totalDelay += verseDelay;
            delays.push(totalDelay);
        }

        return delays;
    }
    const delays = calculateDelays(sentences, WRITING_SPEED);

    const classNames = (index: number): string =>
        index % 2 === 0 ? "font-bold" : "italic";

    return (
        <Popper
            className="z-[9999999999]"
            open={open}
            anchorEl={anchorEl}
            placement="top-end"
        >
            <Box className="bg-slate-50 w-[300px] drop-shadow-lg px-4 pt-4 pb-0.5 rounded-lg shadow-xl shadow-inner">
                <TypingAnimation
                    className="block font-bold text-xl mb-4 text-center"
                    sentence={"Verse of the day"}
                    speed={100}
                />
                <TypingAnimation
                    sentence={address}
                    className="text-lg mb-2 font-semibold underline"
                    delay={getDelay(TITLE)}
                />
                <br />
                <div className="sentences mb-4">
                    {sentences.map((item, index) => (
                        <TypingAnimation
                            sentence={item}
                            className={classNames(index)}
                            delay={
                                delays[index] +
                                getDelay(TITLE) +
                                getDelay(address)
                            }
                        />
                    ))}
                </div>
                <p className="text-xs italic text-slate-500	text-right mb-2">
                    Made by{" "}
                    <a href="https://github.com/maemreyo/" target="_blank">
                        maemreyo
                    </a>
                </p>
            </Box>
        </Popper>
    );
};

export default VersePopper;
