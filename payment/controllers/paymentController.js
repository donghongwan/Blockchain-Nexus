const PaymentService = require('../services/paymentService');

exports.processPayment = async (req, res) => {
    try {
        const paymentData = req.body;
        const result = await PaymentService.processPayment(paymentData);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
