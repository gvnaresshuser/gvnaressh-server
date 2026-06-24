import pool from "../db.js";

// Get All Users
export const getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY id");

  return result.rows;
};

// Get User By Id
export const getUserById = async (id) => {
  const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

  return result.rows[0];
};

// Create User
export const createUser = async ({
  name,
  email,
  mobile,
  collegeOrCompany,
  profession,
  interestedCourses,
}) => {
  const result = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      mobile,
      college_or_company,
      profession,
      interested_courses
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
    `,
    [
      name,
      email,
      mobile,
      collegeOrCompany,
      profession,
      interestedCourses, // Array
    ],
  );

  return result.rows[0];
};

//Update User
export const updateUser = async (
  id,
  { name, email, mobile, collegeOrCompany, profession, interestedCourses },
) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = $1,
      email = $2,
      mobile = $3,
      college_or_company = $4,
      profession = $5,
      interested_courses = $6
    WHERE id = $7
    RETURNING *
    `,
    [
      name,
      email,
      mobile,
      collegeOrCompany,
      profession,
      interestedCourses, // Array
      id,
    ],
  );

  return result.rows[0];
};

// Delete User
export const deleteUser = async (id) => {
  const result = await pool.query(
    `
    DELETE FROM users
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};
