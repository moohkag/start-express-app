// // require Mongoose
// const mongoose = require("mongoose");

// // assign Mongoose schema
// const Schema = mongoose.Schema;

// const productModel = new Schema(
//   {
//     product_name: {
//       type: String,
//       required: true,
//     },
//     product_id: {
//       type: String,
//       required: true,
//     },
//     product_detail: {
//       type: String,
//       required: true,
//     },
//     product_type: {
//       type: String,
//       required: false,
//     },
//     pricing_level: {
//       type: Number,
//       required: false,
//     },
//   },
//   {
//     timestamps: true,
//     versionKey: false,
//   }
// );

// // mongoose.model(<CollectionName>, <CollectionSchema>);
// module.exports = mongoose.model("publications", productModel);
