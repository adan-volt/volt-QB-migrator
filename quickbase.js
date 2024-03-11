const axios = require('axios');
async function queryQuickBaseRecords(from, select) {
    const url = 'https://api.quickbase.com/v1/records/query';
    const headers = {
        'QB-Realm-Hostname': 'voltsolarenergy.quickbase.com',
        'Authorization': 'QB-USER-TOKEN b82m74_qp67_0_cncqa3ccbhtn9aci8a4hutw99gz'
    };

    const body = {
        from: from,
        select: select
    };

    try {
        const response = await axios.post(url, body, { headers });
        return response.data.data;
    } catch (error) {
        console.error('Error querying Quick Base records:', error);
        throw error;
    }
}

async function saveQuickBaseRecords(to, data) {
    const url = 'https://api.quickbase.com/v1/records';
    const headers = {
        'QB-Realm-Hostname': 'voltsolarenergy.quickbase.com',
        'Authorization': 'QB-USER-TOKEN b82m74_qp67_0_cncqa3ccbhtn9aci8a4hutw99gz'
    };

    const body = {
        to: to,
        data: data
    };

    try {
        const response = await axios.post(url, body, { headers });
        return response.data;
    } catch (error) {
        console.error('Error querying Quick Base records:', error);
        throw error;
    }
}
module.exports = {
    queryQuickBaseRecords,saveQuickBaseRecords
}