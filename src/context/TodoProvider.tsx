import React, { createContext, ReactNode } from "react";
import { useReducer, useContext } from "react";

export type Item = {
    id: string;
    title: string;
    completed: boolean;
};

const initialTodos: Item[] = [];

type Action =
    | { type: "ADD_NEW_TODO"; payload: Item }
    | { type: "DELETE_TODO"; payload: string }
    | { type: "TOGGLE_TODO"; payload: string }
    | { type: "UPDATE_TODO"; payload: { id: string; updatedTodo: string } };

type TodoContextType = {
    todoTask: Item[];
    dispatch: React.Dispatch<Action>;
    addNewTodo: (newTask: Item) => void;
    deleteTodo: (id: string) => void;
    toggleTodo: (id: string) => void;
    updateTodo: (id: string, updatedTodo: string) => void;
};

//==> creating context
const TodoContext = createContext<TodoContextType | undefined>(undefined);

//==> reducer function
function reducer(state: Item[], action: Action) {
    switch (action.type) {
        case "ADD_NEW_TODO": 
            return [...state, action.payload];
        case "UPDATE_TODO":
            return state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, title: action.payload.updatedTodo };
                }
                return todo;
            });
        case "DELETE_TODO":
            return state.filter((todo) => todo.id !== action.payload);
        case "TOGGLE_TODO":
            return state.map((todo) => {
                if (todo.id === action.payload) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            });
        default:
            return state;
    }
}

type TodoProviderProps = {
    children: ReactNode;
};


//==================== component ============================
function TodoProvider({ children }: TodoProviderProps) {
    const [todoTask, dispatch] = useReducer(reducer, initialTodos);

    const addNewTodo = (newTask: Item) => {
        dispatch({
            type: "ADD_NEW_TODO",
            payload: newTask,
        });
    };

    const deleteTodo = (id: string) => {
        dispatch({
            type: "DELETE_TODO",
            payload: id,
        });
    };

    const toggleTodo = (id: string) => {
        dispatch({
            type: "TOGGLE_TODO",
            payload: id,
        });
    };

    const updateTodo = (id: string, updatedTodo: string) => {
        dispatch({
            type: "UPDATE_TODO",
            payload: { id: id, updatedTodo: updatedTodo },
        });
    };

    return (
        <>
            <TodoContext.Provider
                value={{
                    todoTask,
                    addNewTodo,
                    dispatch,
                    deleteTodo,
                    toggleTodo,
                    updateTodo,
                }}
            >
                {children}
            </TodoContext.Provider>
        </>
    );
}

//==> instead of importing "usecontext" and "TodoContext" in every component, we can directly use this function.
export function useTodo() {
    const obj = useContext(TodoContext);
    if (obj === undefined) {
        throw new Error("use Reducer must be used within a TodoProvider");
    }
    return obj;
}

export default TodoProvider;
