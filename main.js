const Decimal = require('decimal.js');
const readline = require('readline');
const sleep = (waitTimeInMs) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));

async function blockReadLine() {

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let result = undefined;
    rl.on('line', function(line){
        result = line;
    })

    while(!result) await sleep(100);

    return result;
}

async function run() {
    new Promise(async () => {
        while(true) {
            console.log("Won't be silenced! Won't be censored!");
            await sleep(1000);
        }
    });

    let result = await blockReadLine();
    console.log("The result was:" + result);
    process.exit(0);
}

const round_to_precision = (x, precision) => {
    const y = +x + (precision === undefined ? 0.5 : precision/2);
    return y - (y % (precision === undefined ? 1 : +precision));
}

const testme = async (ask) => {

    let numberOfTests = 0;
    let numberOfCorrectAnswers = 0;
    let totalTimeThinkingMs = 0;

    const printStat = () => {
        console.log(`Number of tests: ${numberOfTests}`);
        console.log(`Correct answers: ${numberOfCorrectAnswers}`);
        const minutes = totalTimeThinkingMs / 1000 / 60;
        if (minutes < 1) {
            console.log(`Total time thinking: ${round_to_precision(totalTimeThinkingMs / 1000, 2)} seconds`);
        } else {
            console.log(`Total time thinking: ${round_to_precision(totalTimeThinkingMs / 1000 / 60, 2)} minutes`);
        }
    };

    while (true) {

        const {question, correctAnswer} = ask();

        numberOfTests++;
        console.log(`------------------------------------`);
        console.log(`Tell me the answer of this question:`);
        console.log(question);

        const start = new Date();
        const answer = await blockReadLine();
        const end = new Date() - start
        totalTimeThinkingMs += end;

        if (answer === correctAnswer) {
            numberOfCorrectAnswers++;

            console.log(`----------------------------------`);
            console.log(`"${answer}" is the correct answer!`);
            console.log(`----------------------------------`);
        } else {
            console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
            console.log(`"${answer}" is NOT the correct answer!`);
            console.log(`"${correctAnswer}" is the correct answer!`);
            console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        }

        printStat();
    }
    
}

const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const dummyQuestion = () => {
    return {
        question: 'Tell me "a"',
        correctAnswer: 'a'
    }
}

const askSubstractFractions = () => {
    const a = getRandomInt(100000) / Math.pow(10, getRandomInt(5)+1);
    const b = getRandomInt(100000) / Math.pow(10, getRandomInt(5)+1);

    const aa = new Decimal(a);
    const bb = new Decimal(b);

    const result = aa.minus(bb);
    if (result > 0) {
        return {
            question: `${a} - ${b}`,
            correctAnswer: `${result}`
        }
    } else {
        return {
            question: `${b} - ${a}`,
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
        question: `${a} + ${b}`,
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
        question: `${a} x ${b}`,
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
                question: `${a} : ${b}`,
                correctAnswer: `${result}`
            }
        }
    }
}

const askRandomQuestion = () => {

    if (Math.random() > 0.6) {
        return askAddFractions();
    } else {
        return askSubstractFractions();
    }
};

const askMulDivQuestion = () => {

    if (Math.random() > 0.6) {
        return askMultiplyTwoFrctions();
    } else {
        return askDivideTwoFrctions();
    }
};


testme(askMulDivQuestion);
