import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name : {
        type : String,
        required: [true, "Name must be provided"],
        trim: true,
        maxlength : [20, "length can not be more than 20"]
    },
    completed : {
        type : Boolean,
        required : false
    }
})

export default mongoose.model('Task', taskSchema)