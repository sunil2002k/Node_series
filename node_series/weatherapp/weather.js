import axios from "axios";
import chalk from "chalk";
import inquirer from "inquirer";
import * as dotenv from "dotenv"; // Use ES Module syntax for dotenv

dotenv.config(); // Load environment variables

const API_KEY = process.env.API_KEY || "39b701c6b490a62a2e53efb8262b7f5c"; // Replace with your API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// Function to fetch weather data
async function fetchWeather(city) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric",
      },
    });
    const { name, main, weather } = response.data;

    console.log(
      chalk.green(`\nWeather in ${name}:`),
      chalk.blueBright(`${main.temp}°C`),
      chalk.yellow(`(${weather[0].description})\n`)
    );
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.log(chalk.red("City not found! Please try again."));
    } else {
      console.log(chalk.red("Error fetching weather data."));
    }
  }
}

// Main function to prompt user input
async function main() {
  console.log(chalk.bold("🌤️ Welcome to the Weather CLI App! 🌤️\n"));

  const { city } = await inquirer.prompt([
    {
      type: "input",
      name: "city",
      message: "Enter a city name to get the weather:",
    },
  ]);

  await fetchWeather(city);

  const { repeat } = await inquirer.prompt([
    {
      type: "confirm",
      name: "repeat",
      message: "Would you like to check another city?",
    },
  ]);

  if (repeat) {
    main(); // Restart the app
  } else {
    console.log(chalk.green("Goodbye! 👋"));
    process.exit(0);
  }
}

// Start the app
main();
