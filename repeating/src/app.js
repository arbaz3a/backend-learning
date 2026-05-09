const express = require("express");
const app = express();
const noteModel = require("./models/note.model");

app.use(express.json());

app.get("/note", async (req, res) => {
  const result = await noteModel.find();
  res.status(200).json({
    message: "note fetch successfully",
    data: result,
  });
});

app.post("/note", async (req, res) => {
  let { title, description } = req.body;
  await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "note created successfully",
  });
});

app.patch("/note/:id", async (req, res) => {
  let id = req.params.id;
  let { title, description } = req.body;
  let data = await noteModel.findOneAndUpdate(
    { _id: id },
    { title, description },
  );

  res.status(201).json({
    message: `note ${id} updated successfully`,
    data: data,
  });
});

app.delete("/note/:id", async (req, res) => {
  let id = req.params.id;
  await noteModel.findOneAndDelete({
    _id: id,
  });

  res.status(201).json({
    message: `note ${id} deleted successfully`,
  });
});

module.exports = app;
