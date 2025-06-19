import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Company {
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ type: String })
  description: string;
  @Prop({ type: String })
  website: string;
  @Prop({ type: String })
  location: string;
  @Prop({ type: String })
  logo: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
