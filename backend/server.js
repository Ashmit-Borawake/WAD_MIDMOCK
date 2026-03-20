const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DATABASE_URL)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

const Project = require("./Models/Project");

app.post("/projects", async (req, res) =>
{
    const project = new Project(req.body);
    await project.save();
    res.json(project);
});

app.get("/projects", async (req, res) =>
{
    const data = await Project.find();
    res.json(data);
});

app.put("/projects/:id", async (req, res) =>
{
    const updated = await Project.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status },
        { new: true }
    );
    res.json(updated);
});

app.delete("/projects/:id", async (req, res) =>
{
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted" });
});

app.listen(3000, () =>
{
    console.log("Server running on port 3000");
});