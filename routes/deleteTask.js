const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
router.delete("/deleteTask/:email/:id", async function (req, res) {
    try{
        let email = req.params.email;
        let data = await fs.readFile(path.resolve('data', 'user.json'))
        let taskData = JSON.parse(data);
        let newData = await fs.readFile(path.resolve('data', 'usertodo.json'))
        let todoData = JSON.parse(newData);
        let ref = false;
        taskData.forEach((ele) => {
            if (email === ele.email) {
                ref = true;
                let id = req.params.id;
                let userId = ele.user_id;
                todoData.forEach((ele) => {
                    if (userId === ele.user_id) {
                        let todo = ele.todos;
                        let result = todo.filter(item => item.id === id);
                        if (result.length === 0) {
                            throw new Error("Invalid id");
                        } else {
                            let index = todo.findIndex(function (data) {
                                return data.id === id;
                            });
                            todo.splice(index, 1)
                        }
                    }
                })
            }
        });
        await fs.writeFile(path.resolve('data', 'usertodo.json'), JSON.stringify(todoData))
        if (!ref) {
            throw new Error("Invalid Email");
        }else{
            res.send("Task Deleted Successfully");
        }
    }
    catch(err){
        res.status(500).send("Internal Server Error Or Invalid Email Or Id");
        console.log(err);
    }
});
module.exports = router;