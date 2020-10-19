const Decimal = require('decimal.js');

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const askSubstractFractions = () => {
    const a = getRandomInt(100000) / Math.pow(10, getRandomInt(5)+1);
    const b = getRandomInt(100000) / Math.pow(10, getRandomInt(5)+1);

    const aa = new Decimal(a);
    const bb = new Decimal(b);

    const result = aa.minus(bb);
    if (result > 0) {
        return {
            question: `${a} - ${b} = ?`,
            correctAnswer: `${result}`
        }
    } else {
        return {
            question: `${b} - ${a} = ?`,
            correctAnswer: `${-result}`
        }
    }
}

const askAddFractions = () => {
    const a = getRandomInt(100000) / Math.pow(10, getRandomInt(5)+1);
    const b = getRandomInt(100000) / Math.pow(10, getRandomInt(5)+1);

    const aa = new Decimal(a);
    const bb = new Decimal(b);

    const result = aa.plus(bb);
    return {
        question: `${a} + ${b} = ?`,
        correctAnswer: `${result}`
    }
}

const askMultiplyTwoFrctions = () => {
    const a = getRandomInt(100) / Math.pow(10, getRandomInt(2)+1);
    const b = getRandomInt(100) / Math.pow(10, getRandomInt(2)+1);

    const aa = new Decimal(a);
    const bb = new Decimal(b);

    const result = aa.mul(bb);
    return {
        question: `${a} x ${b} = ?`,
        correctAnswer: `${result}`
    }
}

const askDivideTwoFrctions = () => {
    while (true) {
        const a = getRandomInt(100) / Math.pow(10, getRandomInt(2)+1);
        const b = getRandomInt(100) / Math.pow(10, getRandomInt(2)+1);
    
        const aa = new Decimal(a);
        const bb = new Decimal(b);
    
        const result = aa.div(bb);
        const strResult = `${result}`;
        if (strResult.length < 6) {
            return {
                question: `${a} : ${b} = ?`,
                correctAnswer: `${result}`
            }
        }
    }
}

export const askAddSubstractQuestion = () => {

    if (Math.random() > 0.6) {
        return askAddFractions();
    } else {
        return askSubstractFractions();
    }
};

export const askMulDivQuestion = () => {

    if (Math.random() > 0.7) {
        return askMultiplyTwoFrctions();
    } else {
        return askDivideTwoFrctions();
    }
};
