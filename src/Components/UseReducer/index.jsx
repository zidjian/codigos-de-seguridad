import { useEffect, useReducer } from "react";
import PropTypes from "prop-types";

const SECRETO = "wali";

const initialState = {
    valor: "",
    loading: false,
    error: false,
    eliminado: false,
    confirmadoconfirmed: false,
};

export function UseReducer({ nombre }) {
    // Usamos el propTypes para validar los props que lleguen a nuestro componente
    UseReducer.propTypes = {
        nombre: PropTypes.string,
    };

    const [estado, dispatch] = useReducer(reducer, initialState);
    const { valor, error, loading, confirmado, eliminado } = estado;

    useEffect(() => {
        // console.log("Inicio de proceso");
        if (loading) {
            setTimeout(() => {
                console.log("setTimeout iniciado");
                if (SECRETO !== valor) {
                    dispatch({
                        tipo: "ERROR",
                    });
                } else {
                    dispatch({
                        tipo: "WRITE",
                    });
                }
            }, 2000);
        }
    }, [loading]);

    if (!confirmado && !eliminado) {
        return (
            <>
                <h2>Eliminar {nombre}</h2>
                <p>Por favor, escribe el código de seguridad.</p>

                {/* Usamos directamente "error" para acceder al valor de nuestro estado  */}
                {error && !loading && <p>Error: el código es incorrecto</p>}
                {loading && <p>Cargando...</p>}

                <input
                    type="text"
                    placeholder="Código de seguridad"
                    value={valor}
                    onChange={(evento) =>
                        dispatch({
                            tipo: "UPDATE",
                            payload: evento.target.value,
                        })
                    }
                />

                {/* Usamos setError() para actulizar el valor de nuestro estado */}
                <button onClick={() => dispatch({ tipo: "LOADING" })}>
                    Comprobar
                </button>
            </>
        );
    } else if (confirmado && !eliminado) {
        return (
            <>
                <p>Estas seguro?</p>
                <button
                    onClick={() => {
                        dispatch({ tipo: "CONFIRM" });
                    }}
                >
                    Si, estoy seguro.
                </button>
                <button
                    onClick={() => {
                        dispatch({ tipo: "REVERSE" });
                    }}
                >
                    No, estoy seguro.
                </button>
            </>
        );
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button
                    onClick={() => {
                        dispatch({ tipo: "RESET" });
                    }}
                >
                    Reiniciar
                </button>
            </>
        );
    }
}

function reducerObject(estado, payload) {
    return {
        LOADING: {
            ...estado,
            loading: true,
        },
        WRITE: {
            ...estado,
            error: false,
            loading: false,
            confirmado: true,
        },
        ERROR: {
            ...estado,
            error: true,
            loading: false,
        },
        UPDATE: {
            ...estado,
            valor: payload,
        },
        CONFIRM: {
            ...estado,
            eliminado: true,
        },
        REVERSE: {
            ...estado,
            confirmado: false,
            valor: "",
        },
        RESET: {
            ...initialState,
        },
    };
}

function reducer(estado, accion) {
    if (reducerObject(estado)[accion.tipo]) {
        return reducerObject(estado, accion.payload)[accion.tipo];
    } else {
        return estado;
    }
}
