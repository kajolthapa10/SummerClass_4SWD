const generateLoveScore = () => {
    return Math.floor(Math.random() * 100) + 1;
};

export const getLoveMessage = (score) => {
    if (score >= 1 && score <= 30) {
        return "Not a great match 😢";
    } else if (score >= 31 && score <= 70) {
        return "Could work 🙂";
    } else if (score >= 71 && score <= 100) {
        return "Perfect match ❤️";
    }
    return "Invalid score";
};

export default generateLoveScore;
