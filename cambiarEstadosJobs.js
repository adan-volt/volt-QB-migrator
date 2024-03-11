const axios = require('axios');
const { queryQuickBaseRecords,saveQuickBaseRecords } = require('./quickbase.js');
const {queryJobnimbusRecords} = require('./jobnimbus.js');
  
function transformDataClients(data,qb) {
    const transformedData = { data: [{}] };
    const index = qb.findIndex(d=>d[451].value == data['jnid']);
    transformedData.data[0][3] = {"value":qb[index][3].value};
    transformedData.data[0][38] = {"value":"Waiting for NTP or Site Survey to be completed"};
    transformedData.data[0][39] = {"value":"Not Started"};
    transformedData.data[0][40] = {"value":"Not Started"};
    
    return transformedData.data[0];
  }
  (async () => {
    try {
        // Call the function with the provided data and mapping
        const j1 = await queryJobnimbusRecords(0);
        const j2 = await queryJobnimbusRecords(1);
        const jnJobs = [...j1, ...j2].filter(d=>[89,452,454,458].includes(d.status)); // Assuming you only want the first record combined from both queries

        console.log(jnJobs.length);
        const qb = await queryQuickBaseRecords('btq2f4rea',[3,451]);
        // Use Promise.all to wait for all transformations and save operations to complete
        
        let transformedAll = [];
            jnJobs.map(async (job) => {
              const transformed = transformDataClients(job,qb);
              transformedAll.push(transformed);
              // if (transformed[6]) {
              //     console.log(transformed);
              //     return saveQuickBaseRecords('btq2f4rcs', [transformed]); // Insert job
              // } else {
              //     // Handle the case where transformation returns null or undefined
              //     console.log("Transformation returned no result for job:", job['jnid']);
              //     return null;
              // }
          });
          // console.log(transformedAll);
          // const save = await saveQuickBaseRecords('btq2f4rea', transformedAll); // Insert job
          // console.log(save);

    } catch (error) {
        // Catch and log any error that occurs during the entire process
        console.error("An error occurred:", error);
    }
})();
