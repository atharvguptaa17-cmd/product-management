import express from 'express'
import cors from 'cors'
import connectToDatabase from './db/db.js'
import authRoute from './routes/authRoute.js'
import productRoute from './routes/productRoute.js'


connectToDatabase()


const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/item', productRoute)


app.listen(process.env.PORT, ()=>{
    console.log(`port is running on port${process.env.PORT}` )
})