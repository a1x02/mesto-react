import React from 'react'
import headerLogo from '../images/header__logo.svg'

function Header () {
    return (
        <header className="header">
            <img className="header__logo" alt="логотип Mesto" src={headerLogo} />
        </header>
    )
}

export default Header