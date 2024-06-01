import { asyncHandler } from "../utils/asyncHandeler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";


const generateAccessAndRefreshToken=async(userId)=>{
    try {
      const user =await User.findById(userId)
      const accessToken= user.generateAccessToken()
      const refreshToken= user.generateRefreshToken()

      user.refreshToken=refreshToken
      user.save({validateBeforeSave: false})

      return {accessToken,refreshToken}
    } catch (error) {
      throw new ApiError(500,"Something went wrong while generating refresh and access token")
    }
}



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

  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
      coverImageLocalPath = req.files.coverImage[0].path
  }
  

  if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)
  
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

   if(!createdUser){
    throw new ApiError(500, "something went wrong while new user create ");

   }
   return res.status(201).json(
      new ApiResponse(201,createdUser,"user registered successfully")
   )



});

const loginUser= asyncHandler(async(req,res)=>{

  const {email,username,password}=req.body
  
  if (!username || !gmail) {
    throw new ApiError(400, "username or email is required");
  }

  let user =await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, " user does not existing");
  }

  let isPasswordValid=await user.isPasswordCorrect(password)

  
  if (!isPasswordValid) {
    throw new ApiError(401, " Invalid user credentials");
  }

   const {refreshToken,accessToken}=await generateAccessAndRefreshToken(user._id)

   const loggedInUser= await User.findById(user._id).select("-password -refreshToken")

   const option ={
    httpOnly :true,
    secure :true
   }

   return res.status(200)
   .cookie("accessToken", accessToken,option)
   .cookie("reFreshToken",refreshToken, op)
   .json(
    new ApiResponse(
      200,
      {
        user: loggedInUser, accessToken , refreshToken
      },
      "User logged in successfully"
    )
   )


})

export { registerUser,loginUser  };
