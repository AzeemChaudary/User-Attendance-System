import mongoose from 'mongoose';

const { Schema } = mongoose;

const attendenceSchema = new Schema({
  myAttendence : {
type :String
  },  // isPresent Leave
  Leave : { 
    type :String
  },
  currentDate :{
    type : Date
  } ,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
  
});

export default mongoose.model('Attendence', attendenceSchema);
