import { Document, Model } from 'mongoose';

export interface UserInterface {
   username: string;
   phone: string;
   email: string;
   role?: string;
   password: string;
}

export interface UserMethods extends UserInterface, Document {
   isPasswordCorrect: (password: string) => Promise<string>;
   generateAccessToken: () => Promise<string>;
   generateRefreshToken: () => Promise<string>;
   //    generateTemporaryToken: () => Promise<{
   //       unHashedToken: string;
   //       hashedToken: string;
   //       tokenExpiry: string;
   //    }>;
}

export interface UserModal extends Model<UserMethods> {
   isPhoneTaken: (phone: string) => Promise<boolean>;
   isEmailTaken: (email: string) => Promise<boolean>;
}
