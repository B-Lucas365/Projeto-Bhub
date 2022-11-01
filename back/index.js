import mysql from "mysql"
import express from "express"
import bodyParser from "body-parser"
import cors from 'cors'
 
const app = express()
app.use(cors())

app.use(bodyParser.json())

const mysqlConnection = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"root",
    database: "bhub"
})

mysqlConnection.connect((err) => {
    if(!err) {
        console.log('DB conectado com sucesso')
    }else{
        console.log(`Erro ao conectar no banco de dados: ${err}`)
    }
})