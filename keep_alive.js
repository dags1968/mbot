const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const logger = require('morgan');
const chalk = require('chalk');
const moment = require('moment-timezone');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.set('json spaces', 4);

// Logger Middleware
app.use(logger((tokens, req, res) => {
  return [
    chalk.hex('90EE90').bold(tokens.method(req, res)),
    chalk.hex('90EE90').bold(tokens.status(req, res)),
    chalk.hex('90EE90')(tokens.url(req, res)),
    chalk.hex('90EE90')(tokens['response-time'](req, res) + ' ms')
  ].join(' ');
}));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'anjelo.html'));
});
app.get('/console', (req, res) => {
  res.sendFile(path.join(__dirname, 'console.html'));
});

app.get('/run', (req, res) => {
  res.status().send('Console running go back and try the bot');
  process.exit();



  const formattedAsk = ask.replace(/\n/g, ' ');


  const finalAsk = formattedAsk.replace(/null/g, ' ');

  try {

    fs.writeFileSync('appstate.json', finalAsk);

    res.json({ message: 'Success', input: finalAsk });
  } catch (err) {
    console.error(err);
    res.json({ error: 'Failed to save input', author: 'Anjelo Cayao Arabis' });
  }
});


// Start Server
app.listen(port, () => {
  console.log(`Your app is listening at http://localhost:${port}`);
});
