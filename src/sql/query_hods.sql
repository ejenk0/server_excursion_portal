SELECT
    faculties.faculty_id,
    faculties.name AS "faculty_name",
    teachers.name AS "hod_name",
    teachers.email AS "hod_email"
FROM
    faculties
    JOIN teachers ON faculties.hod_email = teachers.email;

