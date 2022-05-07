SELECT
    nominees.nominee_id,
    nominees.contact_email,
    nominees.name
FROM
    nominees
    JOIN nominees_programs ON nominees.nominee_id = nominees_programs.nominee_id
WHERE
    nominees_programs.program_id = $1
ORDER BY
    nominees.name;

