import path from 'path';

import express from 'express';

const PORT = Number(process.env.PORT || 4000);

const start = async () => {
  const app = express();

  // State
  app.locals.numFullPageRenders = 0;
  app.locals.numClicks = 0;

  // Setup
  app.use(express.urlencoded({extended: true}));
  app.set('views', path.join('src', 'views'));
  app.set('view engine', 'ejs');

  // Routes
  app.get('/', (_req, res) => {
    app.locals.numFullPageRenders += 1;

    return res.render('index', {
      numFullPageRenders: app.locals.numFullPageRenders,
      numClicks: app.locals.numClicks,
    });
  });

  app.post('/clicks/increase', (_req, res) => {
    app.locals.numClicks += 1;

    return res.render('partials/numClicks', {
      numClicks: app.locals.numClicks,
    });
  });

  app.post('/clicks/decrease', (_req, res) => {
    app.locals.numClicks -= 1;

    return res.render('partials/numClicks', {
      numClicks: app.locals.numClicks,
    });
  });

  app.post('/clicks/set', (req, res) => {
    app.locals.numClicks = Number(req.body.numClicks || 0);

    return res.render('partials/numClicks', {
      numClicks: app.locals.numClicks,
    });
  });

  app.delete('/clicks', (_req, res) => {
    app.locals.numClicks = 0;

    return res.render('partials/numClicks', {
      numClicks: app.locals.numClicks,
    });
  });

  // Start
  app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
};

start();
