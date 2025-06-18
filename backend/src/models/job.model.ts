import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Job {
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  requirement: string;
  @Prop()
  salary: string;
  @Prop()
  location: string;
  @Prop()
  jobType: string;
  @Prop()
  position: string;
  @Prop({ ref: 'Company' })
  company: mongoose.Schema.Types.ObjectId;
  @Prop({ ref: 'User' })
  created_by: mongoose.Schema.Types.ObjectId;
  @Prop({ ref: 'Application' })
  applications: [{ type: mongoose.Schema.Types.ObjectId }];
}

export const JobSchema = SchemaFactory.createForClass(Job);
