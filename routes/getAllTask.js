const express = require("express");
const router = express.Router();
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
router.get("/getAllTask/:email", async function (req, res) {
    try {
        let data = await readFile(path.resolve('data', 'user.json'),{encoding: "utf-8"});
        let taskData = JSON.parse(data);
        let newData = await readFile(path.resolve('data', 'usertodo.json'),{encoding: "utf-8"});
        let todoTask = JSON.parse(newData);
        let email = req.params.email;
        let ref = false;
        let allTask = [];
        taskData.forEach((ele) => {
            if (email === ele.email) {
                let userId = ele.user_id;
                ref = true;
                todoTask.forEach((ele) => {
                    if (userId === ele.user_id) {
                        let todo = ele.todos;
                        todo.forEach((ele) => {
                            allTask.push(ele.task);
                        })
                    }
                })
            }
        });
        if (!ref) {
            throw new Error("Invalid Email")
        }else{
            res.send(allTask);
        }
    }
    catch (err) {
        res.status(500).send("Internal Server Error Or Invalid Email");
        console.error(err);
    }
});

module.exports = router;