
const Destination = require("../models/Destination");
const User = require("../models/User");
const Trip = require("../models/Trip");

const getAdminStats = async (req, res) => {
  try {
    // Basic statistics
    const [destinationsCount, usersCount, tripsCount] =
      await Promise.all([
        Destination.countDocuments(),
        User.countDocuments(),
        Trip.countDocuments()
      ]);

    // Start of the month, five months ago
    const startDate = new Date();
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);
    startDate.setMonth(startDate.getMonth() - 5);

    // Trips created per month
    const tripsPerMonth = await Trip.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    // Destinations grouped by category
    const destinationsByCategory = await Destination.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    return res.status(200).json({
      destinationsCount,
      usersCount,
      tripsCount,
      tripsPerMonth,
      destinationsByCategory
    });

  } catch (error) {
    console.error("Admin Stats Error:", error);

    return res.status(500).json({
      message: "Failed to fetch dashboard statistics"
    });
  }
};

module.exports = { getAdminStats };
