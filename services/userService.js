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
}) => {
      console.log({
        name,
        email,
        mobile,
        collegeOrCompany,
        profession,
      });
  const result = await pool.query(
    `
    INSERT INTO users
    (
      name,
      email,
      mobile,
      college_or_company,
      profession
    )
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [name, email, mobile, collegeOrCompany, profession],
  );

  return result.rows[0];
};

// Update User
export const updateUser = async (
  id,
  { name, email, mobile, collegeOrCompany, profession },
) => {
  const result = await pool.query(
    `
    UPDATE users
    SET
      name = $1,
      email = $2,
      mobile = $3,
      college_or_company = $4,
      profession = $5
    WHERE id = $6
    RETURNING *
    `,
    [name, email, mobile, collegeOrCompany, profession, id],
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
