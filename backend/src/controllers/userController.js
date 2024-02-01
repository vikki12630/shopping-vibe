import { User } from "../models/userModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.refreshToken) {
    throw new ApiError(401, "unauthorized");
  }
  const refreshToken = cookies.refreshToken;

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken?._id);

  if (!user) {
    throw new ApiError(401, "invalid refresh token");
  }

  const accessToken = user.generateAccessToken();

  return res.status(201).json(new ApiResponse(200, accessToken));
});

// register

const register = asyncHandler(async (req, res) => {
  const {
    email,
    name,
    lastname,
    phone,
    password,
    country,
    state,
    city,
    address,
    pincode,
  } = req.body;

  if (
    !email ||
    !name ||
    !lastname ||
    !phone ||
    !password ||
    !country ||
    !state ||
    !city ||
    !address ||
    !pincode
  ) {
    throw new ApiError(400, "all feilds required");
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(401, "user already exist with this email");
  }

  const user = await User.create({
    email,
    name,
    lastname,
    phone,
    password,
    fullAddress: {
      country,
      state,
      city,
      address,
      pincode,
    },
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new ApiError(500, "unable to register");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
    // sameSite: "None",
  };

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { createdUser, accessToken },
        "user created successfully"
      )
    );
});

// login

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "all feilds required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "user not found");
  }
  const verifyUser = await user.isPasswordCorrect(password);

  if (!verifyUser) {
    throw new ApiError(403, "invalid email or password");
  }

  const signedInUser = await User.findById(user._id).select("-password");

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // secure: true,
    // sameSite: "None",
  };

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { signedInUser, accessToken },
        "user loggedin successfully"
      )
    );
});

//  logout

const logout = asyncHandler(async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refreshToken) {
    throw new ApiError(400, "no refresh token");
  }
  const options = {
    httpOnly: true,
  };

  return res
    .status(201)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "cookie ckear"));
});


export {
  refresh,
  register,
  login,
  logout,
}
