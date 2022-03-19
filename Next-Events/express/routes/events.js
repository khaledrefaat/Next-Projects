const express = require('express');
const router = express.Router();
const DUMMY_EVENTS = require('../util/DUMMY_CONTENT');

router.get('/', (req, res, next) => {
  res.json(DUMMY_EVENTS);
});

router.get('/event/:id', (req, res) => {
  const { id } = req.params;
  const event = DUMMY_EVENTS.find(event => event.id === id);
  res.json(event);
});

router.get('/featured', (req, res, next) => {
  const events = DUMMY_EVENTS.filter(event => event.isFeatured);
  res.json(events);
});

router.get('/filter/:year/:month', (req, res, next) => {
  const { year, month } = req.params;
  let filteredEvents = DUMMY_EVENTS.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === +year && eventDate.getMonth() === +month - 1
    );
  });
  res.json(filteredEvents);
});

module.exports = router;
