import inquirer from "inquirer";
import { getExistingUsers } from "./existingusers.js";
import { todoSelection } from "./todo-selection.js";
async function login() {
    let loginCheck = false;
    while (!loginCheck) {
        const loginUser = await inquirer.prompt([
            {
                name: "username",
                message: "Enter your Username:",
            },
            {
                name: "password",
                message: "Enter your Password:",
            },
        ]);
        const { username, password } = loginUser;
        const user = getExistingUsers().find((user) => user.username.toLowerCase() === username.toLowerCase() && user.password.toLowerCase() === password.toLowerCase());
        if (user) {
            console.log("\n");
            console.log("****************************************");
            console.log("******* User Login Successfully! *******");
            console.log("****************************************");
            console.log("\n");
            console.log("****************************************");
            console.log(`******* Welcome to ${username}! *******`);
            console.log("****************************************");
            console.log("\n");
            loginCheck = true;
            await todoSelection(user.userId);
        }
        else {
            console.log("\n");
            console.log("***************************************************");
            console.log("******* Username and Password doesn't match *******");
            console.log("***************************************************");
            console.log("\n");
        }
    }
}
export { login };
