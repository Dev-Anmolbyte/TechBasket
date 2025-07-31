const mongoose = require('mongoose');



const orderItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:      { type: String, required: true },
  brand:     { type: String, required: true },
  category:  { type: String, required: true },
  price:     { type: Number, required: true, min: 0 },
  quantity:  { type: Number, required: true, min: 1 },
  image:     { type: String, required: true }
});

const billingInfoSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName:  { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true, trim: true },
  phone:     { type: String, trim: true },
  address:   { type: String, required: true, trim: true },
  city:      { type: String, required: true, trim: true },
  state:     { type: String, required: true, trim: true },
  zipCode:   { type: String, required: true, trim: true },
  country:   { type: String, required: true, default: 'United States', trim: true }
});

const paymentInfoSchema = new mongoose.Schema({
  method: {
    type: String,
    required: true,
    enum: ['credit_card', 'debit_card', 'paypal'],
    default: 'credit_card'
  },
  cardNumber: {
    type: String,
    required: true,
    // Store only masked version, e.g., '**** **** **** 1234'
    validate: {
      validator: v => /^\*{4} \*{4} \*{4} \d{4}$/.test(v),
      message: props => `${props.value} must be in masked format`
    }
  },
  nameOnCard: { type: String, required: true, trim: true }
});

const totalsSchema = new mongoose.Schema({
  subtotal: { type: Number, required: true, min: 0 },
  tax:      { type: Number, required: true, min: 0 },
  shipping: { type: Number, required: true, min: 0 },
  total:    { type: Number, required: true, min: 0 }
});



const orderSchema = new mongoose.Schema({
  userId:       { type: mongoose.Schema.Types.ObjectId, ref: 'customer', required: true },
  orderNumber:  { type: String, unique: true }, // e.g. TB000001 (auto-generate if desired)
  items:        { type: [orderItemSchema], required: true },
  billingInfo:  { type: billingInfoSchema, required: true },
  paymentInfo:  { type: paymentInfoSchema, required: true },
  totals:       { type: totalsSchema, required: true },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  orderDate:     { type: Date, default: Date.now },
  shippedDate:   { type: Date },
  deliveredDate: { type: Date },
  cancelledDate: { type: Date },
}, { timestamps: true });


orderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
   
    this.orderNumber = 'TB' + String(Date.now()).slice(-6) + Math.floor(Math.random() * 1000);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
