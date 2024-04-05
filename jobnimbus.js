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

async function queryJobnimbusRecordsWorkOrders(job) {
  // const url = `https://app.jobnimbus.com/api1/activities/${job}?from=${page}`;
  const url = `https://app.jobnimbus.com/api2/workorderlist?jobid=${job}&related=0&_=1710349816599`
  const headers = {
    'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJrZXkiOiJsamVzdmJyNzVtbjgwYndlNHFqNWtodSIsInVzZXJJZCI6ImxqZXN2YnI3NW1uODBid2U0cWo1a2h1IiwiY29tcGFueUlkIjoiM20zenpjIiwiYWNjZXNzIjp7InNldHRpbmdzIjp0cnVlLCJwcml2YXRlRG9jdW1lbnRBY2Nlc3MiOnRydWUsImVuZ2FnZSI6dHJ1ZX0sInNjb3BlIjoiZXN0aW1hdGU6cmVhZCBlc3RpbWF0ZTp3cml0ZSBlc3RpbWF0ZTp1cGRhdGUgZXN0aW1hdGU6ZGVsZXRlIGNlbnRyYWxfZG9jdW1lbnQ6cmVhZCBjZW50cmFsX2RvY3VtZW50OndyaXRlIGNlbnRyYWxfZG9jdW1lbnQ6dXBkYXRlIGNlbnRyYWxfZG9jdW1lbnQ6ZGVsZXRlIHByb3Bvc2FsOnJlYWQgcHJvcG9zYWw6d3JpdGUgcHJvcG9zYWw6dXBkYXRlIHByb3Bvc2FsOmRlbGV0ZSBnbG9iYWw6ZnVsbC1hY2Nlc3MiLCJyb2xlcyI6WyJBY2Nlc3NQcm9maWxlQWRtaW4iXSwiaWF0IjoxNzEwMzA0MjUyLCJqdGkiOiJsdHBhenI2d2g0OW5xbmowIiwiZXhwIjoxNzEwMzU0NjUyfQ.giSP-UvyluCfEF4UyiSRPsLRgCRwjsGn6s-XG21VNM8'
  };
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    console.error('Error querying Quick Base records:', error);
    throw error;
  }
}

module.exports = {queryJobnimbusRecords,
  queryJobnimbusRecordsActivities,
  queryJobnimbusRecordsAttachments,
  queryJobnimbusRecordsPhotos,
  queryJobnimbusRecordsWorkOrders
};