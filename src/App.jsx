import { ClassState } from "./Components/ClassState";
import { UseState } from "./Components/UseState";

function App() {
    return <>
        <UseState nombre="UseState" />
        <ClassState nombre="ClassState" />
    </>;
}

export default App;
