const axios = require('axios');
const { queryQuickBaseRecords,saveQuickBaseRecords } = require('./quickbase.js');
const {queryJobnimbusRecords} = require('./jobnimbus.js');
  
function transformDataClients(data,qb) {
    
    const transformedData = { data: [{}] };
    const index = qb.findIndex(d=>d[451].value == data['jnid']);
    if(index == -1){
        return false;
    }
    // if(qb[index][27].value.email != 'im@voltsolarenergy.com'){
    //     return false;
    // }
    transformedData.data[0][3] = {"value":qb[index][3].value};
    
    // if(nameToEmailMap[data['Project Manager']] == undefined){
    //     return false;
    // }
    // transformedData.data[0][27] = {"value":nameToEmailMap[data['Project Manager']]};
    console.log(data['HOA'])
    if(data['HOA'] == 'Yes'){
        return false;
    }
    transformedData.data[0][103] = {"value":false};
    transformedData.data[0][104] = {"value":'Not Started'};

    return transformedData.data[0];
  }
  (async () => {
    try {
        // Call the function with the provided data and mapping
        const j1 = await queryJobnimbusRecords(0);
        const j2 = await queryJobnimbusRecords(1);
        const jnJobs = [...j1, ...j2]; // Assuming you only want the first record combined from both queries

        
        const qb = await queryQuickBaseRecords('btq2f4rea',[3,451,27]);
        // Use Promise.all to wait for all transformations and save operations to complete
        
        let transformedAll = [];
            jnJobs.map(async (job) => {
              const transformed = transformDataClients(job,qb);
              if(transformed){
                transformedAll.push(transformed);
              }
              
              // if (transformed[6]) {
              //     console.log(transformed);
              //     return saveQuickBaseRecords('btq2f4rcs', [transformed]); // Insert job
              // } else {
              //     // Handle the case where transformation returns null or undefined
              //     console.log("Transformation returned no result for job:", job['jnid']);
              //     return null;
              // }
          });
          console.log(transformedAll);
          const save = await saveQuickBaseRecords('btq2f4rea', transformedAll); // Insert job
          console.log(save);

    } catch (error) {
        // Catch and log any error that occurs during the entire process
        console.error("An error occurred:", error);
    }
})();
