import { Component } from "react";
import PropTypes from "prop-types";

class ClassState extends Component {
    // Usamos el constructor para recibir en sus argumentos las propiedades que recibe el componente
    constructor(props) {
        // Pasamos a SUPER las propiedades que recibimos
        super(props);

        // this.state nos sirve para declarar en formato de objeto los estados
        this.state = {
            error: true,
        };
    }

    render() {
        return (
            <>
                <h2>Eliminar {this.props.nombre}</h2>
                <p>Por favor, escribe el código de seguridad.</p>

                {/* Usamos this.state.<nombre_estado> para acceder valor al estado */}
                {this.state.error && <p>Error: el código es incorrecto</p>}

                <input type="text" placeholder="Código de seguridad" />

                {/* Usamos this.setState() para actulizar valores al estado y dentro en formato de objeto le pasamos los valores actualizados de nuestro estado */}
                <button
                    onClick={() => this.setState({ error: !this.state.error })}
                >
                    Comprobar
                </button>
            </>
        );
    }
}

// Usamos el propTypes para validar los props que lleguen a nuestro componente
ClassState.propTypes = {
    nombre: PropTypes.string,
};

export { ClassState };
