import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const addressSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  }
});

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    phone:{
      type: String,
      required: true,
    },
    role:{
      type: String,
      value: "user"
    },
    password: {
      type: String,
      required: true,
    },
    fullAddress: {
      type: addressSchema,
      required: true,
    }
  },
  {timestamps: true,}
);

// password encryption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// password decryption
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30m",
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "30d" ,
    }
  );
};

export const User = mongoose.model("User", userSchema);

