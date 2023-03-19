/* eslint-disable no-unused-vars */
const Tour = require("../model/toursModel");

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   // eslint-disable-next-line no-console
//   console.log(`Tours id is :${val}`);
//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       massage: "Invalid ID",
//     });
//   }
//   next();
// };

exports.getAlltours = async (req, res) => {
  // eslint-disable-next-line no-console
  try {
    //BUILD QUERY
    // 1A)Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //1B) Advanced filtering
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    console.log(JSON.parse(queryStr));

    // {difficulty : 'easy',duration:{$gte: 5}}
    //{ difficulty: 'easy', duration: { gte: '5'} }
    //gte, gt, lte, lt

    let query = Tour.find(JSON.parse(queryStr));

    //2)Sorting
    if (req.query.sort) {
      const SortBy = req.query.sort.split(",").join(" ");
      console.log(SortBy);
      query = query.sort(req.query.sort);
      // sort('price ratingsAverage)
    }

    //EXECUTE QUERY
    const tours = await query;

    // const query = await Tour.find()
    //   .where("duration")
    //   .equals(5)
    //   .where("difficulty")
    //   .equals("easy");

    //SEND RESPONE
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
exports.getTours = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.CreateTours = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
  // const newTour = new Tour({});
  // newTour.save();
};

exports.updateTours = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

exports.deleteTours = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
      message: "null",
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// eslint-disable-next-line no-unused-expressions
module.exports;
