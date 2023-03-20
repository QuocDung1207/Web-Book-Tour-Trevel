// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    requied: [true, "A tours must have  name"],
    unique: true,
  },
  duration: {
    type: Number,
    requied: [true, "A tour must have a duration"],
  },
  maxGroupSize: {
    type: Number,
    requied: [true, "A tour must have a group size"],
  },
  difficulty: {
    type: String,
    requied: [true, "A tour must have a difficulty"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  retingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    requied: [true, "A tour must have a price"],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: [true, "A tour must have a description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    requied: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
