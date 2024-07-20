import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodo } from "../context/TodoProvider";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

type TodoFormProps = {
    setShowInputModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const schema = z.object({
    newTodo: z.string().refine((value) => value.trim().length > 0, {
        message: "Input field is Empty!! Please fill above input field",
    }),
});
type FormData = z.infer<typeof schema>;

function TodoForm({ setShowInputModal }: TodoFormProps) {
    const { addNewTodo } = useTodo();

    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const handleData = (data: FormData) => {
        const newTodo= {
            id: crypto.randomUUID(),
            title: data.newTodo,
            completed: false,
        };
        addNewTodo(newTodo);
        toast.info("Your new todo is added successfulluy");
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ newTodo: "" });
        }
    }, [formState , isSubmitSuccessful , reset]);

    return (
        <div className="h-[100%] w-[100%] py-8 px-6 ">
            <RxCross1
                className="ml-auto hover:cursor-pointer"
                onClick={() => {
                    setShowInputModal(false);
                }}
                size="1.5rem"
            />
            <h1 className="text-center text-md sm:text-2xl underline mx-4 mt-10">Add New Todo</h1>
            <form
                action=""
                onSubmit={handleSubmit(handleData)}
                className=" px-4 pt-4 flex md:flex-row flex-col gap-4"
            >
                <input
                    placeholder="Your new todo here"
                    type="text"
                    {...register("newTodo")}
                    className="border-solid border-black border-[2px] outline-none text-xs sm:text-base p-2 rounded-xl flex-1"
                    autoComplete="off"
                />
                <button type="submit" className="btn mx-2 text-[10px] sm:text-xs">
                    Add
                </button>
            </form>
            {/* ======> Handeling error messages below */}
            {errors.newTodo && (
                <p className="px-4 text-red-600">{errors.newTodo.message}</p>
            )}
        </div>
    );
}

export default TodoForm;
