const User = require("../models/user");

const decreasePokemonHealth = async (req, res) => {
  try {
    const cronSecret = req.headers['x-cron-secret'];
    if (cronSecret !== process.env.CRON_SECRET) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const users = await User.find({});
    let updatedCount = 0;

    for (let user of users) {
      let healthDecreased = false;
      
      for (let pokemon of user.adoptedPokemons) {
        if (pokemon.health >= 10) {
          pokemon.health -= 10;
          healthDecreased = true;
        }
      }
      
      if (healthDecreased) {
        user.markModified("adoptedPokemons");
        await user.save();
        updatedCount++;
      }
    }

    return res.status(200).json({ 
      message: 'Pokemon health decreased successfully',
      usersUpdated: updatedCount 
    });
  } catch (error) {
    console.error('Error in decreasePokemonHealth:', error);
    return res.status(500).json({ 
      error: 'Failed to decrease pokemon health',
      details: error.message 
    });
  }
}

module.exports = { decreasePokemonHealth };