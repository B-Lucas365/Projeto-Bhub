import logo from '../../assets/Logo.svg'

import './styles.scss'

export const Header = ({handleOpenModal}) => {

    return (
        <header>
            <img src={logo} alt="logo" />
            <button type='button' onClick={handleOpenModal}>
                Cadastrar Cliente
            </button>
        </header>
    )
}