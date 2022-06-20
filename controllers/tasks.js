import Task from "../models/Task.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks }); // here {tasks} = {tasks : tasks} (ES6 feature)
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params; // deconstructing to get id from params url
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // if id does not match
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  //Update will take three parameters 1 -> filter 2-> values to be changed
  // 3-> options ::  2-> this is req.body as we provide new json only as input to the updateOneAndDelete (look in PostMan) :: 3-> These are neccessay as if we don't use them there will be two bugs a-> it wil return the old task not the updated one b-> The validators on the json schema will not run . ex name which is set to required will have no significance and an object with no name field will be accepted as input json (which should not be)
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({ task });
});
export { getAllTasks, getTask, updateTask, deleteTask, createTask };
