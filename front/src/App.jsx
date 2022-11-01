import { Header } from './components/Header'
import {Painel} from './components/Painel'
import {useState, useEffect} from 'react'
import Modal from 'react-modal'
import axios from 'axios'

import './global.scss'
import { Formulario } from './components/Formulario'

Modal.setAppElement('#root');

export const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [allClients, setAllClients] = useState([])

  const handleOpenModal = () => {
      setIsModalOpen(true)
  }

  const handleCloseModal = () => {
      setIsModalOpen(false)
  }


  const getAllClients = () =>{
      axios
      .get('http://localhost:3000/clientes')
      .then((response) => setAllClients(response.data))
      .catch((error) => console.log(error))
  }

  {/** agora vamos usar o search */}
  const getClientRazaoSocial = (razaoSocial) =>{
    let data = {
        "razaoSocial": razaoSocial
    }
    axios
    .post('http://localhost:3000/clienteRazaoSocial', data)
    .then((response) => setAllClients(response.data))
    .catch((error) => console.log(error))
}

  useEffect(() => {
      getAllClients()
  }, [])

  
  return (
    <div className='container'>
      <Header handleOpenModal={handleOpenModal}/>
      <Painel getAllClients={getAllClients} allClients={allClients} getClientRazaoSocial={getClientRazaoSocial} />
      <Formulario isOpen={isModalOpen} onRequestClose={handleCloseModal} getAllClients={getAllClients}/>
    </div>
  )
}