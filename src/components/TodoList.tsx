import { useState } from "react";
import { useTodo } from "../context/TodoProvider";
import TodoItem from "./TodoItem";

type FilterOption = {
    type: string;
    id: number;
};
type ListByType = "All" | "Completed" | "Active" ;

function TodoList() {
    const { todoTask } = useTodo();

    const filterType: FilterOption[] = [
        { type: "All", id: 1 },
        { type: "Active", id: 2 },
        { type: "Completed", id: 3 },
    ];

    const [listBy, setListBy] = useState<ListByType>("All");

    const handleOptions = (e:React.ChangeEvent<HTMLSelectElement>)=>{
      setListBy(e.target.value as ListByType);
    }

    const filteredTodos  = todoTask.filter(todo=>{
      if(listBy==="All")return true;
      if(listBy==="Active")return !todo.completed;
      if(listBy==="Completed")return todo.completed;
    })
    
    return (
      <>
          <h2 className="mt-8 text-sm sm:text-xl font-medium text-gray-500 underline">
              My Todos List :{" "}
          </h2>
          <div className="flex justify-end gap-2 mb-2">
              <span className="text-sm sm:text-xl">Filter : </span>
              <select
                  className="outline-none border-2 border-gray-400 rounded-md text-xs sm:text-xl"
                  name="filterBy"
                  id=""
                  // value={listBy}
                  onChange={handleOptions}
              >
                  {filterType.map((opt) => {
                      return (
                          <option key={opt.id} value={opt.type}>
                              {opt.type}
                          </option>
                      );
                  })}
              </select>
          </div>
          <div className="p-4 flex flex-wrap gap-6 bg-gray-200  h-[60vh] overflow-auto shadow-md">
              {filteredTodos.length === 0 ? (
                  <p className="sm:text-2xl text:xl text-gray-900 font-bold m-auto opacity-20 text-center">
                      Your {listBy} Todos will be displayed here
                  </p>
              ) : (
                  filteredTodos.map((todo) => {
                      return <TodoItem {...todo} key={todo.id} />;
                  })
              )}
          </div>
      </>
  );
}

export default TodoList;

