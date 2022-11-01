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

app.listen(3000, ()=> console.log('rodando na porta 3000'))


// Midlewares
const verificarClienteExistente = (req, res, next) => {
    const {razaoSocial} = req.body

    mysqlConnection.query('SELECT * FROM clientes WHERE razao_social = ?', [razaoSocial], (err, rows, fields) => {
        if(!err && rows != ""){
            return res.status(400).send("Cliente já cadastrado!")
        }else if(!err && rows == ""){
            return next()
        }else {
            res.send(err)
        }
    })

}

const verificarClienteNaoExistente = (req, res, next) => {
    const {razaoSocial} = req.body

    mysqlConnection.query('SELECT * FROM clientes WHERE razao_social = ?', [razaoSocial], (err, rows, fields) => {

        if(!err && rows == ""){
            return res.status(400).send("Cliente não cadastrado")
        }else if(!err && rows != ""){
            return next()
        }else{
            res.send(err)
        }
    })

}