import inquirer from "inquirer";
import { getExistingUsers, addNewUser } from "./existingusers.js";
import { login } from "./login.js";
async function registerUser() {
    let userCheck = false;
    while (!userCheck) {
        let newUser = await inquirer.prompt([
            {
                type: "string",
                name: "username",
                message: "Enter your Username:",
            },
            {
                type: "string",
                name: "name",
                message: "Enter your Full Name:",
            },
            {
                type: "list",
                name: "gender",
                message: "Select your Gender:",
                choices: ["Male", "Female"],
            },
            {
                type: "string",
                name: "password",
                message: "Enter your Password:",
            },
        ]);
        const existingUserCheck = getExistingUsers().find((user) => user.username === newUser.username);
        if (existingUserCheck) {
            console.log("\n");
            console.log("************************************");
            console.log("******* User Already Exists! *******");
            console.log("************************************");
            console.log("\n");
        }
        else {
            newUser = {
                userId: getExistingUsers().slice(-1)[0]?.userId + 1,
                username: newUser.username,
                name: newUser.name,
                gender: newUser.gender,
                password: newUser.password,
            };
            addNewUser(newUser);
            userCheck = true;
            console.log("\n");
            console.log("*********************************************");
            console.log("******* Account Created SuccessFully! *******");
            console.log("*********************************************");
            console.log("\n");
            console.log("*******************************************");
            console.log("******* Kindly Login your Account ! *******");
            console.log("*******************************************");
            console.log("\n");
            await login();
        }
    }
}
export { registerUser };
