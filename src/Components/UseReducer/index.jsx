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

// Se crea la variable actionTypes para que funcione como un model de TypeScript y que al usarlo sea mas dificil equivocarnos
const actionTyoes = {
    loading: "LOADING",
    write: "WRITE",
    error: "ERROR",
    update: "UPDATE",
    confirm: "CONFIRM",
    reverse: "REVERSE",
    reset: "RESET",
};

export function UseReducer({ nombre }) {
    // Usamos el propTypes para validar los props que lleguen a nuestro componente
    UseReducer.propTypes = {
        nombre: PropTypes.string,
    };

    const [estado, dispatch] = useReducer(reducer, initialState);
    const { valor, error, loading, confirmado, eliminado } = estado;

    // Trabajo con el paradigma declarativo
    function onLoading() {
        dispatch({
            tipo: actionTyoes.loading,
        });
    }

    function onWrite() {
        dispatch({
            tipo: actionTyoes.write,
        });
    }

    function onError() {
        dispatch({
            tipo: actionTyoes.error,
        });
    }

    function onUpdate(event) {
        dispatch({
            tipo: actionTyoes.update,
            payload: event.target.value,
        });
    }

    function onConfirm() {
        dispatch({
            tipo: actionTyoes.confirm,
        });
    }

    function onReverse() {
        dispatch({
            tipo: actionTyoes.reverse,
        });
    }

    function onReset() {
        dispatch({
            tipo: actionTyoes.reset,
        });
    }

    useEffect(() => {
        // console.log("Inicio de proceso");
        if (loading) {
            setTimeout(() => {
                console.log("setTimeout iniciado");
                console.log(valor)
                if (SECRETO !== valor) {
                    onError();
                } else {
                    onWrite();
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
                    onChange={onUpdate}
                />

                {/* Usamos setError() para actulizar el valor de nuestro estado */}
                <button onClick={onLoading}>Comprobar</button>
            </>
        );
    } else if (confirmado && !eliminado) {
        return (
            <>
                <p>Estas seguro?</p>
                <button onClick={onConfirm}>Si, estoy seguro.</button>
                <button onClick={onReverse}>No, estoy seguro.</button>
            </>
        );
    } else {
        return (
            <>
                <p>Eliminado con éxito</p>
                <button onClick={onReset}>Reiniciar</button>
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
