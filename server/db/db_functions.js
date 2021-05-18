const { cloudant } = require('./db_init.js');

const user_database = 'kimpossible_test';

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

/**
 * Removes the saved step-counter from the user in the database. 
 * @param {object} user The user whose device should be removed. 
 */
async function deleteDeviceFromUser({ user }) {
  const userDoc = await cloudant.use(user_database).get(user.id);
  await cloudant.use(user_database).insert({
    _rev: userDoc.rev,
    steps: userDoc.steps,
    device_id: '', // empty string signifies no step counter added
    name: userDoc.name
  }, user.id)
}

/**
 * 
 * @param {object} user The user whose devices should be retreived. 
 * @returns (For now) the step counter that has been added by the user.
 */
async function getUserDevices({ user }) {
  const userDoc = await cloudant.use(user_database).get(user.id);

  return userDoc.device_id;
}

/*
Get latest document with step information for current user
@return the number of steps
*/
async function getStepsForUser({ deviceId, start_date, stop_date }) {
  // Calculate days in each month.
  let monthDays = [];
  let current_month = start_date.month;
  while (current_month <= stop_date.month) {
    monthDays = [...monthDays, getDaysInMonth(start_date.year, current_month)];

    current_month++;
  }

  let steps = [];
  return new Promise(async (resolve, reject) => {
    for (let year = start_date.year; year <= stop_date.year; year++) {
      for (let month = start_date.month; month <= stop_date.month; month++) {
        const max_day = (month == stop_date.month) ? stop_date.day : monthDays[month - start_date.month];
        for (let day = start_date.day; day <= max_day; day++) {
          const databaseName = `iotp_udbne1_steps_data_${year}-${month}-${day}`;

          const data = await cloudant.use(databaseName).find({
            selector: {
              deviceId: { "$eq": deviceId },
              timestamp: { "$gt": 0 }
            },
            fields: ["deviceId", "data", "timestamp"],
          })
          const max_steps = data.docs.reduce((current_max, curr) => (curr.data.steps > current_max.data.steps) ? curr : current_max);

          steps = [...steps, max_steps];
        }
      }
    }

    resolve(steps);
  })
}

async function retrieveStepsFromDatabase({ user, deviceId, start_date, stop_date }) {

}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function stepsQuery({ deviceId }) {
  const q = {
    selector: {
      deviceId: { "$eq": deviceId }
    },
    use_index: ["_design/iotp", "by-deviceId"]
  };
  return q;
}

exports.addDeviceIdToUser = addDeviceIdToUser;
exports.getStepsForUser = getStepsForUser;
exports.getUserDevices = getUserDevices;
exports.deleteDeviceFromUser = deleteDeviceFromUser;