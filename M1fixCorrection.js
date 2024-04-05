const axios = require('axios');
const { queryQuickBaseRecords,saveQuickBaseRecords } = require('./quickbase.js');
const {queryJobnimbusRecords} = require('./jobnimbus.js');
  
function transformDataClients(data,qb,ipt) {
    const transformedData = { data: [{}] };
    const index = qb.findIndex(d=>d[451].value == data['jnid']);
    if(index == -1){
        return false;
    }
    
    // if(!qb[index]['220'].value){
    //     return false;
    // }
    
    // const cashflowIndex = cashflow.findIndex(d=>d[15].value == qb[index][3].value && d[6].value == 'Instance 1.0');
    // if(cashflowIndex != -1){
    //     console.log('No matchea');
    //     return false;
    // }
    
    // console.log("payment method",qb[index]['85'].value);
    // if(qb[index]['85'].value != 15){
    //     return false;
    // }
    //A partir de aca no hay repetidos de M1 (jobs SIN M1)
    const iptIndex = ipt.findIndex(d=>d[10].value == qb[index][3].value);
    if(iptIndex != -1){
        transformedData.data[0][120] = {"value":ipt[iptIndex][21].value?.email??null};    
        transformedData.data[0][127] = {"value":ipt[iptIndex][28].value?.email??null};    
    }
    // transformedData.data[0][3] = {"value":cashflow[cashflowIndex][15].value}; //Si vos mandas el registro 3, hace un UPDATE en vez del INSERT
    // transformedData.data[0][8] = {"value":(cashflow[cashflowIndex][8].value+' | '+data['Applied in']).replace('| undefined','')};
    transformedData.data[0][115] = {"value":qb[index][3].value};

    return transformedData.data[0];
  }
  (async () => {
    try {
        // Call the function with the provided data and mapping
        const j1 = await queryJobnimbusRecords(0);
        const j2 = await queryJobnimbusRecords(1);
        const jnJobs = [...j1, ...j2]; // Assuming you only want the first record combined from both queries
        const qb = await queryQuickBaseRecords('btq2f4rea',[3,451,220,85]); //JOBS
        const ipt = await queryQuickBaseRecords('btugpbcwf',[10,21,28]); //cashflow
        // Use Promise.all to wait for all transformations and save operations to complete
        
        // console.log(cashflow.filter(d=>d[6].value == 'M3'))

        let transformedAll = [];
            jnJobs.map(async (job) => {
              const transformed = transformDataClients(job,qb,ipt);
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
          const save = await saveQuickBaseRecords('btsmhsnch', transformedAll); // Insert job
          console.log(save.metadata.lineErrors);

    } catch (error) {
        // Catch and log any error that occurs during the entire process
        console.error("An error occurred:", error);
    }
})();
