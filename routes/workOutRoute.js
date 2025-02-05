const express = require("express");

const Work_Out = require("../models/workOutModel");
const { isAuthenticated } = require("../middleware/authMiddleware.js");


router = express.Router();
router.use(isAuthenticated);

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.exercise_title ||
      !request.body.load ||
      !request.body.reps
    ) {
      return response.status(400).send({
        message: "Send all the required fields : exercise_title, load, reps",
      });
    }

    const newWorkout = new Work_Out({
      exercise_title: request.body.exercise_title,
      load: request.body.load,
      reps: request.body.reps,
      userId: request.user.id,
    });

    // Manually set timestamps (if they are not set automatically)
    newWorkout.createdAt = new Date();
    newWorkout.updatedAt = new Date();

    const workout = await newWorkout.save(); // Use save to ensure it's added to the database

    response.status(201).send(workout);
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server error");
  }
});


router.get("/", async (request, response) => {
  try {
    const userId = request.user.id;
    const workouts = await Work_Out.find({ userId });

    response.status(201).send({
      count: workouts.length,
      data: workouts,
    });
  } catch (error) {
    console.error(error);
    response.status(500).send("Internal Server error");
  }
});
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const workout = await Work_Out.findById(id);
    console.log(workout);

    return response.status(201).send(workout);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Updated backend route to match frontend request
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const workout = await Work_Out.findByIdAndDelete(id);

    if (!workout) {
      return response.status(404).send({ message: "Workout not found" });
    }

    return response.status(200).send("Workout successfully deleted");
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: error.message });
  }
});


module.exports = router;
