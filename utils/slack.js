const axios = require('axios');

const postNotification = async (message, tries = 0, lastErr = null) => {
  if(!process.env.CHANNEL_AUTOMATOR) {
    console.log('Notification skipped because there is no a CHANNEL_AUTOMATOR ENV Variable to send the message.');
    return;
  };

  if (tries >= 3) {
    console.log(`Notification skipped because reached the MAX retries with the last error ${lastErr}.`);
    return;
  }

  const body = {
    blocks: [
      {
        type: 'section',
        text: { type: 'mrkdwn', text: `${message}` },
      },
    ],
  };

  try {
    await axios.post(process.env.CHANNEL_AUTOMATOR, body);
  } catch (err) {
    postNotification(message, tries + 1, err);
  }
};

module.exports = {
  postNotification,
};
