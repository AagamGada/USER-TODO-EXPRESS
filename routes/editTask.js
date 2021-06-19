const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
router.put("/editTask/:email/:id",express.text(), async function (req, res) {
    try {
        let email = req.params.email;
        let data = await fs.readFile(path.resolve('data', 'user.json'))
        let taskData = JSON.parse(data);
        let newData = await fs.readFile(path.resolve('data', 'usertodo.json'))
        let todoTask = JSON.parse(newData);
        let ref = false;
        taskData.forEach((ele) => {
            if (email === ele.email) {
                ref = true;
                let id = req.params.id;
                let taskContent = req.body;
                let val = false;
                let userId = ele.user_id;
                todoTask.forEach((ele) => {
                    if (userId = ele.user_id) {
                        let todo = ele.todos;
                        todo.forEach((ele) => {
                            if (id === ele.id) {
                                val = true;
                                ele.task = taskContent;
                            }
                        });
                    }
                })
                if (!val) {
                    throw new Error("Invalid Id");
                }
            }
        });
        
        if (!ref) {
            throw new Error("Invalid Email")
        }
        await fs.writeFile(path.resolve('data', 'usertodo.json'), JSON.stringify(todoTask))
        res.send("Task Edited Successfully");
    }
    catch (err) {
        res.status(500).send("Internal Server Error Or Invalid Email or Id");
        console.log(err);
    }
});
module.exports = router;