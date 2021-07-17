//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const homeStartingContent = "Journaling could be the one thing missing from your life, it gives you perspective, allows you to develop and grow and helps you keep your memories recorded for years to come. Just think about how you’ll feel in ten or twenty years, reading back over your journal and thinking about what was important to you then and how you’ve changed.";
const aboutContent = "The 365 Days Of Gratitude Journal is a great way to log the little happy things in life. With three daily prompts to fill in for 365 days, you can focus on being grateful and bringing in good vibes only.";
const contactContent = "Name:-  Hanamantray Y Kumbar";

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-hanamantray:Test-123@cluster0.8ric1.mongodb.net/blogDB",{useNewUrlParser:true,useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
  title:String,
  content:String
});
const Post = mongoose.model("Post",postSchema);

app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home",{
      startingContent:homeStartingContent,
      posts:posts
    });
  });
});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  });

app.get("/about",function(req,res){
  res.render("about",{abtContent: aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contContent: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.post("/compose",function(req,res){
  const post = new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  });
  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});