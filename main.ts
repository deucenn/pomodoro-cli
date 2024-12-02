// Import for input and output in cli
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const askQuestion = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

const Pomodoro = async (workTime: number, breakTime: number) => {
  console.log(`Starting a ${workTime}-minute work timer!`);
  for (let i = 0; i < workTime; i++) {
    console.log(`Work time left: ${workTime - i} minutes`);
    await sleep(60000); // Simulate 1 minute (for testing, reduce this)
  }
  console.log("Work time is up! Time for a break!");

  for (let i = 0; i < breakTime; i++) {
    console.log(`Break time left: ${breakTime - i} minutes`);
    await sleep(60000); // Simulate 1 minute (for testing, reduce this)
  }
  console.log("Break time is over!");

  const answer = await askQuestion("Do you want to start another session? (yes|no): ");
  const trimmedAnswer = answer.trim().toLowerCase();

  if (trimmedAnswer === "yes") {
    console.log("Starting a new session!");
    await Pomodoro(workTime, breakTime);
  } else if (trimmedAnswer === "no") {
    console.log("Thank you for using the Pomodoro timer! Goodbye!");
    rl.close();
  } else {
    console.log("Invalid input. Please enter 'yes' or 'no'.");
    await Pomodoro(workTime, breakTime); // Retry the same session
  }
};

const main = async () => {
  const workTimeInput = await askQuestion("How long should the work time be in minutes? ");
  const breakTimeInput = await askQuestion("How long should the break time be in minutes? ");

  const workTimer = parseInt(workTimeInput, 10);
  const breakTimer = parseInt(breakTimeInput, 10);

  if (
    isNaN(workTimer) ||
    isNaN(breakTimer) ||
    workTimer < 1 ||
    breakTimer < 1
  ) {
    console.error(
      "Invalid input. Please restart and enter positive integers for work and break times."
    );
    rl.close();
  } else {
    await Pomodoro(workTimer, breakTimer);
  }
};

main();

