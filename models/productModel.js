const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  make: {
    type: String,
    required: [true, "Please Enter Make Of Car"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Please Enter Model Of Car"],
    trim: true,
  },
  varient: {
    type: String,
    required: [true, "Please Enter Variet Of Car"],
  },
  luggage: {
    type: String,
    required: [true, "Please Enter Luggage Of Car"],
  },
  engine: {
    type: String,
    required: [true, "Please Enter Engine Of Car"],
  },
  mileage: {
    type: String,
    required: [true, "Please Enter Mileage Of Car"],
  },
  ecomony: {
    type: String,
    required: [true, "Please Enter Ecomony Of Car"],
  },
  exterior: {
    type: String,
    required: [true, "Please Enter exterior Of Car"],
  },
  interior: {
    type: String,
    required: [true, "Please Enter interior Of Car"],
  },
  location: {
    type: String,
    required: [true, "Please Enter location Of Car"],
  },
  address: {
    type: String,
    required: [true, "Please Enter address Of Car"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  contact: {
    type: Number,
    required: [true, "Please Enter Contact#"],
  },
  description: {
    type: String,
    required: [true, "Please Enter product Description"],
  },

  isApproved: {
    type: Boolean,
    default: false,
  },
  // ratings: {
  //   type: Number,
  //   default: 0,
  // },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  // Stock: {
  //   type: Number,
  //   required: [true, "Please Enter product Stock"],
  //   maxLength: [4, "Stock cannot exceed 4 characters"],
  //   default: 1,
  // },
  // numOfReviews: {
  //   type: Number,
  //   default: 0,
  // },
  // reviews: [
  //   {
  //     user: {
  //       type: mongoose.Schema.ObjectId,
  //       ref: "User",
  //       required: true,
  //     },
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);