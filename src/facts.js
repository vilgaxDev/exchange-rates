import fetch from 'isomorphic-fetch';

export default function getFacts(){
    return Promise.all(new Array(
                            fetch('https://exchageratesmgr.firebaseio.com/currentrates.json'),
                            
      .then(values=>Promise.all(values.map(e=>e.json())))
      .then((facts) => {         
           let ratesInfo = facts[0];
           let dtStr = Object.keys(ratesInfo).sort().pop();
           //TODO: implementar esto usando moment.js
           dtStr = dtStr.substr(6, 2) + '/' + dtStr.substr(4, 2) + "/" + dtStr.substr(0, 4)
           let whData = facts[1];
           let warehouses = Object.keys(whData).map(f => (Object.assign({}, { warehouse: f }, whData[f], { flag: whData[f].status === "success" }, { flagUpdated: dtStr == whData[f].date })));
           return warehouses;
         }
      );
}