const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PokeDetailsSchema = new Schema({
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  has_gender: { type: Boolean, required: true },
  hp: { type: Number, required: true },
  attack: { type: Number, required: true },
  defense: { type: Number, required: true },
  specialAttack: { type: Number, required: true },
  specialDefense: { type: Number, required: true },
  speed: { type: Number, required: true },
  abilities: {
    type: [String],
    default: () => {
      return null;
    },
  },
  evolvesTo: {
    type: [Schema.Types.ObjectId],
    ref: "Pokemon",
    default: () => {
      return null;
    },
  },
});

// Export model
module.exports = mongoose.model("PokeDetails", PokeDetailsSchema);
