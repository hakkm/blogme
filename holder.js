
  for (let i=0;i<postList.length; i++){
    post = postList[i]
    if (post.title.toLowerCase() == req.params.post_name){
      res.render("post", {title: post.title, content: post.content})
    }
  }

    <p><%= post.content.substring(0, 100) + "..."; %> <a href="/posts/<%= post.title %>">Read More</a></p>
