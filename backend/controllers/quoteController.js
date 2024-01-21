const Quote = require('../models/Quote');
const { getMaterialPrices } = require('../utils/marketApi'); // Assuming this utility is for fetching current market prices
const { generateMaterialList } = require('../utils/gpt4Helper');

const quoteController = {
  // Handler to fetch current material prices and generate a quote
  getMaterialPrices: async (req, res) => {
    try {
      const prices = await getMaterialPrices();
      res.json(prices);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching material prices', error });
    }
  },

  // Handler to create a new quote in the database
  createQuote: async (req, res) => {
    try {
      const { projectDetails } = req.body;
      const materialsList = await generateMaterialList(projectDetails);
      const prices = await getMaterialPrices();
      const quoteData = calculateQuote(materialsList, prices);

      const newQuote = new Quote(quoteData);
      await newQuote.save();

      res.status(201).json(newQuote);
    } catch (error) {
      res.status(500).json({ message: 'Error creating quote', error });
    }
  },

  // Handler to retrieve a specific quote by ID
  getQuoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const quote = await Quote.findById(id);
      if (!quote) {
        return res.status(404).json({ message: 'Quote not found' });
      }
      res.json(quote);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving quote', error });
    }
  },

  // Handler to update a quote
  updateQuote: async (req, res) => {
    try {
      const { id } = req.params;
      const { projectDetails } = req.body;
      const materialsList = await generateMaterialList(projectDetails);
      const prices = await getMaterialPrices();
      const quoteData = calculateQuote(materialsList, prices);

      const updatedQuote = await Quote.findByIdAndUpdate(id, quoteData, { new: true });
      if (!updatedQuote) {
        return res.status(404).json({ message: 'Quote not found' });
      }
      res.json(updatedQuote);
    } catch (error) {
      res.status(500).json({ message: 'Error updating quote', error });
    }
  },

  // Handler to delete a quote
  deleteQuote: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedQuote = await Quote.findByIdAndDelete(id);
      if (!deletedQuote) {
        return res.status(404).json({ message: 'Quote not found' });
      }
      res.json({ message: 'Quote deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting quote', error });
    }
  }
};

// Helper function to calculate quote based on materials list and prices
function calculateQuote(materialsList, prices) {
  // Implement the logic to calculate the quote based on materialsList and prices
  // This is a placeholder function body
  return {
    // ...calculated quote data
  };
}

module.exports = quoteController;