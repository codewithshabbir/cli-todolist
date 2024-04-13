#! /usr/bin/env node
import inquirer from "inquirer";
import { registerUser } from "./registeration.js";
import { login } from "./login.js";

async function main() {
  const numberGuessingGame = await inquirer.prompt([
    {
      type: "list",
      name: "select",
      message: "Choose an option:",
      choices: ["Login", "Registration"],
    },
  ]);

  const { select } = numberGuessingGame;

  if (select.toLowerCase() === "registration") {
    console.log("\n");
    console.log("**********************************************");
    console.log("******* Kindly Register your Account ! *******");
    console.log("**********************************************");
    console.log("\n");

    await registerUser();
  } else if (select.toLowerCase() === "login") {
    console.log("\n");

    console.log("*******************************************");
    console.log("******* Kindly Login your Account ! *******");
    console.log("*******************************************");
    console.log("\n");

    await login();
  }
}

main();
