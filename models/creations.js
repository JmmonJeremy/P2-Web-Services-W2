const AutoIncrement = require('mongoose-sequence'); // Make sure AutoIncrement is required

module.exports = (mongoose) => {
  const creationSchema = new mongoose.Schema(
      {
        creationNumber: { type: Number },
        motivator: String,
        desire: String,
        belief: String,
        knowledge: String,
        goal: String,
        plan: String,   
        action: String,
        victory: String,
        creationDate: { type: Date, default: Date.now },       
      },
      { timestamps: true }
    );

    // Apply the auto-increment plugin
  creationSchema.plugin(AutoIncrement(mongoose), { inc_field: 'creationNumber' });

  // Explicitly specify the collection name
  const Creation = mongoose.model('Creation', creationSchema, 'Creation');

  return Creation;
};
