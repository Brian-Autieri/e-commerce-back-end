const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [Product]
    })
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.get('/:id', async (req, res) => {
try {
  const categories = await Category.findByPk(req.params.id, {
    include: [Product]
  });

if (!categories) {
 return res.status(404).json('Category not found');
}
res.status(200).json(categories)
} catch (error) {
  res.status(500).json(error.message);
}
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body, {
    where: { id: req.params.id }
  })
  .then((category) => {
    res.status(200).json(category);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
});
});

router.delete('/:id', async (req, res) => {
try {
const categories = await Category.destroy({
  where: { id: req.params.id }
});
if (!categories) {
  return res.status(404).json({ message: 'No category found with this id!' });
}
res.status(200).json(categories);
} catch (error) {
  res.status(500).json(error.message);
}
});

module.exports = router;