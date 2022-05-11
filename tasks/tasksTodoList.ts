import { task } from "hardhat/config";


task("create", "Create a task") 
    .addParam("contract", "address")
    .addParam("name", "name task") 
    .addParam("days", "days on todo")
    .setAction(async (taskArgs, hre) => {
        const todo = await hre.ethers.getContractAt("TodoList", taskArgs.contract);
    
        await todo.setTask(taskArgs.name, Number(taskArgs.days));

        console.log("Task is done");
})

task("get", "Get a task") 
    .addParam("contract", "address")
    .addParam("id", "id task")
    .setAction(async (taskArgs, hre) => {
        const todo = await hre.ethers.getContractAt("TodoList", taskArgs.contract);

        let task = await todo.getTask(Number(taskArgs.id));

        console.log(task);
})

task("delete", "Delete task")
    .addParam("contract", "address") 
    .addParam("id", "task id")
    .setAction(async (taskArgs, hre) => {
        const todo = await hre.ethers.getContractAt("TodoList", taskArgs.contract);
        
        await todo.setStatusInProgress(taskArgs.id);
        await todo.setStatusDone(taskArgs.id);
        await todo.deleteTask(taskArgs.id);

        console.log("Task is done");
})

task("realizationTask", "Change task status to 'RealizationTask'")
    .addParam("contract", "address") 
    .addParam("id", "task id")
    .setAction(async (taskArgs, hre) => {
        const todo = await hre.ethers.getContractAt("TodoList", taskArgs.contract);
        
        await todo.setStatusInProgress(0);

        console.log("Task is done");
})

task("todo", "Change task status to 'Todo'")
    .addParam("contract", "address") 
    .addParam("id", "task id")
    .setAction(async (taskArgs, hre) => {
        const todo = await hre.ethers.getContractAt("TodoList", taskArgs.contract); 
        
        await todo.setStatusToDo(0);

        console.log("Task is done");
})

task("doneTask", "Change task status to 'DoneTask'")
    .addParam("contract", "address") 
    .addParam("id", "task id")
    .setAction(async (taskArgs, hre) => {
        const todo = await hre.ethers.getContractAt("TodoList", taskArgs.contract); 
        
        await todo.setStatusDone(0);

        console.log("Task is done");
})

task("tasks", "Get the number of tasks from the user") 
    .addParam("contract", "address")
    .addParam("add", "address of user")
    .setAction(async (taskArgs, hre) => {
        const todo = await hre.ethers.getContractAt("TodoList", taskArgs.contract);

        let user = await todo.getUser(taskArgs.add);

        console.log(user); 
})


task("time", "Number of user tasks completed on time",) 
    .addParam("contract", "address") 
    .addParam("id", "task id")
    .setAction(async (taskArgs, hre) => {
        const todo = await hre.ethers.getContractAt("TodoList", taskArgs.contract);

        await todo.setStatusInProgress(0);
        await todo.setStatusDone(0);

        let percent = await todo.taskInTime();

        console.log(Number(percent)/100);
})

