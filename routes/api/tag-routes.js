const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// find all tags route
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id` route
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!'});
      return;
    }
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag route
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagData);
  }
  catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value route
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(req.body,{
        where: {
          id: req.params.id,
        },
    }); console.log(tagData);
      if(!tagData[0]) {
        res.status(404).json({ message: 'No tag found with that id!'});
        return
      }
    res.status(200).json({message: `Tag ${req.params.id} has been updated to: ${req.body.tag_name}`});
    // console.log(res);
    }
    catch (err) {
      res.status(400).json(err);
    }
});

// delete on tag by its `id` value route
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json({ message: `ID ${req.params.id} has been deleted`});
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
