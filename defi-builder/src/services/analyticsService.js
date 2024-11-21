// src/services/analyticsService.js
import axios from 'axios';

export const fetchAnalyticsData = async () => {
    const response = await axios.get('https://api.example.com/analytics');
    return response.data;
};
