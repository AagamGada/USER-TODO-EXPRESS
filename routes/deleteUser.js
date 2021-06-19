const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
router.delete("/deleteUser/:email", async function (req, res) {
    try{
        let email = req.params.email;
        let data  = await fs.readFile(path.resolve('data', 'user.json'));
        let taskData = JSON.parse(data);
        let todoData  = await fs.readFile(path.resolve('data', 'usertodo.json'));
        let newData = JSON.parse(todoData);
        let isExists = false;
            taskData.forEach((item, index) => {
                if (item.email === email) {
                    taskData.splice(index, 1);
                    isExists = true;
                    let userId = item.user_id;
                    newData.forEach((item,index) => {
                        if(item.user_id === userId){
                            newData.splice(index, 1);
                        }
                    })
                }
            });
            // res.send(taskData);
            if (!isExists) {
                throw new Error("Invalid Email")
            }
            await fs.writeFile(path.resolve('data', 'user.json'), JSON.stringify(taskData))
            await fs.writeFile(path.resolve('data', 'usertodo.json'), JSON.stringify(newData))
            res.send("User Deleted Successfully");
    }
    catch(err){
        res.status(500).send("Internal Server Error Or Invalid Email");
        console.log(err);
    }
});
module.exports = router;

// const express = require("express");
// const router = express.Router();
// const fs = require("fs").promises;
// const path = require("path");
// router.delete("/deleteUser", async function (req, res) {
//     try{

//     }
//     catch(err){
//         res.status(500).send("Internal Server Error");
//         console.log(err);
//     }
// });
// module.exports = router;