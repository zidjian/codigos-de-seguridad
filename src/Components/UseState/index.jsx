import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const SECRETO = "wali";

export function UseState({ nombre }) {
    // Usamos el propTypes para validar los props que lleguen a nuestro componente
    UseState.propTypes = {
        nombre: PropTypes.string,
    };

    // Declaramos un estado [error, setError] el cual el primero sirve para obtener el valor y el segundo para actulizar el valor
    // Además, useState(true) sirve para asignar un estado con el valor inical de true
    const [valor, setValor] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [confirmado, setConfirmado] = useState(false);
    const [eliminado, setEliminado] = useState(false);

    function onWrite() {
        setError(false);
        setLoading(false);
        setConfirmado(true);
    }

    function onError() {
        setError(true);
        setLoading(false);
    }

    function onUpdate(nuevoValor) {
        setValor(nuevoValor);
    }

    function onConfirm() {
        setEliminado(true);
    }

    function onReverse() {
        setConfirmado(false);
        setValor("");
    }

    function onReset() {
        setEliminado(false);
        setConfirmado(false);
        setValor("");
    }

    useEffect(() => {
        // console.log("Inicio de proceso");
        if (loading) {
            setTimeout(() => {
                console.log("setTimeout iniciado");
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
                    onChange={(evento) => onUpdate(evento.target.value)}
                />

                {/* Usamos setError() para actulizar el valor de nuestro estado */}
                <button onClick={() => setLoading(true)}>Comprobar</button>
            </>
        );
    } else if (confirmado && !eliminado) {
        return (
            <>
                <p>Estas seguro?</p>
                <button
                    onClick={() => {
                        onConfirm();
                    }}
                >
                    Si, estoy seguro.
                </button>
                <button
                    onClick={() => {
                        onReverse();
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
                        onReset();
                    }}
                >
                    Reiniciar
                </button>
            </>
        );
    }
}
