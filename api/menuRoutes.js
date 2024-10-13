const express = require('express');
const MenuItem = require('../models/MenuItem');
const router = express.Router();

// @route POST /api/menu
// @desc Create a new menu category with dishes
router.post('/', async (req, res) => {
  const { category, dishes } = req.body;

  try {
    const newMenuCategory = new MenuItem({
      category,
      dishes,
    });

    await newMenuCategory.save();
    res.json(newMenuCategory);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route GET /api/menu
// @desc Get all menu categories with their dishes
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route GET /api/menu/:id
// @desc Get a single menu category by ID
router.get('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ msg: 'Menu category not found' });
    res.json(menuItem);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route PUT /api/menu/:id
// @desc Update a menu category and its dishes by ID
router.put('/:id', async (req, res) => {
  const { category, dishes } = req.body;

  try {
    let menuItem = await MenuItem.findById(req.params.id);
    if (!menuItem) return res.status(404).json({ msg: 'Menu category not found' });

    // Update category name and dishes
    menuItem.category = category || menuItem.category;
    menuItem.dishes = dishes || menuItem.dishes;

    await menuItem.save();
    res.json(menuItem);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route DELETE /api/menu/:id
// @desc Delete a menu category by ID
router.delete('/:id', async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu category not found' });
    }
    
    res.status(200).json({ message: 'Menu category deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// @route PUT /api/menu/:categoryId/dishes/:dishId
// @desc Update a specific dish in a category
router.put('/:categoryId/dishes/:dishId', async (req, res) => {
  const { categoryId, dishId } = req.params;
  const { title, price, contents } = req.body;

  try {
    // Find the category by categoryId
    let menuItem = await MenuItem.findById(categoryId);
    if (!menuItem) return res.status(404).json({ msg: 'Category not found' });

    // Find the dish by dishId within the category
    const dish = menuItem.dishes.id(dishId);
    if (!dish) return res.status(404).json({ msg: 'Dish not found' });

    // Update dish details
    dish.title = title || dish.title;
    dish.price = price || dish.price;
    dish.contents = contents || dish.contents;

    await menuItem.save();
    res.json(menuItem); // Send back updated menuItem
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route POST /api/menu/:categoryId/dishes
// @desc Add a new dish to an existing category
router.post('/:categoryId/dishes', async (req, res) => {
  const { categoryId } = req.params;
  const { title, price, contents } = req.body;

  try {
    // Find the category by its ID
    let menuItem = await MenuItem.findById(categoryId);
    if (!menuItem) return res.status(404).json({ msg: 'Category not found' });

    // Add the new dish to the category
    const newDish = {
      title,
      price,
      contents
    };

    menuItem.dishes.push(newDish); // Add the new dish to the dishes array

    await menuItem.save(); // Save the updated menu item
    res.json(menuItem); // Respond with the updated menu category
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Export as a serverless function
module.exports = (req, res) => {
  const handler = express();
  handler.use(router);
  handler(req, res);
};