/** csv file
a,b,c
1,2,3
4,5,6
*/
const csvFilePath='../database/OrbitalParameters_PHAs.csv'
const csv=require('csvtojson')
const fs = require('fs');
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    fs.writeFile("../database/OrbitalParameters_PHAs.json", JSON.stringify(jsonObj), function(err) {
        if (err) {
            console.log(err);
        }
    });
})
 


