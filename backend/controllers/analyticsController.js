const Project = require('../models/Project');
const Invoice = require('../models/Invoice');
const Feedback = require('../models/Feedback');

const getAnalyticsData = async (req, res) => {
  try {
    // Aggregate data to get analytics
    const projectCount = await Project.countDocuments();
    const invoiceData = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$amount' },
          averageInvoiceAmount: { $avg: '$amount' },
        },
      },
    ]);
    const feedbackCount = await Feedback.countDocuments();

    // Construct analytics response
    const analyticsResponse = {
      projectCount,
      totalRevenue: invoiceData[0].totalRevenue,
      averageInvoiceAmount: invoiceData[0].averageInvoiceAmount,
      feedbackCount,
    };

    res.status(200).json({
      success: true,
      message: 'Analytics data retrieved successfully',
      data: analyticsResponse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve analytics data',
      error: error.message,
    });
  }
};

module.exports = {
  getAnalyticsData,
};