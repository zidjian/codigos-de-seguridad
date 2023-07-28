import { useState } from "react";
import PropTypes from "prop-types";

export function UseState({ nombre }) {
    // Usamos el propTypes para validar los props que lleguen a nuestro componente
    UseState.propTypes = {
        nombre: PropTypes.string,
    };

    // Declaramos un estado [error, setError] el cual el primero sirve para obtener el valor y el segundo para actulizar el valor
    // Además, useState(true) sirve para asignar un estado con el valor inical de true
    const [error, setError] = useState(true);
    return (
        <>
            <h2>Eliminar {nombre}</h2>
            <p>Por favor, escribe el código de seguridad.</p>

            {/* Usamos directamente "error" para acceder al valor de nuestro estado  */}
            {error && <p>Error: el código es incorrecto</p>}

            <input type="text" placeholder="Código de seguridad" />

            {/* Usamos setError() para actulizar el valor de nuestro estado */}
            <button onClick={() => setError(!error)}>Comprobar</button>
        </>
    );
}
