# npm packages required

    mysql2
    express
    body-parser
    nodemon
    express-async-errors

# create mysql schema

    schema -> meeting
    fields as mentioned in the documentation

    procedure for insertion and updation
        -> CREATE DEFINER=`root`@`localhost` PROCEDURE `meeting_insert_or_edit`(
            IN _id INT,
            IN _organisation_name TEXT,
            IN _meeting_room_name TEXT,
            IN _meeting_owner TEXT,
            IN _start_time DATETIME,
            IN _end_time DATETIME
            )
            BEGIN
                IF _id = 0 THEN
                    INSERT INTO meeting(organisation_name, meeting_room_name, meeting_owner, start_time, end_time)
                    VALUES (_organisation_name, _meeting_room_name, _meeting_owner, _start_time, _end_time);

                ELSE
                    UPDATE meeting
                    SET organisation_name = _organisation_name,
                    meeting_room_name = _meeting_room_name,
                    meeting_owner = _meeting_owner,
                    start_time = _start_time,
                    end_time = _end_time
                    WHERE id = _id;
                END IF;

                SELECT ROW_COUNT() AS 'affectedRows';
            END

# create folder controllers

# create folder services

# db.js

# index.js
