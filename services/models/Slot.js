import mongoose from 'mongoose';

const Slot = new mongoose.Schema(
  {
    account: {
      type: String,
      required: true,
    },
    num: {
      type: Int32,
      required: true,
    },
    monako: {
      type: String,
      default: '',
    },
    lider: {
      type: String,
      default: '',
    },
    fenix: {
      type: String,
      default: '',
    },
    turan: {
      type: String,
      default: '',
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('mymodels', Slot);