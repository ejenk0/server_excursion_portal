-- tic_emails, tic_names and year_levels in the resulting table may contain more than
-- one concatenated entry. Each entry is seperated by ", ".
SELECT
    programs.program_id,
    programs.name AS "program_name",
    yr_lvls.year_levels,
    programs.event_type,
    programs.term,
    programs.cost,
    programs.location,
    programs.pre_requisite,
    fac.name AS "faculty_name",
    hod.email AS "hod_email",
    hod.name AS "hod_name",
    tic.email AS "tic_emails",
    tic.name AS "tic_names",
    programs.details,
    programs.consolidating_features
FROM
    programs
    JOIN faculties AS "fac" ON programs.faculty_id = fac.faculty_id
    JOIN teachers AS "hod" ON fac.hod_email = hod.email
    JOIN (
        SELECT
            programs_tic.program_id,
            string_agg(tic_email, ', ') AS "email",
            string_agg(name, ', ') AS "name"
        FROM
            programs_tic
            JOIN teachers ON tic_email = email
        GROUP BY
            programs_tic.program_id) AS "tic" ON tic.program_id = programs.program_id
    JOIN (
        SELECT
            programs_yr_lvl.program_id,
            string_agg(CAST(programs_yr_lvl.yr_lvl AS varchar), ', ') AS "year_levels"
        FROM
            programs_yr_lvl
        GROUP BY
            programs_yr_lvl.program_id) AS "yr_lvls" ON yr_lvls.program_id = programs.program_id
WHERE
    programs.program_id = $1
