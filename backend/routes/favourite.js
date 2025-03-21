const router=require("express").Router();
const User=require("../models/user");
const {authenticateToken}=require("./userAuth");

//add book to favourite
router.put("/fav",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite)
        {
            return res.status(200).json({message:"Book is already in favourites"});
        }
        await User.findByIdAndUpdate(id,{$push: {favourites:bookid}});
        
        return res.status(200).json({message:"Book added to favourites"});
    }catch(error)
    {
        res.status(500).json({message: "Internal server error"});
    }
});

router.put("/del-fav",authenticateToken,async(req,res)=>{
    try{
        const {bookid,id}=req.headers;
        const userData=await User.findById(id);
        const isBookFavourite=userData.favourites.includes(bookid);
        if(isBookFavourite)
        {
            await User.findByIdAndUpdate(id,{$pull: {favourites:bookid}});
        }
        
        
        return res.status(200).json({message:"Book removed from favourites"});
    }catch(error)
    {
        res.status(500).json({message: "Internal server error"});
    }
});

router.get("/get-fav",authenticateToken,async(req,res)=>{
    try{
        const {id}=req.headers;
        const userData=await User.findById(id).populate("favourites");
        const favouriteBooks=userData.favourites;
        return res.json({status:"Success",data:favouriteBooks});
        
    }catch(error)
    {
        res.status(500).json({message: "An error occured"});
    }
});

module.exports=router;