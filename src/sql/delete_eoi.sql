DELETE FROM nominees_programs
WHERE nominee_id = $1
    AND program_id = $2
