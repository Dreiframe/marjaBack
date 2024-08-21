const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

let spots = [
    {
        id:"1",
        spottedSpecies:"puolukka",
        location:"{x:123, y:123}",
        whoSpotted:"user1",
        speciesAvailability: "medium",
        date: "dateObj"
    },
    {
        id:"2",
        spottedSpecies:"mustikka",
        location:"{x:321, y:321}",
        whoSpotted:"user1",
        speciesAvailability: "high",
        date: "dateObj"
    },
    {
        id:"3",
        spottedSpecies:"puolukka",
        location:"{x:222, y:333}",
        whoSpotted:"user2",
        speciesAvailability: "low",
        date: "dateObj"
    },
    {
        id:"4",
        spottedSpecies:"herkku_tatti",
        location:"{x:555, y:531}",
        whoSpotted:"user3",
        speciesAvailability: "medium",
        date: "dateObj"
    }
]
  

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})


app.get('/api/spots', (request, response) => {
    response.json(spots)
})


app.get('/api/spots/:id', (request, response) => {
    const id = request.params.id
    const spot = spots.find(spot => spot.id === id)

    if(!spot){
        response.status(404).send('ID does not exist')
    }

    response.json(spot)
})


app.delete('/api/spots/:id', (request, response) => {
    const id = request.params.id

    const spot = spots.find(spot => spot.id === id)
    if(!spot){
        response.status(404).send('ID does not exist')
    }

    spots = spots.filter(spot => spot.id !== id)
    response.status(204).end()
})


app.post('/api/spots', (request, response) => {
    /*
    if request body is {
    thing:thing,
    thing:sting,}
    then app crashes
    */
    const spot = request.body


    if (!spot.spottedSpecies || !spot.location || !spot.speciesAvailability) {
        return response.status(400).json({ 
          error: "'spottedSpecies' or 'location' or 'speciesAvailability' missing.."
        })
    }

    const maxId = spots.length > 0
    ? Math.max(...spots.map(n => Number(n.id))) 
    : 0

    const date = new Date()

    const newSpot = {
        id: String(maxId + 1),
        spottedSpecies: spot.spottedSpecies,
        location: spot.location,
        whoSpotted: spot.whoSpotted,
        speciesAvailability: spot.speciesAvailability,
        date: date.toISOString()
    }

    spots = spots.concat(newSpot)

    response.json(newSpot)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})