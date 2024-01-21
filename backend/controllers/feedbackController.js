const Feedback = require('../models/Feedback');
const mongoose = require('mongoose');

const submitFeedback = async (req, res) => {
    const { projectId, userId, content } = req.body;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid project ID.' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID.' });
    }

    try {
        const newFeedback = new Feedback({
            project: projectId,
            user: userId,
            content: content,
            date: new Date()
        });

        await newFeedback.save();

        res.status(201).json({ message: FEEDBACK_RECEIVED, feedback: newFeedback });
    } catch (error) {
        res.status(500).json({ message: 'Error submitting feedback.', error: error.message });
    }
};

const getFeedbackByProject = async (req, res) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        return res.status(400).json({ message: 'Invalid project ID.' });
    }

    try {
        const feedbacks = await Feedback.find({ project: projectId });

        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback.', error: error.message });
    }
};

module.exports = {
    submitFeedback,
    getFeedbackByProject
};