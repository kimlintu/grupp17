const { cloudant } = require('./db_init.js');

const user_database = 'kimpossible_test';
const steps_database = 'iotp_udbne1_steps_data_';

/*
Add deviceId to userId document in database
*/
async function addDeviceIdToUser({ user, deviceId }) {
  cloudant.use(user_database).get(user.id).then((data) => {
    const doc = data;
    cloudant.use(user_database).insert({
      _rev: doc._rev,
      steps: doc.steps,
      device_id: deviceId,
      name: user.name
    }, user.id);
  })
}

/*
Get latest document with step information for current user
@return the number of steps
*/
async function getStepsForUser({ user, deviceId, start_date, stop_date }) {
  // Calculate days in each month.
  let monthDays = [];
  let current_month = start_date.month;
  while(current_month <= stop_date.month) {
    monthDays = [...monthDays, getDaysInMonth(start_date.year, current_month)];
    
    current_month++;
  }

  let steps = [];
  for(let year = start_date.year; year <= stop_date.year; year++) {
    for(let month = start_date.month; month <= stop_date.month; month++) {
      const max_day = (month == stop_date.month) ? stop_date.day : monthDays[month - start_date.month];
      for(let day = start_date.day; day <= max_day; day++) {
        const databaseName = `iotp_udbne1_steps_data_${year}-${month}-${day}`;
        console.log('NAMMEE: ', databaseName)
        
        cloudant.use(databaseName).find(stepsQuery(deviceId)).then((data) => {
            steps = [...steps, data];

            console.log('steps: ', data)

            return steps;
        })
      }
    }
  }
  
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function stepsQuery({deviceId}){
    const q = {
        selector: {
            deviceId: {"$eq": deviceId}
        },
        use_index: ["_design/iotp", "by-deviceId"]
    };
    return q;
}

exports.addDeviceIdToUser = addDeviceIdToUser;
exports.getStepsForUser = getStepsForUser;