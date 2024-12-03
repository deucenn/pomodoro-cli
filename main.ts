// Import for input and output in CLI
import inquirer from "inquirer";
import notifier from "node-notifier";
import { Bar, Presets } from "cli-progress";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Pomodoro = async (workTime: number, breakTime: number) => {
  console.clear();

  console.log(`💻 Starting a ${workTime}-minute work timer!`);
  notifier.notify({
    title: "Pomodoro Timer",
    message: "💻Work time started!💻",
  });

  await sleep(1000);

  console.clear();
  const workBar = new Bar(
    {
      format: '💻 Work Time |{bar}| {value}/{total} minutes left',
    },
    Presets.shades_classic
  );
  workBar.start(workTime, 0);

  for (let i = 0; i < workTime; i++) {
    await sleep(60000);
    workBar.update(i + 1);
  }
  workBar.stop();

  console.log("☕ Work time is up! Time for a break!");
  await sleep(1000);

  console.log(`☕ Starting a ${breakTime}-minute work timer!`);
  notifier.notify({
    title: "Pomodoro Timer",
    message: "☕Break time started!☕",
  });

  await sleep(1000);

  console.clear();
  const breakBar = new Bar(
    {
      format: '💤 Break Time |{bar}| {value}/{total} minutes left',
    },
    Presets.shades_classic
  );
  breakBar.start(breakTime, 0);

  for (let i = 0; i < breakTime; i++) {
    await sleep(60000);
    breakBar.update(i + 1);
  }
  breakBar.stop();
  console.log("Break time is over!");

  await sleep(1000);

  const { continueSession } = await inquirer.prompt([
    {
      type: "list",
      name: "continueSession",
      message: "Do you want to continue the session?",
      choices: ["Yes", "No"],
    },
  ]);

  if (continueSession === "Yes") {
    console.log("Continuing the session!");
    await sleep(1000);
    await Pomodoro(workTime, breakTime);
  } else {
    console.clear();
    main();
  }
};

const main = async () => {
  console.clear();
  console.log(`
    ____                               _         _____ _                     
   |  _ \\ ___  _ __ ___   ___  _ __ __| | ___   |_   _(_)_ __ ___   ___ _ __ 
   | |_) / _ \\| '_ \` _ \\ / _ \\| '__/ _\` |/ _ \\    | | | | '_ \` _ \\ / _ \\ '__|
   |  __/ (_) | | | | | | (_) | | | (_| | (_) |   | | | | | | | | |  __/ |   
   |_|   \\___/|_| |_| |_|\\___/|_|  \\__,_|\\___/    |_| |_|_| |_| |_|\\___|_|    
   `);

  const { menuChoice } = await inquirer.prompt([
    {
      type: "list",
      name: "menuChoice",
      message: "Welcome to my Pomodoro Timer",
      choices: ["Start", "Settings", "Exit"],
    },
  ]);

  if (menuChoice === "Start") {
    console.log("Starting the session!");
    await Pomodoro(25, 5);
  } else if (menuChoice === "Settings") {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "workTime",
        message: "How long should the work time be in minutes?",
        validate: (input: string) =>
          parseInt(input, 10) > 0
            ? true
            : "Please enter a positive integer greater than 0.",
      },
      {
        type: "input",
        name: "breakTime",
        message: "How long should the break time be in minutes?",
        validate: (input: string) =>
          parseInt(input, 10) > 0
            ? true
            : "Please enter a positive integer greater than 0.",
      },
    ]);

    const workTimer = parseInt(answers.workTime, 10);
    const breakTimer = parseInt(answers.breakTime, 10);

    await Pomodoro(workTimer, breakTimer);
  } else if (menuChoice === "Exit") {
    console.clear();
    console.log("Thank you for using the Pomodoro timer! Goodbye!");
  }
};

main();

