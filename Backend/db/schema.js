import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// name, type, amount
const categoriesSchema = new Schema({
  type: { type: String, default: 'Savings' },
  color: { type: String, default: '#1F3B5C' },
});

const newTrasationSchema = new Schema({
  name: { type: String, default: 'Anonymous' },
  type: { type: String, default: 'Investments' },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

export const Categories = mongoose.model('categories', categoriesSchema);
export const Transation = mongoose.model('transation', newTrasationSchema);
