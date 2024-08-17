// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  businessName: { type: String },
  businessType: { type: String },
  customerType: { 
    type: String, 
    enum: ['CONSUMER', 'MERCHANT', 'CORPORATE'],
    required: true
  },
  customerId: {
    type: { 
      type: String, 
      enum: ['NID', 'PASSPORT', 'CR'],
      required: true
    },
    value: { type: String, required: true }
  },
  mobileNumber: { type: String, required: true },
  address: { type: String },
  role: { 
    type: String, 
    enum: ['merchant', 'account_user'], 
    required: true 
  },
  associatedAccounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }],
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);