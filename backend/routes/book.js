const router=require("express").Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const Book=require("../models/book");
const {authenticateToken}=require("./userAuth");


// add-book route
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
      const { id } = req.headers;
      const user = await User.findById(id);
      if (user.role !== "admin") {
        return res.status(500).json({ message: "You are not authorized to perform admin tasks" });
      }
      const book = new Book({
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      });
      await book.save();
      res.status(200).json({ message: "Book created successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
router.put("/update-book/:bookid", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
      const user = await User.findById(id);
      if (user.role !== "admin") {
        return res.status(403).json({ message: "You do not have admin privileges" });
      }
      await Book.findByIdAndUpdate(bookid, {
        url: req.body.url,
        title: req.body.title,
        author: req.body.author,
        price: req.body.price,
        desc: req.body.desc,
        language: req.body.language,
      });
      res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "An error occurred" });
    }
  });
  
  // Delete book - admin
  router.delete("/delete-book/:bookid", authenticateToken, async (req, res) => {
    try {
      const { bookid } = req.params;
      const { id } = req.headers;
      const user = await User.findById(id);
      if (user.role !== "admin") {
        return res.status(403).json({ message: "You do not have admin privileges" });
    }
    await Book.findByIdAndDelete(bookid);
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
});


//delete book
router.delete("/delete-book",authenticateToken,async(req,res)=>{
    try{
        const {bookid}=req.headers;
        
        await Book.findByIdAndDelete(bookid);
        
        return res.status(200).json({message:"Book deleted successfully"});
    }catch(error)
    {
        //console.log(error);
        return res.status(500).json({message: "An error occured"});
    }
});

//get all books
router.get("/get-books",async(req,res)=>{
    try{
        
        const books=await Book.find().sort({createdAt:-1});
        
        return res.json({status:"Success",data:books,});
    }catch(error)
    {
        //console.log(error);
        return res.status(500).json({message: "An error occured"});
    }
});


//get 5 recent books
router.get("/get-recent-books",async(req,res)=>{
    try{
        
        const books=await Book.find().sort({createdAt:-1}).limit(5);
        
        return res.json({status:"Success",data:books,});
    }catch(error)
    {
        //console.log(error);
        return res.status(500).json({message: "An error occured"});
    }
});


//get book by id
router.get("/get-book-byid/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        const book=await Book.findById(id);
        
        return res.json({status:"Success",data:book,});
    }catch(error)
    {
        //console.log(error);
        return res.status(500).json({message: "An error occured"});
    }
});

module.exports=router;
