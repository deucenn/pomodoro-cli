// Imported readline for cli inputs
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Pomodoro = async (workTime: number, breakTime: number) => {
  const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  console.log(`Starting a ${workTime}-minute work timer!`);
  for (let i = 0; i < workTime; i++) {
    console.log(`Work time left: ${workTime - i} minutes`);
    await sleep(60000);
  }
  console.log("Work time is up! Time for a break!");

  for (let i = 0; i < breakTime; i++) {
    console.log(`Break time left: ${breakTime - i} minutes`);
    await sleep(60000);
  }
  console.log("Break time is over! Great work! Ready for the next session?");
};

rl.question("How long should the work time be in minutes? ", (workTime) => {
  rl.question(
    "How long should the break time be in minutes? ",
    async (breakTime) => {
      const workTimer = parseInt(workTime, 10);
      const breakTimer = parseInt(breakTime, 10);

      if (
        isNaN(workTimer) ||
        isNaN(breakTimer) ||
        workTimer < 1 ||
        breakTimer < 1
      ) {
        console.error(
          "Invalid input. Please restart and enter positive integers for work and break times."
        );
      } else {
        await Pomodoro(workTimer, breakTimer);
      }
      rl.close();
    }
  );
});

