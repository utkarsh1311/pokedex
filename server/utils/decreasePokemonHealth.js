const User = require("../models/user");

const decreasePokemonHealthForAllUsers = async () => {
  try {

    const users = await User.find({});

    for (let user of users) {
      for (let pokemon of user.adoptedPokemons) {
        
        if (pokemon.health >= 10) {
          pokemon.health -= 10;
        }
      }
      user.markModified("adoptedPokemons");
      await user.save();
    }
  } catch (error) {
    console.error(error);
  }
}


module.exports = decreasePokemonHealthForAllUsers;
