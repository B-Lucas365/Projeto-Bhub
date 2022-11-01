import './styles.scss'
import iconButton from '../../assets/search-icon-white.svg'
import { useState, useEffect } from 'react'
import axios from 'axios'

import IconDelete from '../../assets/delete-icon.svg'

export const Painel = ({getAllClients, allClients, getClientRazaoSocial}) => {

    const [search, setSeach] = useState('')

    const deleteClient = (razaoSocial) => {
        axios
        .delete('http://localhost:3000/cliente', {data: {
            "razaoSocial": razaoSocial
        }})
        .then((response) => getAllClients())
        .catch((error) => console.log(error))
    }

    return(
        <main>
            <div className='search'>
                <h1>Painel admin</h1>
                <div className='search'>
                    <input type="text" value={search} onChange={(e) => setSeach(e.target.value)}/>
                    <button onClick={() => getClientRazaoSocial(search)}><img src={iconButton} alt="" /></button>
                </div>
            </div>

            <section className='clientes'>
                 <table>
                    <thead>
                        <tr>
                            <th>Razão Social</th>
                            <th>Telefone</th>
                            <th>Endereço</th>
                            <th>Faturamento</th>
                            <th>Dados bancarios</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {allClients && allClients.map((item, index) => (
                            <tr className='result' key={index}>
                                <td>{item.razao_social}</td>
                                <td>{item.telefone}</td>
                                <td>{item.endereco}</td>
                                <td>{item.faturamento_declarado}</td>
                                <td></td>
                                <td><img src={IconDelete} onClick={() => deleteClient(item.razao_social)}/></td>
                            </tr>
                        ))}
                    </tbody>
                 </table>
            </section>
        </main>
    )
}