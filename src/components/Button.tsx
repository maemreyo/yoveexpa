import React from "react";
import { StarIcon } from "lucide-react";

const Button = (props: any) => {
    return (
        <button
            {...props}
            className="fixed bottom-2rem right-2rem w-[40px] h-[40px] rounded-full bg-teal-500 hover:bg-teal-800 text-white font-bold drop-shadow flex items-center justify-center"
        >
            <StarIcon />
        </button>
    );
};

export default Button;
