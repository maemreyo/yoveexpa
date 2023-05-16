import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

interface TypingAnimationProps {
    className?: string;
    sentence: string;
    delay?: number;
    speed?: number;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
    className,
    sentence,
    delay = 0,
    speed = 30,
}) => {
    const [visibleSentence, setVisibleSentence] = useState("");

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const typeSentence = (text: string, index: number): void => {
            if (index <= text.length) {
                setVisibleSentence(text.substring(0, index));
                timer = setTimeout(() => {
                    typeSentence(text, index + 1);
                }, speed);
            }
        };

        const startAnimation = (): void => {
            timer = setTimeout(() => {
                typeSentence(sentence, 0);
            }, delay);
        };

        startAnimation();

        return () => {
            clearTimeout(timer);
        };
    }, [sentence, delay]);

    return (
        <AnimatePresence>
            <motion.span
                className={clsx("", className)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                {visibleSentence}&nbsp;
            </motion.span>
        </AnimatePresence>
    );
};

export default TypingAnimation;
