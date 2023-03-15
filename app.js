const express= require('express')
const request=require('request')
//Syntax of express
const app= express()
const dotenv=require('dotenv')
dotenv.config()
app.set("view engine", "ejs")
app.use('/public', express.static('public'))

app.get("/", (req, res)=>{
    res.render("home")
})

app.get("/result", (req, res)=>{
    console.log(req.query.movieName)
    
    const url= `http://www.omdbapi.com/?apikey=98f4eda1&s=${req.query.movieName}`
    request(url, function (error, response, body){
        if(!error && response.statusCode==200){
            const data= JSON.parse(body)
            
            res.render("result", {movieData: data})
        }else{
            res.send("Uh oh error")
        }
    })
})

app.get("/result/:id", (req, res)=>{
    
    console.log(process.env.API_KEY)
    const url= `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.params.id}`
    request(url, function (error, response, body){
        if(!error && response.statusCode==200){
            const data= JSON.parse(body)
            const imageUrl = data.Poster === 'N/A' ? '/public/images/placeholder.png' : data.Poster;
            res.render("AboutMovie", {movieData: data, imageUrl: imageUrl})
        }else{
            res.send("Uh oh error")
        }
    })
})
app.get("/about", (req, res) => {
    const aboutMeInfo = {
      name: "purushotham",
      bio: "Your Bio",
      hobbies: ["Hobby 1", "Hobby 2", "Hobby 3"],
      
    };
  
    res.render("about", { aboutMeInfo });
  });
  
app.get("*", (req, res)=>{
    res.send("Go back! Illegal response")
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server has started at port ${process.env.PORT}`)
})
