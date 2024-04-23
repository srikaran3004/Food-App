const restaurantModel = require("../models/restaurantModel");

// CREATE RESTURANT
const createRestaurantController = async (req, res) => {
    try {
        const {
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        } = req.body;
        // Validation
        if (!title || !coords) {
            return res.status(500).send({
                success: false,
                message: "Please provide title and address",
            });
        }
        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords,
        });

        await newRestaurant.save();

        res.status(201).send({
            success: true,
            message: "New Restaurant Created successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In creating Restaurant api",
            error,
        });
    }
};

// GET ALL RESTAURANT
const getAllRestaurantController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({});
        if (!restaurants) {
            return res.status(404).send({
                success: false,
                message: "No Restaurant Availible",
            });
        }
        res.status(200).send({
            success: true,
            totalCount: restaurants.length,
            restaurants,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In Get ALL Restaurant API",
            error,
        });
    }
};

// GET RESTAURANT BY ID
const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "Please Provide Restaurant ID",
            });
        }
        //Find Restaurant
        const restaurant = await restaurantModel.findById(restaurantId);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: "No restaurant found",
            });
        }
        res.status(200).send({
            success: true,
            restaurant,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting Restaurant by Id API",
            error,
        });
    }
};

//DELETE RESTAURANT
const deleteRestaurantController = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        if (!restaurantId) {
            return res.status(404).send({
                success: false,
                message: "No Restaurant Found OR Provide Resturant ID",
            });
        }
        await restaurantModel.findByIdAndDelete(restaurantId);
        res.status(200).send({
            success: true,
            message: "Restaurant Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Eror in delete restaurant api",
            error,
        });
    }
};

module.exports = {
    createRestaurantController,
    getAllRestaurantController,
    getRestaurantByIdController,
    deleteRestaurantController,
};
