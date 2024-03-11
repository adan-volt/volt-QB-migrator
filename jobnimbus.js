const axios = require('axios');
async function queryJobnimbusRecords(page) {
    const url = `https://app.jobnimbus.com/api1/jobs?from=${page*1000}`;
    const headers = {
      'Authorization': 'Bearer lk000aacoiu0a2qo'
    };
    try {
      const response = await axios.get(url, { headers });
      return response.data.results;
    } catch (error) {
      console.error('Error querying Quick Base records:', error);
      throw error;
    }
}
async function queryJobnimbusRecordsActivities(page) {
    const url = `https://app.jobnimbus.com/api1/activities?from=${page}`;
    const headers = {
      'Authorization': 'Bearer lk000aacoiu0a2qo'
    };
    try {
      const response = await axios.get(url, { headers });
      return response.data.activity;
    } catch (error) {
      console.error('Error querying Quick Base records:', error);
      throw error;
    }
}

module.exports = {queryJobnimbusRecords,queryJobnimbusRecordsActivities};