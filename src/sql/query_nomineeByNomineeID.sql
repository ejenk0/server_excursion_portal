SELECT
    nominees.nominee_id,
    nominees.contact_email,
    nominees.name
FROM
    nominees
WHERE
    nominees.nominee_id = $1;

