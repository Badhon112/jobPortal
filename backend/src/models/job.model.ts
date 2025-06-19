import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Job {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop({ type: Array })
  requirement: [string];
  @Prop()
  salary: string;
  @Prop()
  location: string;
  @Prop()
  jobType: string;
  @Prop()
  experience: string;
  @Prop()
  position: string;
  @Prop({ ref: 'Company' })
  company: mongoose.Schema.Types.ObjectId;
  @Prop({ ref: 'User' })
  created_by: mongoose.Schema.Types.ObjectId;
  @Prop({
    ref: 'Application',
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  })
  applications: mongoose.Schema.Types.ObjectId[];
}

export const JobSchema = SchemaFactory.createForClass(Job);
