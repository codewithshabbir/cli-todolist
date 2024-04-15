import inquirer from "inquirer";
import { getExistingUsers } from "./existingusers.js";
async function todoSelection(getId) {
    let todoSelectionCheck = false;
    while (!todoSelectionCheck) {
        const todosSelections = await inquirer.prompt([
            {
                type: "list",
                name: "todosSelect",
                message: "Please Select one option:",
                choices: [
                    "Select Todo",
                    "Add Todo",
                    "Update Todo",
                    "Delete Todo",
                    "Delete All Todo",
                    "Exit",
                ],
            },
        ]);
        if (todosSelections.todosSelect.toLowerCase() === "select todo") {
            let currentUser = getExistingUsers().find((user) => user.userId === getId);
            if (currentUser) {
                if (!currentUser.myTodos || currentUser.myTodos.length === 0) {
                    console.log("No todos found.");
                }
                else {
                    console.log("Current Todos:");
                    currentUser.myTodos.forEach((todo) => {
                        console.log("Task Id:", todo.todoId, "- Task:", todo.todoMessage);
                    });
                    console.log("\n");
                }
            }
        }
        else if (todosSelections.todosSelect.toLowerCase() === "add todo") {
            await addTodo(getId);
        }
        else if (todosSelections.todosSelect.toLowerCase() === "update todo") {
            await updateTodo(getId);
        }
        else if (todosSelections.todosSelect.toLowerCase() === "delete todo") {
            await deleteTodo(getId);
        }
        else if (todosSelections.todosSelect.toLowerCase() === "delete all todo") {
            await deleteAllTodos(getId);
        }
        else if (todosSelections.todosSelect.toLowerCase() === "exit") {
            todoSelectionCheck = true;
        }
    }
}
async function addTodo(getId) {
    let currentUser = getExistingUsers().find((user) => user.userId === getId);
    if (currentUser) {
        currentUser.myTodos = currentUser.myTodos || [];
        const addTodos = await inquirer.prompt([
            {
                name: "newTodo",
                message: "Enter a new Task:",
            },
        ]);
        const getTodoId = currentUser.myTodos.length > 0 ? currentUser.myTodos.slice(-1)[0].todoId : 0;
        const newTodo = {
            todoId: getTodoId + 1,
            todoMessage: addTodos.newTodo,
        };
        currentUser.myTodos.push(newTodo);
        console.log("\n****************************************************");
        console.log("******* Your task has been added successfully! *******");
        console.log("******************************************************\n");
        console.log("Current Todos:");
        currentUser.myTodos.forEach((todo) => {
            console.log("Task Id:", todo.todoId, "- Task:", todo.todoMessage);
        });
        console.log("\n");
        const continueTask = await inquirer.prompt({
            type: "list",
            name: "continue",
            message: "Do you want to add a new task?",
            choices: ["Yes", "No"],
        });
        if (continueTask.continue.toLowerCase() === "yes") {
            await addTodo(getId);
        }
        else {
            return; // Return back to the main todoSelection loop
        }
    }
}
async function updateTodo(getId) {
    let currentUser = getExistingUsers().find((user) => user.userId === getId);
    if (currentUser) {
        if (!currentUser.myTodos || currentUser.myTodos.length === 0) {
            console.log("No todos found.");
        }
        else {
            const updateTodoId = await inquirer.prompt([
                {
                    type: "number",
                    name: "todoId",
                    message: "Enter the ID of the Todo you want to update:",
                },
            ]);
            const todoToUpdate = currentUser.myTodos.find((todo) => todo.todoId === updateTodoId.todoId);
            if (todoToUpdate) {
                const updatedTodo = await inquirer.prompt([
                    {
                        name: "newMessage",
                        message: "Enter the updated message for the Todo:",
                    },
                ]);
                todoToUpdate.todoMessage = updatedTodo.newMessage;
                console.log("\n********************************************");
                console.log("******* Your task has been updated! *******");
                console.log("********************************************\n");
                console.log("Current Todos:");
                currentUser.myTodos.forEach((todo) => {
                    console.log("Task Id:", todo.todoId, "- Task:", todo.todoMessage);
                });
                console.log("\n");
            }
            else {
                console.log("\n********************************************");
                console.log("*** No Todo found with the provided ID! ***");
                console.log("********************************************\n");
            }
        }
    }
}
async function deleteTodo(getId) {
    let currentUser = getExistingUsers().find((user) => user.userId === getId);
    if (currentUser) {
        if (!currentUser.myTodos || currentUser.myTodos.length === 0) {
            console.log("No todos found.");
        }
        else {
            const deleteTodoId = await inquirer.prompt([
                {
                    type: "number",
                    name: "todoId",
                    message: "Enter the ID of the Todo you want to delete:",
                },
            ]);
            const todoIndexToDelete = currentUser.myTodos.findIndex((todo) => todo.todoId === deleteTodoId.todoId);
            if (todoIndexToDelete !== -1) {
                currentUser.myTodos.splice(todoIndexToDelete, 1);
                console.log("\n********************************************");
                console.log("******* Your task has been deleted! *******");
                console.log("********************************************\n");
                console.log("Current Todos:");
                currentUser.myTodos.forEach((todo) => {
                    console.log("Task Id:", todo.todoId, "- Task:", todo.todoMessage);
                });
                console.log("\n");
            }
            else {
                console.log("\n********************************************");
                console.log("*** No Todo found with the provided ID! ***");
                console.log("********************************************\n");
            }
        }
    }
}
async function deleteAllTodos(getId) {
    let currentUser = getExistingUsers().find((user) => user.userId === getId);
    if (currentUser) {
        if (!currentUser.myTodos || currentUser.myTodos.length === 0) {
            console.log("No todos found.");
        }
        else {
            currentUser.myTodos = []; // Empty the array of todos
            console.log("\n********************************************");
            console.log("******* All your todos have been deleted! *******");
            console.log("********************************************\n");
        }
    }
}
export { todoSelection };
