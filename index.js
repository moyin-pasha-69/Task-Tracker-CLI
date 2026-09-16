const { log } = require("console");
const fs = require("fs");
const { stringify } = require("querystring");
const filePath = "./taskList.json";

const command = process.argv[2];
const arg1 = process.argv[3];
const arg2 = process.argv[4];

if (command == "add") {
  addTask(arg1);
} else if (command == "dlt") {
  removeTask(arg1);
} else if (command == "modify") {
  updateTasks(arg1, arg2);
} else if (command == "mark-as-progress") {
  updateStatus(command);
} else if (command == "mark-as-done") {
  updateStatus(command);
} else if (command == "lst") {
  showList(arg1);
}

function loadTasks() {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
}
function getCurrentTime() {
  const currentTimeDate = new Date();
  const date = { day: "2-digit", month: "short", year: "numeric" };
  const time = { hour: "2-digit", minute: "2-digit" };
  return `${currentTimeDate.toLocaleDateString("en-GB", date)} ${currentTimeDate.toLocaleTimeString([], time)}`;
}
function saveTasks(tasksList) {
  const dataJSON = JSON.stringify(tasksList);
  return fs.writeFileSync(filePath, dataJSON);
}
function addTask(task) {
  const tasksList = loadTasks();
  const time = getCurrentTime();
  const index = tasksList.length + 1;
  tasksList.push({
    id: index,
    desc: task,
    status: "todo",
    createdAt: time,
    updateAt: time,
  });

  saveTasks(tasksList);
  console.log(`task added successfully! (ID:${index})`);
}
function removeTask(value) {
  const tasksList = loadTasks();
  if (tasksList.length == 0) {
    console.log("there is no tasks!");
  }
  tasksList.splice(value - 1, 1);
  saveTasks(tasksList);
  console.log(`task removed successfully! (ID:${value})`);
}
function updateTasks(pos, task) {
  const tasksList = loadTasks();
  const position = parseInt(pos) - 1;
  tasksList[position].desc = task;
  tasksList[position].updateAt = getCurrentTime();
  saveTasks(tasksList);
  console.log(`task updated successfully! (ID:${position + 1})`);
}
