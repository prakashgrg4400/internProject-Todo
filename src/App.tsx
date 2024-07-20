import TodoProvider from "./context/TodoProvider";
import TodoApp from "./components/TodoApp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <>
            <TodoProvider>
                <TodoApp />
                <ToastContainer
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={true}
                />
            </TodoProvider>
        </>
    );
}

export default App;
