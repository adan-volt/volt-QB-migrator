const axios = require('axios');
const { queryQuickBaseRecords,saveQuickBaseRecords } = require('./quickbase.js');
const {queryJobnimbusRecords,queryJobnimbusRecordsActivities} = require('./jobnimbus.js');
const formatDate = (dataValue)=>{
    const date = new Date(dataValue);
    const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}T${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}Z`;
    return formattedDate;
  }
function transformDataClients(data,qb) {
    const nameToEmailMap = {
        "Orlando Andrade": "projectmanagerabundant@gmail.com",
        "Fermin Anzoátegui": "fa@voltsolarenergy.com",
        "Camilo Uribe & Carmen Astudillo": "cu@voltsolarenergy.com",
        "Carmen Astudillo Mendoza": "cam@voltsolarenergy.com",
        "Marcos Balbiani": "mab@voltsolarenergy.com",
        "Martin Barg": "mb@voltsolarenergy.com",
        "Santiago Basombrio": "sbn@voltsolarenergy.com",
        "Gonzalo Basombrio": "gb@voltsolarenergy.com",
        "Denise Beghe": "db@voltsolarenergy.com",
        "Patrick Blanchet": "Patrick@quiqsolar.com",
        "Jonathan Bode": "jonathan@americansol.solar",
        "Leandro Boquet": "cx-sx@trust.solar",
        "Sergio Bruna": "sergio@voltsolarenergy.com",
        "Matias Cabral": "mc@voltsolarenergy.com",
        "Jose Castro": "greenenergyprosllc@gmail.com",
        "Christian Chelius": "chrischelius@aspsuperhome.com",
        "Chris Coldiron": "chris@solarkingofamerica.com",
        "Daren Davis": "ddavis@solarsesame.com",
        "Lazaro Diaz Hernandez": "support@emindedsolutions.com",
        "Yamila Esteban": "ye@voltsolarenergy.com",
        "Alicia Fernandez": "thedreamstyleteam@gmail.com",
        "Jorge Garcia": "jgarcia@energycontrolusa.com",
        "Brian Garcia": "brg@voltsolarenergy.com",
        "Ana Giacobini": "agi@voltsolarenergy.com",
        "Belen Giacobini": "bg@voltsolarenergy.com",
        "Mike Gigena": "mike@voltsolarenergy.com",
        "Taleb Gneiting": "talebearthenergypower@gmail.com",
        "Jose Gobbi": "jg@voltsolarenergy.com",
        "Manuel Gobbi": "mag@voltsolarenergy.com",
        "Julian Gomez": "julian@sunwaysolar.com",
        "John Gonzalez": "sales@glowhaus.us",
        "Sofia Gonzalez Llamazares": "sgl@voltsolarenergy.com",
        "Mitch Griesser": "mitchg@happyenergysolar.com",
        "Manuel Guerrero": "mego2853@gmail.com",
        "Kevin Hardin": "kev@ecostellahome.com",
        "Eliecer Hernandez": "ehbvolt@gmail.com",
        "Alex Hrytsyuk": "smartsolarenergyfl@gmail.com",
        "Dawson Humbert": "dawson@growsolar.us",
        "Juan Hurtado": "jh@voltsolarenergy.com",
        "Eduardo Iudica": "ei@voltsolarenergy.com",
        "Sayuri Izquierdo": "sayuri@voltsolarenergy.com",
        "Will Jimenez": "will@genxcsolar.com",
        "Rocio Juarez": "rj@voltsolarenergy.com",
        "Gilberto Leon": "Info@pgsolarsolutions.com",
        "Martina Limia": "m.limia@voltsolarenergy.com",
        "Manuela Lopez Bernabo": "ml@voltsolarenergy.com",
        "Lucas Manresa": "lm@voltsolarenergy.com",
        "Jorge Marcano": "jfm@voltsolarenergy.com",
        "Paula Martinez": "pm@voltsolarenergy.com",
        "Inaki Martinez": "im@voltsolarenergy.com",
        "Marcelo Martinez de Guerenu": "mmg@voltsolarenergy.com",
        "Andres Martinez Marti": "amm@voltsolarenergy.com",
        "Tomas Matozza": "tm@voltsolarenergy.com",
        "Mike Mazanowski": "mjmazanowski44@gmail.com",
        "Catalina Medina": "cm@voltsolarenergy.com",
        "Nicolas Mihura": "nm@voltsolarenergy.com",
        "Maria Mihura": "mm@voltsolarenergy.com",
        "Robert Monegro": "rm@voltsolarenergy.com",
        "Orlando Monterrosa": "info@besolarpower.com",
        "Carlos Morales": "shaunduffus@gmail.com",
        "Jose Andres Morejon": "jm@voltsolarenergy.com",
        "Letyi Moreu": "Youwvolt@gmail.com",
        "Jhoann Murillo": "info@isolar.energy",
        "Maria Nazar": "mn@voltsolarenergy.com",
        "Jonas Occeus": "volt@dynastysolarpwr.com",
        "Jeniree Ochoa": "jo@voltsolarenergy.com",
        "Francisco Ojeda": "fo@voltsolarenergy.com",
        "Homei Okanishi": "voltsolarenergy@mindful.solar",
        "Sunbright Ops": "orianna@sunbrightsolarusa.com",
        "Tomas Papini": "tp@voltsolarenergy.com",
        "Lina Patino": "Lina@americansolsolutions.com",
        "Felicitas Perez del Cerro": "fpdc@Voltsolarenergy.com",
        "Agustin Peyloubet": "ap@voltsolarenergy.com",
        "Francisco Pisani": "fpi@Voltsolarenergy.com",
        "Nicholas Pueyo": "np@voltsolarenergy.com",
        "Jhon Quijada": "Jhon+1@safeinnovationdb.com",
        "Sofia Quintero": "sq@voltsolarenergy.com",
        "Celina Racedo": "cer@voltsolarenergy.com",
        "Dave Reinke": "dr@voltsolarenergy.com",
        "Jorge Reveron": "Info@skyguardsolar.com",
        "Nacho Richards": "nr@voltsolarenergy.com",
        "Tatiana Rueda": "operations@proctorway.com",
        "Gustavo Santos": "gus@happyenergysolar.com",
        "Guadalupe Servetto": "gs@voltsolarenergy.com",
        "Julio Servetto": "jsd@voltsolarenergy.com",
        "Ben Servetto": "bs@voltsolarenergy.com",
        "Albert and Steven SOLAR PRIME": "sb@voltsolarenergy.com",
        "Lucas Sproul": "lucas.sproul@valencesolar.com",
        "Conserva Team": "scheduling@conserva.care",
        "Volt Test": "monitoring@voltsolarenergy.com",
        "Diego Torres Aguero": "dta@voltsolarenergy.com",
        "Sebastian Uribe": "su@voltsolarenergy.com",
        "Pedro Uribelarrea": "pu@voltsolarenergy.com",
        "Alexander Vayshelboym": "Bcohen@iconicmortgage.com",
        "Ariel Vega": "av@voltsolarenergy.com",
        "Rafael Viso": "rv@Voltsolarenergy.com",
        "Automation Volt": "automations@voltsolarenergy.com",
        "Installers Volt Solar Energy": "installers@voltsolarenergy.com",
        "Milagros Windels": "mw@Voltsolarenergy.com",
        "Nicolas Zerajia": "nz@voltsolarenergy.com",
        "Alex Bril": "ab@voltsolarenergy.com",
        "Pablo Estruga": "pe@voltsolarenergy.com",
        "Diego Lorenzo": "dml@voltsolarenergy.com",
        "Frank Pasman": "fp@voltsolarenergy.com",
        "Borja Penalver": "bp@voltsolarenergy.com",
        "Javier Saavedra": "js@voltsolarenergy.com",
        "Noam Shalom": "info@greennetworkenergy.net",
        "Aldo Sosa": "as@voltsolarenergy.com",
        "Pedro Vallega": "pv@voltsolarenergy.com",
        "Andres Felipe Wasson": "andres@soleicenergy.com"
    };
    
    const transformedData = { data: [{}] };
    if(!data['primary']){
        return false;
    }
    const index = qb.findIndex(d=>d[451].value == data['primary']['id']);
    // console.log(qb[index][3].value);
    if(index == -1){
        return false;
    }
    
    transformedData.data[0][7] = {"value":data['note']};
    transformedData.data[0][12] = {"value":qb[index][3].value};
    transformedData.data[0][30] = {"value":nameToEmailMap[data['created_by_name']]};
    transformedData.data[0][27] = {"value":data['type']};
    const date = new Date(data['date_created']*1000);
    transformedData.data[0][28] = {"value":formatDate(date)};
    transformedData.data[0][29] = {"value":true};
    return transformedData.data[0];
  }
  (async () => {
    try {
        const activities = [];
        const ja1 = await queryJobnimbusRecordsActivities(10);
        console.log(ja1);
        process.exit();
        const ja2 = await queryJobnimbusRecordsActivities(11);
        // const ja3 = await queryJobnimbusRecordsActivities(10);
        // const ja4 = await queryJobnimbusRecordsActivities(11);
        // const ja5 = await queryJobnimbusRecordsActivities(12);
        // const ja6 = await queryJobnimbusRecordsActivities(5);
        // const ja7 = await queryJobnimbusRecordsActivities(6);
        // const ja8 = await queryJobnimbusRecordsActivities(7);
        // const ja9 = await queryJobnimbusRecordsActivities(8);
        // const ja10 = await queryJobnimbusRecordsActivities(9);
        
        const ja = [...ja1,...ja2]
        console.log(ja);
        process.exit(-1);
        // ,...ja3,...ja4,...ja5]
            // ,...ja6,...ja7,...ja8,...ja9,...ja10];
        
        // Call the function with the provided data and mapping
        
        const qb = await queryQuickBaseRecords('btq2f4rea',[3,451]); //JOBS
        // Use Promise.all to wait for all transformations and save operations to complete
        
        // console.log(cashflow.filter(d=>d[6].value == 'M3'))

        let transformedAll = [];
            ja.map(async (job) => {
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
          const save = await saveQuickBaseRecords('btrq5gg2x', transformedAll); // Insert job
          console.log(save);
          console.log(save.metadata.lineErrors)

    } catch (error) {
        // Catch and log any error that occurs during the entire process
        console.error("An error occurred:", error);
    }
})();
