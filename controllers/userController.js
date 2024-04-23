const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');

//GET USER INFO
const getUserController = async (req, res) => {
    try {
        // Finding User
        const user = await userModel.findById({ _id: req.body.id });
        //Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found",
            });
        }
        //Hinde password
        user.password = undefined;
        //resp
        res.status(200).send({
            success: true,
            message: "User Data get Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Get User API",
            error,
        });
    }
};

//UPDATE USER
const updateUserController = async (req, res) => {
    try {
        // Find user
        const user = await userModel.findById({ _id: req.body.id });
        //Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        //Update
        const { userName, address, phone } = req.body;
        if (userName) user.userName = userName;
        if (address) user.address = address;
        if (phone) user.phone = phone;
        //Save user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User data updated sucessfully",
        });
    } catch (error) {
        console.log(erorr);
        res.status(500).send({
            success: false,
            message: "Error in udpating User API",
            error,
        });
    }
};

//UPDATE USER PASSWORD
const updatePasswordController = async (req, res) => {
    try {
        //Find user
        const user = await userModel.findById({ _id: req.body.id });
        //Valdiation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Usre Not Found",
            });
        }
        // GET data from User
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            return res.status(500).send({
                success: false,
                message: "Please Provide Old or New PasswOrd",
            });
        }
        //Check user password  | compare password
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(500).send({
                success: false,
                message: "Invalid old password",
            });
        }
        //Hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Updated!",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Password Update API",
            error,
        });
    }
};

//RESET PASSWORD
const resetPasswordController = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;
        if (!email || !newPassword || !answer) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields",
            });
        }
        const user = await userModel.findOne({ email, answer });
        if (!user) {
            return res.status(500).send({
                success: false,
                message: "User not found or Provide a valid answer",
            });
        }
        //Hashing password
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(200).send({
            success: true,
            message: "Password Reset Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in PASSWORD RESET API",
            error,
        });
    }
};

//DELETE PROFILE || ACCOUNT
const deleteProfileController = async (req, res) => {
    try {
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true,
            message: "Your account has been successfully deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Deleting Profile API",
            error,
        });
    }
};

module.exports = { getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController };

