import axios from "axios"
import { useState } from "react"
import Modal from 'react-modal'

import './styles.scss'

export const Formulario = ({isOpen, onRequestClose, getAllClients}) => {
    const [razaoSocial, setRazaoSocial] = useState('')
    const [telefone, setTelefone] = useState('')
    const [endereco, setEndereco] = useState('')
    const [faturamentoDeclarado, setFaturamentoDeclarado] = useState('')
    const [agencia, setAgencia] = useState('')
    const [conta, setConta] = useState('')
    const [banco, setBanco] = useState('')


    function addNewClient(){
        let body = {    
            "razaoSocial": razaoSocial,
            "telefone": telefone,
            "endereco": endereco,
            "faturamentoDeclarado": faturamentoDeclarado
        }

        axios
        .post(`http://localhost:3000/clientes`, body)
        
        .then((resp) => {console.log("Cadastrado com sucesso!"); getAllClients()})
        .catch((err) => console.log(err))

        onRequestClose()
    }

    return(
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >

        <div id="form">
            <h2>Cadastrar Cliente</h2>
            <fieldset>
                    <label htmlFor="">Razão Social</label>
                    <input type="text" value={razaoSocial} onChange={(e) => setRazaoSocial(e.target.value)} />
                </fieldset>

            <fieldset>
                <label htmlFor="">Endereço</label>
                <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
            </fieldset>

            <div className="form-divider">
                
                <fieldset>
                    <label htmlFor="">Faturamento</label>
                    <input type="number" value={faturamentoDeclarado} onChange={(e) => setFaturamentoDeclarado(e.target.value)}/>
                </fieldset>

                <fieldset>
                    <label htmlFor="">Telefone</label>
                    <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                </fieldset>
            </div >
            
                <fieldset className="conta">
                    <label htmlFor="">Dados Bancarios</label>
                    <input type="text" value={agencia} onChange={(e) => setAgencia(e.target.value)} />
                    <input type="text" value={conta} onChange={(e) => setConta(e.target.value)} />
                    <input type="text" value={banco} onChange={(e) => setBanco(e.target.value)} />
                </fieldset>

            <button onClick={addNewClient}>Cadastrar Cliente</button>
        </div>
      </Modal>
        
    )
}