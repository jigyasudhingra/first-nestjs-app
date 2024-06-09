import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import * as mongoose from 'mongoose';
import { Exclude, Transform } from 'class-transformer';

export type UserIdentityDocument = UserIdentity & Document;

@Schema({ timestamps: true })
export class UserIdentity {
  @Exclude()
  _id?: mongoose.Types.ObjectId;

  @Transform(({ value }) => value.toString())
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id: mongoose.Types.ObjectId;

  createdAt: Date;

  updatedAt: Date;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  provider: string;

  @Prop({ required: true })
  providerId: string;

  @Prop(raw({}))
  profile: any;

  @Prop(
    raw({
      accessToken: { type: String },
      refreshToken: { type: String },
    }),
  )
  credentials: { accessToken: string; refreshToken: string };

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  userId?: Types.ObjectId;

  constructor(data?: Partial<UserIdentity>) {
    if (data._id && !data.id) {
      data.id = data._id;
    }
    Object.assign(this, data || {});
  }
}

export const UserIdentitySchema = SchemaFactory.createForClass(UserIdentity);
