const express = require("express"),
  router = express.Router();

//const db = require("../db");

const service = require("../services/meeting.service");

// http://localhost:3000/api/meetings/
router.get("/", async (req, res) => {
  const meetings = await service.getAllMeetings();
  res.send(meetings);
});

router.get("/:id", async (req, res) => {
  const meeting = await service.getAllMeetingById(req.params.id);
  if (meeting == undefined)
    res.status(404).json("no record with given id: " + req.params.id);
  else res.send(meeting);
});

router.delete("/:id", async (req, res) => {
  const affectedRow = await service.deleteMeeting(req.params.id);
  if (affectedRow == 0)
    res.status(404).json("no record with given id: " + req.params.id);
  else res.send("deleted successfully");
});

router.post("/", async (req, res) => {
  await service.addOrEditMeeting(req.body);
  res.status(201).send("created successfully");
});

router.put("/:id", async (req, res) => {
  const affectedRow = await service.addOrEditMeeting(req.body, req.params.id);
  if (affectedRow == 0)
    res.status(404).json("no record with given id: " + req.params.id);
  else res.send("updated successfully");
});

module.exports = router;
