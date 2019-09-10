
import mongoose from 'mongoose';

//Defined Schema
const Schema = mongoose.Schema({
    start_time: Date,
    end_time: Date,
    call_stack: Array
});

let Session = mongoose.model('Session', Schema);

//Model Functions
Session.getAll = () => Session.find({});

export default Session;