/*
=>API call using express 
=>To call the API we need to use a requests package
*/
const express = require("express")
const requests = require("requests")
const app = express()
const PORT = 8000

//let's send the data bases on query parameter ?
app.get("/temperature", (req, res) => {
    //here we are using openweather api
    //to get the request using query parameter "req.query" also lets store this in a variable name(city name)
    const cityName = req.query.name
    requests(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=a3547addf902f2a1e709f062a2e801dd`)
    .on("data", (chunk) => {
        const objData = JSON.parse(chunk)
        console.log(objData)
        const convertTempInCelcius = Math.round(objData.main?.temp - 273) //here we are converting temperature from kelvin to celcius
        const result = `The Temperature in ${objData.name} is ${convertTempInCelcius}&degC and humidity is ${objData.main.humidity}%`
        console.log(result)
        res.send(`<h1 style="color:red;">${result}</h1>`)
    })
    .on("end", (err) => {
        if(err) return console.log(`connection closed due to ${err}`)
    })
})

app.listen(PORT, () => {
    console.log(`Server Running at http://localhost:${PORT}`)
})