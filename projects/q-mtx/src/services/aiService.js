// services/aiService.js
import axios from 'axios';

class AIService {
    async requestData(query) {
        try {
            const response = await axios.post('https://ai-oracle.example.com/api', { query });
            return response.data;
        } catch (error) {
            console.error('Error fetching data from AI service:', error);
            throw new Error('AI service fetch failed');
        }
    }
}

export default new AIService();
