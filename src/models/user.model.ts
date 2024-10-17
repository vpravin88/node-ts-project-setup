import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';
import { UserInterface, UserModal } from '../interfaces';
import { config } from '../config';

const userSchema: Schema<UserInterface> = new Schema(
   {
      username: {
         type: String,
         required: true,
         lowercase: true,
         trim: true,
         index: false,
      },
      phone: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         index: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         lowercase: true,
         trim: true,
         index: true,
      },
      role: {
         type: String,
         enum: ['Admin', 'User'],
         default: 'User',
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true },
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
userSchema.pre('save', async function (next: any) {
   if (!this.isModified('password')) return next();
   this.password = await bcrypt.hash(this.password, 10);
   next();
});

userSchema.methods.isPasswordCorrect = async function (password: string) {
   return await bcrypt.compare(password, this.password);
};

userSchema.statics.isPhoneTaken = async function (phone: string) {
   return !!(await this.findOne({ phone }));
};

userSchema.statics.isEmailTaken = async function (email: string) {
   return !!(await this.findOne({ email }));
};

userSchema.methods.generateAccessToken = function () {
   return jwt.sign(
      {
         _id: this._id,
         phone: this.phone,
         username: this.username,
         role: this.role,
      },
      config.ACCESS_TOKEN_SECRET as string,
      { expiresIn: config.ACCESS_TOKEN_EXPIRY },
   );
};

userSchema.methods.generateRefreshToken = function () {
   return jwt.sign(
      {
         _id: this._id,
      },
      config.REFRESH_TOKEN_SECRET as string,
      { expiresIn: config.REFRESH_TOKEN_EXPIRY },
   );
};

// userSchema.methods.generateTemporaryToken = function () {
//    const unHashedToken = crypto.randomBytes(20).toString('hex');
//    const hashedToken = crypto.createHash('sha256').update(unHashedToken).digest('hex');
//    const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

//    return { unHashedToken, hashedToken, tokenExpiry };
// };

const User = mongoose.model<UserInterface, UserModal>('User', userSchema);
export default User;
