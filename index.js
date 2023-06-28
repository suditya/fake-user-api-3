const express = require('express');
const bodyParser = require('body-parser');
const casual = require('casual');
const moment = require('moment');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

casual.define('moment', moment);

app.get('/api/getUser', async (req, res) => {
  const { phoneNumber, emailAddress } = req.query;

  const randomHour = casual.integer(1, 12);
  const randomMinute = casual.integer(0, 59);
  const randomPeriod = casual.random_element(['AM', 'PM']);
  const randomTime = `${randomHour}:${randomMinute.toString().padStart(2, '0')} ${randomPeriod}`;

  const randomDay = casual.integer(1, 28);
  const randomMonth = casual.integer(1, 12);
  const randomYear = casual.integer(2020, 2023);
  
  const randomDate = `${randomDay}/${randomMonth}/${randomYear}`;

  const user = {
    phoneNumber,
    emailAddress,
    name: casual.full_name,
    status: randomTime,
    lastSeen: randomDate,
    profilePicture: `https://xsgames.co/randomusers/avatar.php?g=${casual.random_element(['male', 'female'])}`,
    upiId: casual.uuid,
    username: casual.username,
    profileUrl: casual.url,
  };

  res.json(user);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
