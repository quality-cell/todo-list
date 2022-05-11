import { expect, use } from "chai";
import { ethers, waffle } from "hardhat";

import { prepareTodoList, prepareSigners } from "./utils/prepareTodo";

describe("todo", function () {
    beforeEach(async function () {
        await prepareSigners(this)
        await prepareTodoList(this, this.bob)

    });

    it("Create task && Delete task", async function () {
        await this.todo.setTask("Покушать", 1);

        const signer = await this.bob.getAddress();
        let task = await this.todo.getTask(0, signer);

        expect(task.name).to.be.eq('Покушать');

        await this.todo.setStatusInProgress(0);
        await this.todo.setStatusDone(0);
        await this.todo.deleteTask(0);

        task = await this.todo.getTask(0, signer);

        expect(task.isDeleted).to.be.true;
    });

    it("Change status", async function () {
        await this.todo.setTask("Покушать", 1);

        const signer = await this.bob.getAddress();
        let task = await this.todo.getTask(0, signer);

        expect(task.statusTask).to.be.eq(1);

        await this.todo.setStatusInProgress(0);

        task = await this.todo.getTask(0, signer);

        expect(task.statusTask).to.be.eq(3);

        await this.todo.setStatusDone(0);

        task = await this.todo.getTask(0, signer);

        expect(task.statusTask).to.be.eq(4);
    });

    it("Get all tasks", async function () {
        await this.todo.setTask("Сходить в магазин", 1);
        await this.todo.setTask("Сделать уроки", 3);
        await this.todo.setTask("Перекреститься", 5);
        await this.todo.setTask("Смотреть новости", 10);
        await this.todo.setTask("Покушать", 1);

        let tasks = [];
        const signer = await this.bob.getAddress();
        let user = await this.todo.getUser(signer);

        for (let i = 0; i < user; i++) {
            let task = await this.todo.getTask(i, signer);
            tasks[i] = task;
        }
        
        expect(tasks.length).to.be.eq(user);
    });

    it("Task in Time", async function () {
        await this.todo.setTask("Сходить в магазин", 1);
        await this.todo.setTask("Сделать уроки", 3);
        await this.todo.setTask("Перекреститься", 5);
        await this.todo.setTask("Смотреть новости", 10);
        await this.todo.setTask("Покушать", 1);
        
        const signer = await this.bob.getAddress();
        let task = await this.todo.getTask(0, signer);

        await this.todo.setStatusInProgress(0);
        await this.todo.setStatusDone(0);

        task = await this.todo.getTask(0, signer);

        let percent = await this.todo.taskInTime();

        expect(Number(percent / 100)).to.be.lessThanOrEqual(100);
    });

    it("Test for event 'UserTask'", async function () {
        const connectedContract = this.todo.connect(this.bob);
        await connectedContract.setTask("Покушать", 1);

        await expect(
            connectedContract.setTask("Покушать", 1)
        ).to.emit(this.todo, 'UserTask').withArgs(
            await this.bob.getAddress(),
            "Покушать",
            1
        );
    });

    it("Test for event 'DeleteTask'", async function () {
        const connectedContract = this.todo.connect(this.bob);
        await connectedContract.setTask("Покушать", 1);

        await connectedContract.setStatusInProgress(0);
        await connectedContract.setStatusDone(0);
        await connectedContract.deleteTask(0);

        await expect(
            connectedContract.deleteTask(0)
        ).to.emit(this.todo, 'DeleteTask').withArgs(
            await this.bob.getAddress(),
            "Покушать",
            0
        );
    });
});