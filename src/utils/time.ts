export const getToday = (): string => {
    const currentDate = new Date();

    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const year = String(currentDate.getFullYear());

    return `${month}-${day}-${year}`;
};

export const getDelay = (content: string, speed = 40): number => content.length * speed;