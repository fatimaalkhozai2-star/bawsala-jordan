const Favorite=require("../models/Favorite");
const addFavorite=async(req,res)=>{
try{
const{user,destination}=req.body;
const favorite=await Favorite.create({
      user,
      destination
    });

    res.status(201).json(favorite);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



const getUserFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({
      user: req.params.userId
    }).populate("destination");

    res.status(200).json(favorites);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const removeFavorite = async (req, res) => {
  try {
    const favorite = await Favorite.findByIdAndDelete(
      req.params.id
    );

    if (!favorite) {
      return res.status(404).json({
        message: "Favorite not found"
      });
    }

    res.status(200).json({
      message: "Favorite removed successfully"
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = {
  addFavorite,
  getUserFavorites,
  removeFavorite
};
