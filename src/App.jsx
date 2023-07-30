import { UseReducer } from "./Components/UseReducer";
import { UseState } from "./Components/UseState";

function App() {
    return (
        <>
            <UseState nombre="Use State" />
            <UseReducer nombre="Use Reducer" />
        </>
    );
}

export default App;
