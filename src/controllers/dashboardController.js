const Record = require("../models/Record");

// 🔹 Summary
exports.getSummary = async (req, res) => {
  try {
    const records = await Record.find();

    let income = 0;
    let expense = 0;

    records.forEach(r => {
      if (r.type === "income") income += r.amount;
      else expense += r.amount;
    });

    res.json({
      totalIncome: income,
      totalExpense: expense,
      netBalance: income - expense
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Category-wise summary
exports.getCategorySummary = async (req, res) => {
  try {
    const data = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 Monthly trends
exports.getMonthlyTrends = async (req, res) => {
  try {
    const data = await Record.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔥 🔹 Recent transactions (THIS WAS MISSING)
exports.getRecent = async (req, res) => {
  try {
    const records = await Record.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(records);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};