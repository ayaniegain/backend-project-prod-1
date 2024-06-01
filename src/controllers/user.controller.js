import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }

  let existingUser =await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(409, "existing user");
  }

  const avatarlocalPath = req.files?.avatar[0].path;
  const coverImagelocalPath = req.files?.coverImage[0].path;
  
  if (!avatarlocalPath) {
    throw new ApiError(409, "avatar localpath required ");
  }
  
  const avatar = await uploadOnCloudinary(avatarlocalPath);
  const coverImage = await uploadOnCloudinary(coverImagelocalPath);
  
  if (!avatar) {
    throw new ApiError(409, "avatar required ");
  }

 let user= await User.create(
   { 
      fullName,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
      email,
      password,
      username: username.toLowerCase()

   });

   const createdUser = await User.findById(user._id).select("-password -refreshToken")

console.log("createdUser",createdUser)
   if(!createdUser){
    throw new ApiError(500, "something went wrong while new user create ");

   }
   return res.status(201).json(
      new ApiResponse(201,createdUser,"user registered successfully")
   )



});

export { registerUser };
