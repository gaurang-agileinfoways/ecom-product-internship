import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { now } from 'mongoose';
import { Roles } from 'src/roles/enums/roles.enum';

@Schema()
export class Users {
  _id: string;

  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({ required: true, unique: true })
  user_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  phone: number;

  @Prop({ required: true })
  gender: boolean;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: String, enum: Roles }], default: Roles.USER })
  roles: string;

  @Prop({ default: now() })
  createdAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(Users);
