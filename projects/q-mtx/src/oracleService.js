// services/oracleService.js
import axios from 'axios';

class OracleService {
    async fetchData(query) {
        try {
            const response = await axios.post('https://oracle.example.com/api', { query });
            return response.data;
        } catch (error) {
            console.error('Error fetching data from oracle:', error);
            throw new Error('Oracle fetch failed');
        }
    }
}

export default new OracleService();
