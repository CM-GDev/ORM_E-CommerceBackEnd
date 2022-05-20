const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!'});
      return;
    }
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(categoryData);

  } catch (err) {
    res.status(400).json(err);
  }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoryData = await Category.upsert(
        {id: req.params.id,
        category_name: req.body.category_name,}
    );
      if(categoryData) {
        res.status(404).json({ message: 'No category found with that id!'});
        return
      }
    res.status(200).json(`Category ${req.params.id} now has name: ${req.body.category_name}`);
    // console.log(res);
    

    } catch (err) {
      res.status(400).json(err);
    }
  });

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }
    res.status(200).json(`${req.params.id} has been deleted`);
    
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
