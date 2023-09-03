const axios = require('axios');
// async function fetchData() {
//     try {
//       const response = await axios.get('http://localhost:3000/1/plus/1');
//       return response.data;
//     } catch (error) {
//       throw error;
//     }
//   }

// Jest test suite
describe('API Tests', () => {
  
    // Test case 1: Testing status code
    it('should return a status code of 200', async () => {
        const response = await axios.get('http://localhost:3000/');
        expect(response.status).toBe(200);
    });
  
    // Test case 2: Testing the data structure
    it('should have expected properties in the data', async () => {
        const response = await axios.get('http://localhost:3000/');
        const data = await response.data;
        expect(data[0]).toHaveProperty('getReq');
        expect(data[0]).toHaveProperty('question');
        expect(data[0]).toHaveProperty('answer');
    });

    // Test case 3: Testing if the API returns correct data
    it('should return correct data from the API', async () => {
        const response = await axios.get('http://localhost:3000/1');
        expect(response.data).toStrictEqual({"question":"1","answer":1});
    });

    // Test case 4: Testing if the API returns correct data
    it('should return correct data from the API', async () => {
        const response = await axios.get('http://localhost:3000/3/divide/3/plus/2/into');
        expect(response.data).toStrictEqual({"question":"3/3+2*1","answer":3});
    });
  });
  