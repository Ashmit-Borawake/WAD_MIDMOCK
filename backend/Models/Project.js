const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
{
    projectName: String,
    studentName: String,
    technology: String,
    status: String,
    date: String
});

module.exports = mongoose.model("Project", projectSchema);