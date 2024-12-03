# Pomodoro Timer CLI

A simple Pomodoro timer CLI application built with TypeScript that helps you manage your work and break sessions. The app notifies you when work or break time starts and updates progress with a visual progress bar.

## Features

- **Work Timer**: A timer that helps you focus on tasks for a specific duration (default: 25 minutes).
- **Break Timer**: A timer that allows you to take short breaks after completing a work session (default: 5 minutes).
- **Progress Bars**: Visual progress bars show the remaining time for work and break sessions.
- **Notifications**: Desktop notifications are shown when a work or break session starts.
- **Interactive CLI**: The application offers a menu for starting a session, adjusting session times, or exiting.

## Prerequisites

- Node.js (version 14.x or higher)
- npm (Node Package Manager)
- TypeScript (installed globally or in the project)

Follow these steps to install and run the Pomodoro Timer CLI on your local machine:

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/pomodoro-cli.git
   cd pomodoro-cli
2. Install dependencies:
   ```bash
   npm install
3. (Optional) If you don´t have TypeScript installed globally, you can install it using:
   ```bash
   npm install -g typescript

## Running the application

To start then application, run the following command:

```bash
npx ts-node main.ts
```
## Dependencies

- [inquirer](https://www.npmjs.com/package/inquirer): For handling user prompts in the command-line interface.
- [node-notifier](https://www.npmjs.com/package/node-notifier): To show desktop notifications.
- [cli-progress](https://www.npmjs.com/package/cli-progress): For displaying progress bars in the terminal.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
