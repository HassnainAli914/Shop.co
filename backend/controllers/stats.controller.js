const statsModule = require("../modules/stats.module");

exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await statsModule.getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
