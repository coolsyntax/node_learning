const fs = require("fs");
//const { argv } = require('process');
const filePath = "./tasks.json";

function loadTasks() {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
}

function savetasks(tasks) {
  const dataJSON = JSON.stringify(tasks);
  fs.writeFileSync(filePath, dataJSON);
}

const cammand = process.argv[2];
const argument = process.argv[3];

function addTask(task) {
  const tasks = loadTasks();
  tasks.push({ task });
  savetasks(tasks);
  console.log(`Task added : ${task}`);
}

function listTasks() {
  const tasks = loadTasks();
  tasks.forEach((element, index) => {
    console.log(`${index + 1} - ${element.task}`);
  });
}

const removeTask = (index) => {
  const tasks = loadTasks();
  tasks.splice(index, 1);
  savetasks(tasks);
  console.log("item removed");
};

if (cammand === "add") {
  addTask(argument);
} else if (cammand === "list_task") {
  listTasks();
} else if (cammand === "remove") {
  removeTask(argument);
} else {
  console.log("Invalid cammand");
}
