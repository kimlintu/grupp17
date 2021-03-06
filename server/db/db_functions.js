const { cloudant } = require('./db_init.js');

const user_database = 'kimpossible_test';
const EventEmitter = require('events')
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
    _rev: userDoc._rev,
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

const util = require('util');
const { start } = require('repl');

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
  let isLast = false;

  let request = 0;
  const request_wait_time = 500;
  return new Promise(async (resolve, reject) => {
    for (let year = parseInt(start_date.year); year <= parseInt(stop_date.year); year++) {
      for (let month = parseInt(start_date.month); month <= parseInt(stop_date.month); month++) {
        const start_day = (month === parseInt(start_date.month)) ? (parseInt(start_date.day)) : 1;
        const max_day = (month === parseInt(stop_date.month)) ? parseInt(stop_date.day) : parseInt(monthDays[month - start_date.month]);

        for (let day = start_day; day <= max_day; day++, request++) {
          // We have a max limit of requests per second on Cloudant, so only send a request every request_wait_time ms.
          (function (request_nr, day_nr) {
            setTimeout(async () => {
              const month_string = (month < 10) ? '0' + month : month;
              const day_string = (day_nr < 10) ? '0' + day_nr : day_nr;
              const databaseName = `iotp_udbne1_steps_data_${year}-${month_string}-${day_string}`;

              try {
                const data = await cloudant.use(databaseName).find({
                  selector: {
                    deviceId: { "$eq": deviceId },
                    timestamp: { "$gt": 0 }
                  },
                  fields: ["deviceId", "data", "timestamp"],
                })

                isLast = ((year === parseInt(stop_date.year)) && (month === parseInt(stop_date.month)) && (day_nr === max_day));

                const max_steps = data.docs.reduce((current_max, curr) => (curr.data.steps > current_max.data.steps) ? curr : current_max);
                steps = [...steps, max_steps];

              } catch (error) {
                steps = [...steps, fillReturnData(year, month_string, day_string)];
              } finally {
                if (isLast) {
                  resolve(steps)
                }
              }
            }, request_nr * request_wait_time);
          })(request, day);
        }
      }
    }
  })
}

function fillReturnData(year, month, day) {
  const temp = {
    deviceId: '',
    data: { steps: 0 },
    timestamp: year + "-" + month + "-" + day
  }
  return temp;
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

async function createDocForNewUser(dataBase, userId, name){
  try {
    const checkDb = await cloudant.use(dataBase).get(userId);
  } catch (e){
    const create = await cloudant.use(dataBase).insert({ steps: 0, device_id: '', name: name },
          userId);
  }
}

exports.addDeviceIdToUser = addDeviceIdToUser;
exports.getStepsForUser = getStepsForUser;
exports.getUserDevices = getUserDevices;
exports.deleteDeviceFromUser = deleteDeviceFromUser;
exports.createDocForNewUser = createDocForNewUser;