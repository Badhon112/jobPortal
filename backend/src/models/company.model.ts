import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

Schema({ timestamps: true });
export class Company {
  @Prop()
  name: string;
  @Prop()
  description: string;
  @Prop()
  website: string;
  @Prop()
  location: string;
  @Prop()
  logo: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Schema.Types.ObjectId;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
