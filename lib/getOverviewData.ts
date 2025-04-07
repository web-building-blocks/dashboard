// import { connectToDatabase } from "./mongodb";
// import { subMonths, startOfMonth } from "date-fns";

// export async function getOverviewData() {
//   const db = await connectToDatabase();
//   const collection = db.collection("dashboard"); 

//   const end = new Date();
//   const start = subMonths(end, 11); 

//   const results = await collection.aggregate([
//     {
//       $match: {
//         createdAt: {
//           $gte: startOfMonth(start),
//           $lte: end,
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
//         total: { $sum: "$amount" },
//       },
//     },
//     {
//       $sort: { _id: 1 },
//     },
//   ]).toArray();

//   return results.map((item) => ({
//     name: item._id,
//     total: item.total,
//   }));
// }
