import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phoneNumber: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['student', 'recruiter'] })
  role: string;

  @Prop({
    type: {
      bio: { type: String },
      skill: { type: String },
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
      profilePhoto: { type: String, default: '' },
    },
    _id: false,
  })
  profile: {
    bio?: string;
    skill?: string;
    resume?: string;
    resumeOriginalName?: string;
    company?: mongoose.Schema.Types.ObjectId;
    profilePhoto?: string;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
