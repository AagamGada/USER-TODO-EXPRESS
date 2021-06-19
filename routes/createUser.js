// const express = require("express");
// const router = express.Router();
// const fs = require("fs").promises;
// const path = require("path");
// const { v4: uuidv4 } = require('uuid');
// const util = require('util');
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// router.post("/createUser/:email/:name", async function (req, res) {
//     try {
//         let fileData = await readFile(path.resolve('data', 'user.json'))
//         let data = JSON.parse(fileData.toString());
//         let result = data.filter(item => item.email === email);
//         if (result.length !== 0) {
//             throw new Error("Email Already Exists");
//         }
//         else {
//             var newId = uuidv4();
//             let newUser = { email: req.params.email, name: req.params.name, user_id: newId };
//             data.push(newUser);
//         }
//         let todoData = await readFile(path.resolve('data', 'usertodo.json'))
//         let newTodo = JSON.parse(todoData.toString());
//         let newData = { user_id: newId, todos: [] };
//         newTodo.push(newData);
//         await writeFile(path.resolve('data', 'user.json'), JSON.stringify(data))
//         await writeFile(path.resolve('data', 'usertodo.json'), JSON.stringify(newTodo))
//         console.log("User Added Successfully");
//     }
//     catch (err) {
//         res.status(500).send("Internal Server Error");
//         console.error(err);
//     }
// });
// module.exports = router;
// router.get("/createUser/:email/:name", async function (req, res) {
//     try {
//       const filePath = path.join(__dirname, "../", "data", "user.json");
//       const todo = await fs.readFile(filePath, { encoding: "utf-8" });
//       res.status(200).send(todo);
//     } catch (err) {
//       res.status(500).send("Internal Server Error");
//       console.log(err);
//     }
//   });

// const express = require("express");
// const router = express.Router();
// const fs = require("fs").promises;
// const path = require("path");
// const { v4: uuidv4 } = require('uuid');
// const util = require('util');
// const readFile = util.promisify(fs.readFile);
// const writeFile = util.promisify(fs.writeFile);
// router.post("/createUser",express.json(), async function (req, res) {
//     try {
//         console.log(req.body);
//         let info = req.body;
//         console.log(info.email);
//         const filePath = path.join(__dirname, "../", "data", "user.json");
//         let fileData = await readFile(filePath, { encoding: "utf-8" })
//         res.status(200).send(fileData);
//         let data = JSON.parse(fileData.toString());
//         console.log(data);
//         let result = data.filter(item => item.email === info.email);
//         if (result.length !== 0) {
//             throw new Error("Email Already Exists");
//         }
//         else {
//             var newId = uuidv4();
//             // let newUser = { email: req.params.email, name: req.params.name, user_id: newId };
//             info.user_id = newId;
//             data.push(info);
//         }
//         let todoData = await readFile(path.resolve('data', 'usertodo.json'))
//         let newTodo = JSON.parse(todoData.toString());
//         let newData = { user_id: newId, todos: [] };
//         newTodo.push(newData);
//         await writeFile(path.resolve('data', 'user.json'), JSON.stringify(data))
//         await writeFile(path.resolve('data', 'usertodo.json'), JSON.stringify(newTodo))
//         console.log("User Added Successfully");
//     }
//     catch (err) {
//         res.status(500).send("Internal Server Error");
//         console.error(err);
//     }
// });
// module.exports = router;

const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
router.post("/createUser", express.json(), async function (req, res) {
    try {
        let info = req.body;
        const filePath = path.join(__dirname, "../", "data", "user.json");
        let fileData = await fs.readFile(filePath, { encoding: "utf-8" })
        let data = JSON.parse(fileData.toString());
        let result = data.filter(item => item.email === info.email);
        if (result.length !== 0) {
            throw new Error("Email Already Exists");
        }
        else {
            var newId = uuidv4();
            info.user_id = newId;
            data.push(info);
        }
        let todoData = await fs.readFile(path.resolve('data', 'usertodo.json'))
        let newTodo = JSON.parse(todoData.toString());
        let newData = { user_id: newId, todos: [] };
        newTodo.push(newData);
        await fs.writeFile(path.resolve('data', 'user.json'), JSON.stringify(data))
        await fs.writeFile(path.resolve('data', 'usertodo.json'), JSON.stringify(newTodo))
        res.send("User Added Successfully");
    } catch (err) {
        res.status(500).send("Internal Server Error Or Email Already Exists");
        console.log(err);
    }
});
module.exports = router;
