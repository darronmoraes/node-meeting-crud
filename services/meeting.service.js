const db = require("../db");

module.exports.getAllMeetings = async () => {
  const [rows] = await db // destructure 'row' using [] i.e. [row]
    .query("SELECT * FROM meeting");
  //.then((data) => res.send(data[0]))
  //.catch((err) => console.log(err)); // not required if we have global error handler in index.js
  //res.send("list of meetings");
  return rows;
};

module.exports.getAllMeetingById = async (id) => {
  const [[record]] = await db // destructure 'row' using [] i.e. [row]
    .query("SELECT * FROM meeting WHERE id = ?", [id]);
  return record;
};

module.exports.deleteMeeting = async (id) => {
  //const [record] = await db // destructure 'row' using [] i.e. [row]
  //.query("DELETE FROM meeting WHERE id = ?", [id]);
  //return record.affectedRows;
  // or use this destructuring of object
  const [{ affectedRows }] = await db // destructure 'row' using [] i.e. [row]
    .query("DELETE FROM meeting WHERE id = ?", [id]);
  return affectedRows;
};

module.exports.addOrEditMeeting = async (obj, id = 0) => {
  //const [record] = await db // destructure 'row' using [] i.e. [row]
  //.query("DELETE FROM meeting WHERE id = ?", [id]);
  //return record.affectedRows;
  // or use this destructuring of object
  const [[[{ affectedRows }]]] = await db // destructure 'row' using [] i.e. [row]
    .query("CALL meeting_insert_or_edit(?,?,?,?,?,?)", [
      id,
      obj.org_name,
      obj.meet_room_name,
      obj.meet_owner,
      obj.start_date_time,
      obj.end_date_time,
    ]);
  return affectedRows;
};
