import { mongoose } from "mongoose";

const pokemonSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  images: {
    animated: String,
    official: String,
  },
  types: [String],
  abilities: [String],
  height: Number,
  weight: Number,
  stats: [
    {
      name: String,
      value: Number,
    },
  ],
});

pokemonSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
