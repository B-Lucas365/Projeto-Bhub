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


// criandos clientes na base de dados
app.post('/clientes', verificarClienteExistente,(req, res) => {
    const {razaoSocial, telefone, endereco, faturamentoDeclarado} = req.body

    mysqlConnection.query(
        'INSERT INTO clientes (razao_social, telefone, endereco, faturamento_declarado) VALUES (? , ? , ? , ? )',
        [razaoSocial, telefone, endereco, faturamentoDeclarado], (err, rows, fields) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})


// consultar todos os clientes
app.get('/clientes', (req, res) => {
    mysqlConnection.query('SELECT * FROM clientes', (err, rows, fields) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

app.post('/clienteRazaoSocial', verificarClienteNaoExistente,(req, res) => {
    const {razaoSocial} = req.body

    mysqlConnection.query('SELECT * FROM clientes WHERE razao_social = ?', [razaoSocial], (err, rows, fields) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})

// atualizar dados do cliente
app.put('/cliente', (req, res) => {
    const {idCliente, razaoSocial, telefone, endereco, faturamentoDeclarado} = req.body

    mysqlConnection.query(
        'UPDATE clientes SET razao_social = ?, telefone = ?, endereco = ?, faturamento_declarado = ? WHERE id_cliente = ?',
        [razaoSocial, telefone, endereco, faturamentoDeclarado, idCliente], (err, rows, fields) => {
        if(!err){
            res.send(rows)
        }else{
            res.send(err)
        }
    })
})
