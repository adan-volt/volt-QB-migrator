const axios = require('axios');
const { queryQuickBaseRecords,saveQuickBaseRecords } = require('./quickbase.js');
const {queryJobnimbusRecords, queryJobnimbusRecordsWorkOrders} = require('./jobnimbus.js');
  
function transformDataClients(data,qb,tableSecondary,contractors,wo) {
    const transformedData = { data: [{}] };
    const index = qb.findIndex(d=>d[451].value == data['jnid']);
    // console.log(qb[index][3].value);
    if(index == -1){
        return false;
    }
    
    const roofIndex = tableSecondary.findIndex(d=>d[14].value == qb[index][3].value && d[6].value == 'Smart House Service');
    if(roofIndex == -1){
        return false;
    }
    if(!wo){
        return false;
    }
    
    const workOrderSelected = wo.find(d=>d['record_type_name'] == 'Aditional Services');
    
    if(!workOrderSelected){
        return false;
    }
    // console.log(workOrderSelected);
    let additionalServiceStatus = workOrderSelected.status_name
    let roofingStatus;
    switch(additionalServiceStatus){
        case 'Completed':
                roofingStatus = 'Completed';
        break;
        case 'Backlog':
                roofingStatus = 'Not Started'
        break;
        case 'To Do':
            roofingStatus = 'Scheduling'
        break;
        case 'Scheduled':
                roofingStatus = 'Scheduled'
        break;
        case 'In progress':
            roofingStatus = 'In progress'
        break;
        case 'Cancelled':
            roofingStatus = 'Cancelled'
        break;
    }
    if([111,110].includes(data['status'])){
        roofingStatus = 'Cancelled';
    }
    transformedData.data[0][13] = {"value":roofingStatus};
    transformedData.data[0][3] = {"value":tableSecondary[roofIndex][3].value};
    
    // console.log(transformedData.data[0]);
    return transformedData.data[0];
  }
  (async () => {
    try {
        // Call the function with the provided data and mapping
        const j1 = await queryJobnimbusRecords(0);
        const j2 = await queryJobnimbusRecords(1);
        
        const jnJobs = [...j1, ...j2]; // Assuming you only want the first record combined from both queries
        const qb = await queryQuickBaseRecords('btq2f4rea',[3,451]); //JOBS
        const additionalServices = await queryQuickBaseRecords('btre7uajj',[3,14,15,6,8]); //additional services
        const contractors = await queryQuickBaseRecords('bttcwtntt',[3,6]);
        // Use Promise.all to wait for all transformations and save operations to complete
        
        // console.log(cashflow.filter(d=>d[6].value == 'M3'))

        let transformedAll = [];
        for (let i=0;i<jnJobs.length;i++){
            const job = jnJobs[i]
              const wo = await queryJobnimbusRecordsWorkOrders(job['jnid']);

              const transformed = transformDataClients(job,qb,additionalServices,contractors,wo);
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
        }
        //   console.log(transformedAll);
          const save = await saveQuickBaseRecords('btre7uajj', transformedAll); // Insert job
          console.log(save.metadata.lineErrors);

    } catch (error) {
        // Catch and log any error that occurs during the entire process
        console.error("An error occurred:", error);
    }
})();
