import express from "express";

const app = express();

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get("/", (req, res)=>{
    res.sendFile("C:\Users\AviMeister\Documents\EYF Team 04\..\src\CaptivePortal.html")
})

app.listen(3000)
