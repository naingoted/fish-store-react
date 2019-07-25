import React from 'react';
import PropTyes from 'prop-types';
export default function Login(props) {
    return (
        <nav className="login">
          <h2> Inventory Login </h2>
          <p> Sign in to manage your store's Inventory.</p>
          <button className="facebook" onClick={() => props.authenticate("Facebook")}> login with facebook </button>
        </nav>
    )
}
Login.propTypes = {
    authenticate: PropTyes.func.isRequired
}