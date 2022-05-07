INSERT INTO nominees (contact_email, name)
    VALUES ($1, $2)
RETURNING
    nominee_id;

