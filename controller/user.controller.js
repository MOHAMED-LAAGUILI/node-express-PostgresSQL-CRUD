import { userModel } from "../db/postgres.js";
import { isValidEmail } from "../helper/EmailValidate.js";

export const getUsersDataController = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await userModel.findAll();

    // Check if no users were found
    if (users.length === 0) {
      return res.status(200).json({
        message: "Users Not Found",
        success: true,
        error: false,
      });
    }

    // Return users data if found
    return res.status(200).json({
      message: "All Users Fetched",
      success: true,
      error: false,
      count: users.length,
      data: users,
    });
  } catch (e) {
    // Catch any error and return a 500 status
    console.error(e); // Optional: log the error for easier debugging
    res.status(500).json({
      message: e.message || "Internal server error in [getUsersDataController]",
      success: false,
      error: true,
    });
  }
};

export const addUserController = async (req, res) => {
    try {
      const { name, email, designation } = req.body;
  
      // Basic validation for required fields
      if (!name || !email || !designation) {
        return res.status(400).json({
          message: "Name, email, and designation are required fields",
          success: false,
          error: true,
        });
      }
  
      // Validate email format
      if (!isValidEmail(email)) {
        return res.status(400).json({
          message: "Invalid email format",
          success: false,
          error: true,
        });
      }
  
      // Validate name length (at least 3 characters long, for example)
      if (name.length < 3) {
        return res.status(400).json({
          message: "Name must be at least 3 characters long",
          success: false,
          error: true,
        });
      }
  
      // Check if the user already exists by email
      const existingUser = await userModel.findOne({ where: { email } });
  
      if (existingUser) {
        return res.status(400).json({
          message: "A user with this email already exists",
          success: false,
          error: true,
        });
      }
  
      // Create a new user record
      const newUser = await userModel.create({
        name,
        email,
        designation,
      });
  
      // Return success response with the newly created user data
      return res.status(201).json({
        message: "User Added Successfully",
        success: true,
        error: false,
        data: newUser, // Return the new user's data
      });
    } catch (e) {
      // Catch any error and return a 500 status
      console.error(e); // Optional: log the error for easier debugging
      return res.status(500).json({
        message: e.message || "Internal server error in [addUserController]",
        success: false,
        error: true,
      });
    }
  };

export const updateUserController = async (req, res) => {
    try {
      const { userid } = req.params; // Get user ID from URL params
      const { name, email, designation } = req.body; // Get new user data from request body
  
      // Check if required fields are provided
      if (!name || !email || !designation) {
        return res.status(400).json({
          message: "Name, email, and designation are required fields",
          success: false,
          error: true,
        });
      }
  
      // Validate email format
      if (!isValidEmail(email)) {
        return res.status(400).json({
          message: "Invalid email format",
          success: false,
          error: true,
        });
      }
  
      // Validate name length
      if (name.length < 3) {
        return res.status(400).json({
          message: "Name must be at least 3 characters long",
          success: false,
          error: true,
        });
      }
  
      // Check if the user exists
      const user = await userModel.findByPk(userid); // Find user by primary key (id)
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
          error: true,
        });
      }
  
      // Check if the email is already taken by another user
      const existingUser = await userModel.findOne({ where: { email } });
      if (existingUser && existingUser.id !== userid) {
        return res.status(400).json({
          message: "A user with this email already exists",
          success: false,
          error: true,
        });
      }
  
      // Update user directly using `update` method
      const [updatedRows] = await userModel.update(
        { name, email, designation }, // New values
        { where: { id: userid } } // Condition to match the correct user
      );
  
      if (updatedRows === 0) {
        return res.status(400).json({
          message: "Failed to update the user. Please try again.",
          success: false,
          error: true,
        });
      }
  
      // Return success response with the updated data
      return res.status(200).json({
        message: "User updated successfully",
        success: true,
        error: false,
        data: { id: userid, name, email, designation }, // Return the updated data
      });
  
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: e.message || "Internal server error in [updateUserController]",
        success: false,
        error: true,
      });
    }
  };

export const deleteUserController = async (req, res) => {
    try {
      const { userid } = req.params; // Get user ID from URL params
  
      // Check if the user exists
      const user = await userModel.findByPk(userid); // Find user by primary key (id)
      if (!user) {
        return res.status(404).json({
          message: "User not found",
          success: false,
          error: true,
        });
      }
  
      // Delete the user
      await userModel.destroy({
        where: { id: userid }, // Specify the user to delete by ID
      });
  
      // Return success response
      return res.status(200).json({
        message: "User deleted successfully",
        success: true,
        error: false,
      });
  
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        message: e.message || "Internal server error in [deleteUserController]",
        success: false,
        error: true,
      });
    }
  };