const express = require("express"),
      bodyParser = require("body-parser"),
      ejs = require("ejs"),
      _ = require('lodash'),
      mongoose = require('mongoose'),
      ObjectId = require('mongodb').ObjectId;
const port = 3000;

const app = express()
const router = express.Router()


let homeText = "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."
let contactText = "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."
let aboutText = "Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis."

let postList = [];
let post1Object = {title: "Day 1", content: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."}
let post2Object = {title: "Day 2", content: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."}
postList.push(post1Object)
postList.push(post2Object)

mongoose.connect('mongodb://127.0.0.1:27017/blogPostDB');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "add blog title"]
  },
  content: {
    type: String,
    required: [true, "add blog content"]
  },
});

const Blog = mongoose.model("blog", blogSchema);

Blog.find().then(postList => {
  if (!postList.length){
    const blog1 = Blog({title: "Day 1", content: "lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."})
    blog1.save()

    const blog2 = Blog({title: "Day 2", content: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."})
    blog2.save()
  }
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static("public"))
app.set('view engine', 'ejs');

app.get("/", (req, res)=>{
  Blog.find().then(postList => {
    res.render("home", {title: "Home", content: homeText, postList: postList})
  })
})

app.get("/contact", (req, res)=>{
  res.render("contact", {title:"Contact", content: contactText})
})

app.get("/about", (req, res)=>{
  res.render("about" ,{title: "About", content: aboutText})
})

app.get("/compose", (req, res)=>{
  res.render("compose", {title: "New Post", content: aboutText})
})

app.post("/post", (req, res)=>{
    const post = Blog({title: _.capitalize(req.body.title), content: req.body.content})
    post.save()
  res.redirect("/")
})

app.get("/posts/:post_id", (req, res)=>{
  
  Blog.findOne({_id: new ObjectId(req.params.post_id)}).then(post => {
    console.log(post.title)
    res.render("post", {title: post.title, content: post.content})
  })
})

app.listen(port, ()=>{
  console.log("Server ready on port " + port)
})
