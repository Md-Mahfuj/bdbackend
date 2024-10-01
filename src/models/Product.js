const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema(
  {
    createdAt: { type: Date, default: Date.now },
    name: {
      type: String,
      // required: true,
    },
    images: {
      type: [String], // Array of image URLs or paths
      // required: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    hostedBy: {
      type: String,
      // required: true,
    },
    category: {
      type: String,
      enum: ["Icons", "Rooms", "Countryside", "Lake"],
      // required: true,
    },
    typeOfPlace: {
      type: String,
      enum: ["Any type", "Room", "Entire home"],
      // required: true,
    },

    elements: {
      bedrooms: {
        type: Number,
      },
      beds: {
        type: Number,
      },
      bathrooms: {
        type: Number,
      },
      guests: {
        type: Number,
      },
    },
    bookingOptions: {
      type: String,
      // required: true,
    },
    propertyType: {
      type: String,
      enum: ["House", "Apartment", "Guesthouse", "Hotel"],
      // required: true,
    },
    hostLanguage: {
      type: String,
      enum: ["Chinese", "English", "German", "Italian"],
      // required: true,
    },
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", PropertySchema);

module.exports = Property;
