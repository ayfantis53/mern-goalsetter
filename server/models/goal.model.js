// npm installs
import mongoose from "mongoose";


/** -------------------------------------------------------------------------------------------
 *  All Goal schema for Mongo
 ** ----------------------------------------------------------------------------------------- */

// assign the Mongoose Schema constructor function and create a new schema object.
const goalSchema = mongoose.Schema({
    user: {
        type:     mongoose.Schema.Types.ObjectId,
        required: true,
        ref:      'User'
    },
    text: {
        type:     String,
        required: [true, 'Please add a text value'],
    }
}, {
    timestamps:   true,
});

// create a model using schema definition.
const Goal = mongoose.model('Goal', goalSchema);


// Default exports used because we are exporting a single primary Object from this module.
export default Goal;