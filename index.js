const { setIntervalAsync } = require('set-interval-async/dynamic');

const checkAvailability = require('./parsers/checkCitizenshipAvalabilityUy');
const slack = require('./utils/slack');

console.log('Automator running...');
console.log('HOURS: ', process.env.HOURS);
console.log('MINS: ', process.env.MINS);
console.log('CHANNEL_AUTOMATOR: ', process.env.CHANNEL_AUTOMATOR);

slack.postNotification(`@cyberxander90, THE PROCESS STARTED!`);

setIntervalAsync(async () => {
  await checkAvailability();
}, 30000);
