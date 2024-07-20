import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import NewModal from "./UI/NewModal";


function TodoApp() {
  const [showInputModal , setShowInputModal] = useState<boolean>(false);

  useEffect(()=>{
    if (showInputModal) {
      document.documentElement.style.overflowY = "hidden";
    } else {
      document.documentElement.style.overflowY = "auto";
    }
  },[showInputModal])
 

  return (
    <div className=" w-[80%] p-4 max-w-[1000px] mx-auto h-screen shadow-xl">
        <h1 className="text-center text-xl sm:text-4xl font-semibold mt-4 mb-8">Todo Applications</h1>
        <button
            onClick={() => {
                setShowInputModal(true);
            }}
            className="btn mx-auto block sm:text-base text-xs "
        >
            Create New Todo
        </button>
        {showInputModal && (
            <NewModal setShowInputModal={setShowInputModal}>
                <TodoForm setShowInputModal={setShowInputModal} />
            </NewModal>
        )}
        <TodoList />
    </div>
);

}

export default TodoApp