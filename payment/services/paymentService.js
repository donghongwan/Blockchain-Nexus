const Payment = require('../models/paymentModel');
const Transaction = require('../models/transactionModel');
const WalletUtils = require('../utils/walletUtils');

exports.processPayment = async (paymentData) => {
    // Logic to process payment
    const payment = new Payment(paymentData);
    await payment.save();
    
    // Call wallet utility to handle payment
    const transactionHash = await WalletUtils.handlePayment(payment);
    
    const transaction = new Transaction({
        paymentId: payment._id,
        transactionHash: transactionHash,
        status: 'completed'
    });
    await transaction.save();
    
    return { message: 'Payment processed successfully', transaction };
};
