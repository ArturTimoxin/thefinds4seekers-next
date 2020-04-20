import * as bcrypt from 'bcrypt';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: String,
  password: {
    type: String,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  firstname: String,
  lastname: String,
  phone: String,
  registeredAt: { type: Date, default: Date.now },
  avatar: String,
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});
