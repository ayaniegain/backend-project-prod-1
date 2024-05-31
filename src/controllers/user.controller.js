import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudenary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const registerUser = asyncHandler(async (req, res) => {
  const { fullName, username, email, password } = req.body;

  console.log("fullName", fullName);
  console.log("username", username);
  console.log("email", email);
  console.log("password", password);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }

  let existingUser = User.findOne({
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

  const avatar = await uploadOnCloudenary(avatarlocalPath);
  const coverImage = await uploadOnCloudenary(coverImagelocalPath);

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

   let createdUser= await User.findById(user._id).select(-password -refreshToken)

   if(!createdUser){
    throw new ApiError(500, "something went wrong while new user create ");

   }

   return res.status(201).json(
      new ApiResponse(200,createdUser,"user registered successfully")
   )



  res.send("okey");
});

export { registerUser };
