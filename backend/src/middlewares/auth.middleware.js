import { User } from "../models/user.models.js";
import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";


//verify the token 
export const verifyJWT = asyncHandler(async (req, res, next) => {
  console.log("Verifying JWT..");
  
  const token = req.cookies?.accessToken ||req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    console.log("Invalid token..");
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Token valid,Finding user based on the user id .");
    console.log("User_id",decodedToken._id);
    
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
    );
    
    
    if (!user) {
      console.log("user not found with this access token.");
      throw new ApiError(401, "Invalid access token");
    }
    console.log("User found ");
    //change the req user obj with db user obj
    req.user = user;
    next();
    
  } catch (error) {
    console.log("Invalid token...");
    
    throw new ApiError(401, "Invalid user");
  }
});

// export const validateProjectPermission = (roles = []) => {
//   asyncHandler(async (req, res, next) => {
//     const { projectId } = req.params;

//     if (!projectId) {
//       throw new ApiError(400, "project id is missing");
//     }

//     const project = await ProjectMember.findOne({
//       project: new mongoose.Types.ObjectId(projectId),
//       user: new mongoose.Types.ObjectId(req.user._id),
//     });

//     if (!project) {
//       throw new ApiError(400, "project not found");
//     }

//     const givenRole = project?.role;

//     req.user.role = givenRole;

//     if (!roles.includes(givenRole)) {
//       throw new ApiError(
//         403,
//         "You do not have permission to perform this action",
//       );
//     }

//     next();
//   });
// };
