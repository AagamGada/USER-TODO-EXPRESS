const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
router.post("/createTask/:email", express.json(), async function (req, res) {
    try{
        let email = req.params.email;
        let fileData = await fs.readFile(path.resolve('data', 'user.json'));
        let data = JSON.parse(fileData.toString());
        let todoData = await fs.readFile(path.resolve('data', 'usertodo.json'));
        let newData = JSON.parse(todoData.toString());
        let ref = false;
        data.forEach((ele) => {
            if (email == ele.email) {
                // let task = readline.question(`Enter The Task:`);
                let task = req.body;
                let userId = ele.user_id;
                ref = true;
                newData.forEach((ele) => {
                    if (userId === ele.user_id) {
                        let store = ele.todos;
                        // let newTask = { id: uuidv4(), task: task };
                        task.id = uuidv4();
                        store.push(task);
                    }
                })
                // res.send(newData);
            }
        });
        await fs.writeFile(path.resolve('data', 'usertodo.json'), JSON.stringify(newData))
        if (!ref) {
            throw new Error("Invalid Email");
        }else{
            res.send("Task Created Successfully");
        }
    }
    catch(err){
        res.status(500).send("Internal Server Error Or Invalid Email");
        console.log(err);
    }
});
module.exports = router;