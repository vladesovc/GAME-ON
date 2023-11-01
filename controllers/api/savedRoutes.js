// root/api/saved

const express = require('express');
const router = express.Router();
const { Saved } = require('../../models'); 

// gets all saved data
router.get('/saved', async (req, res) => {
    try {
      const savedItems = await Saved.findAll();
      res.json(savedItems);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });
  
  //gets saved items by ID
  router.get('/saved/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const savedItem = await Saved.findByPk(id);
      if (savedItem) {
        res.json(savedItem);
      } else {
        res.status(404).json({ message: 'Saved item not found' });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  // create a new saved item
  router.post('/saved', async (req, res) => {
    try {
      const newSavedItem = await Saved.create(req.body);
      res.status(201).json(newSavedItem);
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });

  // delete saved item
  router.delete('/saved/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const deleted = await Saved.destroy({
        where: { id }
      });
      if (deleted) {
        res.json({ message: 'Saved item deleted' });
      } else {
        res.status(404).json({ message: 'Saved item not found' });
      }
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  });

  module.exports = router;