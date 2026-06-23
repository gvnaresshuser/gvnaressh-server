import * as userService from "../services/userService.js";

export const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
};

export const getUser = async (req, res) => {
  const user = await userService.getUserById(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};

export const addUser = async (req, res) => {
     console.log(req.body);
  const user = await userService.createUser(req.body);

  res.status(201).json({
    success: true,
    data: user,
  });
};

export const editUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
};

export const removeUser = async (req, res) => {
  const user = await userService.deleteUser(req.params.id);

  res.status(200).json({
    success: true,
    data: user,
  });
};
