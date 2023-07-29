import { Component } from "react";
import PropTypes from "prop-types";
import { Loading } from "../Loading";

const SECRETO = "wali";

class ClassState extends Component {
    // Usamos el constructor para recibir en sus argumentos las propiedades que recibe el componente
    constructor(props) {
        // Pasamos a SUPER las propiedades que recibimos
        super(props);

        // this.state nos sirve para declarar en formato de objeto los estados
        this.state = {
            valor: "",
            error: false,
            loading: false,
        };
    }

    componentDidMount() {
        console.log("componentDidMount");
    }

    componentDidUpdate() {
        console.log("componentDidUpdate");
        if (this.state.loading) {
            // this.setState({error: false});
            setTimeout(() => {
                console.log("setTimeout iniciado");
                if (SECRETO !== this.state.valor) {
                    this.setState({error: true, loading: false});
                } else {
                    this.setState({error: false, loading: false});
                }
            }, 2000);
        }
    }

    render() {
        return (
            <>
                <h2>Eliminar {this.props.nombre}</h2>
                <p>Por favor, escribe el código de seguridad.</p>

                {/* Usamos this.state.<nombre_estado> para acceder valor al estado */}
                {(this.state.error && !this.state.loading) && <p>Error: el código es incorrecto</p>}
                {this.state.loading && <Loading />}

                <input
                    type="text"
                    placeholder="Código de seguridad"
                    value={this.state.valor}
                    onChange={(event) =>
                        this.setState({ valor: event.target.value })
                    }
                />

                {/* Usamos this.setState() para actulizar valores al estado y dentro en formato de objeto le pasamos los valores actualizados de nuestro estado */}
                <button
                    onClick={() =>
                        this.setState({ loading: !this.state.loading })
                    }
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
