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

async function queryJobnimbusRecordsAttachments(page) {
  const url = `https://app.jobnimbus.com/api1/files?from=${page*1000}`;
  const headers = {
    'Authorization': 'Bearer lk000aacoiu0a2qo'
  };
  try {
    const response = await axios.get(url, { headers });
    return response.data.files;
  } catch (error) {
    console.error('Error querying Quick Base records:', error);
    throw error;
  }
}

async function queryJobnimbusRecordsPhotos(page) {
  const url = `https://app.jobnimbus.com/api1/files?from=${page*1000}`;
  const headers = {
    'Authorization': 'Bearer lk000aacoiu0a2qo'
  };
  try {
    const response = await axios.get(url, { headers });
    console.log("response",response)
    return response.data.files;
  } catch (error) {
    console.error('Error querying Quick Base records:', error);
    throw error;
  }
}

async function queryJobnimbusRecordsActivities(job) {
    // const url = `https://app.jobnimbus.com/api1/activities/${job}?from=${page}`;
    const url = `https://app.jobnimbus.com/api2/v2/jobs/${job}/related-activities?related=0&_=1710184802192`
    const headers = {
      'Authorization': 'Bearer lk000aacoiu0a2qo'
    };
    try {
      const response = await axios.get(url, { headers });
      return response.data.ActivityInfoList;
    } catch (error) {
      console.error('Error querying Quick Base records:', error);
      throw error;
    }
}

module.exports = {queryJobnimbusRecords,
  queryJobnimbusRecordsActivities,
  queryJobnimbusRecordsAttachments,
  queryJobnimbusRecordsPhotos
};