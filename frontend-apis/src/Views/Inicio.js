// src/Inicio.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Inicio.css';

function Inicio() {
    return (
        <div className="container">
            <div className="content">
                <h1>Ejemplo con RESTful</h1>
                </div>
            <div className="button-container">
                    <Link to="/button1"><button className="styled-button">Obtener datos</button></Link>
                </div>       
        </div>
    );
}

export default Inicio;
