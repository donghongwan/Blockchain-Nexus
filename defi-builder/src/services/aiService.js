// src/services/aiService.js
import axios from 'axios';

const AI_API_URL = 'https://api.example.com/ai'; // Replace with your actual AI API endpoint

export const predictPrice = async (tokenSymbol) => {
    try {
        const response = await axios.post(`${AI_API_URL}/predict-price`, { tokenSymbol });
        return response.data;
    } catch (error) {
        console.error('Error predicting price:', error);
        throw new Error('Failed to predict price');
    }
};

export const assessRisk = async (userBehaviorData) => {
    try {
        const response = await axios.post(`${AI_API_URL}/assess-risk`, { userBehaviorData });
        return response.data;
    } catch (error) {
        console.error('Error assessing risk:', error);
        throw new Error('Failed to assess risk');
    }
};

export const analyzeUser Behavior = async (userId) => {
    try {
        const response = await axios.get(`${AI_API_URL}/analyze-user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error analyzing user behavior:', error);
        throw new Error('Failed to analyze user behavior');
    }
};
