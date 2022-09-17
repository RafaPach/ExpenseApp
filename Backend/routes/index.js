import express from 'express';
const routes = express.Router();
import { Categories, Transation } from '../db/schema.js';
import { ObjectId } from 'mongodb';

routes.get('/', async (req, res) => {
  try {
    let result = await Categories.find();
    // get with useful response
    let filteredData = result.map((item) =>
      Object.assign({}, { type: item.type, color: item.color })
    );
    res.json(filteredData);
  } catch (error) {
    console.log(error.message);
  }
});

routes.post('/categories', async (req, res) => {
  try {
    const body = req.body;
    const blog = new Categories(body);
    const result = await blog.save(); // save the blog to the database
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});
routes.get('/transactions', async (req, res) => {
  try {
    let result = await Transation.find({});
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});
routes.post('/transactions', async (req, res) => {
  try {
    const body = req.body;
    const create = await new Transation(body);
    const result = await create.save(); // save the blog to the database
    res.json(result);
  } catch (error) {
    console.log(error.message);
  }
});

routes.delete('/transactions/:id', async (req, res) => {
  const id = req.params.id;
  if (ObjectId.isValid(id)) {
    const result = await Transation.findByIdAndDelete(`${id}`);
    res.json(result);
  } else {
    res.status(500).json({ error: 'Not a Valid Doc Id' });
  }
});

// routes.get('/labels', async (req, res) => {
//   try {
//     const result = await Transation.aggregate([
//       {
//         $lookup: {
//           from: 'categories',
//           localField: 'type',
//           foreignField: 'type',
//           as: 'categories_info',
//         },
//       },
//       {
//         $unwind: '$categories_info', // this
//       },
//     ]);
//     let filtered = result.map((item) =>
//       Object.assign(
//         {},
//         {
//           _id: item._id,
//           name: item.name,
//           type: item.type,
//           amount: item.amount,
//           color: item.categories_info.color,
//         }
//       )
//     );
//     res.json(filtered);
//   } catch (error) {
//     console.log(error.message);
//   }
// });

routes.get('/labels', async (req, res) => {
  Transation.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'type',
        foreignField: 'type',
        as: 'categories_info',
      },
    },
    {
      $unwind: '$categories_info',
    },
  ])
    .then((result) => {
      let data = result.map((v) =>
        Object.assign(
          {},
          {
            _id: v._id,
            name: v.name,
            type: v.type,
            amount: v.amount,
            color: v.categories_info['color'],
          }
        )
      );
      res.json(data);
    })
    .catch((error) => {
      res.status(400).json('Looup Collection Error');
    });
});

export default routes;
