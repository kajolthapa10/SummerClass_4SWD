import generateLoveScore, { getLoveMessage } from "./utils.js";
import readline from "readline/promises";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function loveCalculator() {
  console.log("💕 Love Calculator 💕\n");

  try {
    const name1 = await rl.question("Enter first name: ");
    const name2 = await rl.question("Enter second name: ");

    const score = generateLoveScore();
    const message = getLoveMessage(score);

    console.log("\n" + "=".repeat(40));
    console.log(`${name1.trim()} ❤️ ${name2.trim()}`);
    console.log(`Love Score: ${score}%`);
    console.log(message);
    console.log("=".repeat(40) + "\n");
  } catch (error) {
    console.error("Error:", error.message);
  } finally {
    rl.close(); 
  }
}

loveCalculator();