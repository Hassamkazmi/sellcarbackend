const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Admin = require("../models/Admin");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary").v2;
const fs = require("fs/promises");
const path = require("path");
async function deleteAllFilesInDir(dirPath) {
  try {
    const files = await fs.readdir(dirPath);

    const deleteFilePromises = files.map((file) =>
      fs.unlink(path.join(dirPath, file))
    );

    await Promise.all(deleteFilePromises);
  } catch (err) {
    console.log(err);
  }
}

async function uploadAndSaveImages(imageFiles) {
  try {
    const uploadPromises = imageFiles.map((imageFile) =>
      cloudinary.uploader.upload(imageFile.path)
    );

    const uploadedImages = await Promise.all(uploadPromises);

    const imagesToSave = uploadedImages.map((uploadedImage) => ({
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url
    }));

    deleteAllFilesInDir("./uploads").then(() => {
      console.log("Removed all files from the specified directory");
    });
    console.log(imagesToSave)
    return imagesToSave;
  } catch (error) {
    console.error("Error uploading and saving images:", error);
    throw error;
  }
}

// Register a Admin
exports.registerAdmin = catchAsyncErrors(async (req, res, next) => {
  
  const { email,password } = req.body;

  const admin = await Admin.create({
    email,
    password,
  });

  sendToken(admin, 201, res);
  // res.status(200).json({
  //   success: true,
  //   abc: req.files
  // });
});

// Login Admin
exports.loginAdmin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if Admin has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const admin = await Admin.findOne({ email }).select("+password");

  if (!admin) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await admin.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendToken(admin, 200, res);
});


