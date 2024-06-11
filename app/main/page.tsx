'use client';
import { useState, useEffect } from "react";

interface Task {
  id: number;
  title: string;
  detail: string;
}

export default function Main() {
  const [todoList, setTodoList] = useState<Task[]>([{
    id: 1,
    title: 'test-01',
    detail: 'detail-01'
  }])
  const [inProgressList, setInProgressList] = useState<Task[]>([])
  const [doneList, setDoneList] = useState<Task[]>([])
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTitleTodo, setNewTitleTodo] = useState('')
  const [newDetailTodo, setNewDetailTodo] = useState('')

  useEffect(() => {
    console.log('todoListtodoList', todoList);
  }, [todoList]);

  const showAddTaskModal = () => {
    console.log('click !!');
    setShowAddTask(!showAddTask)
  }

  const addTodo = () => {
    setTodoList([
      ...todoList, 
      {
        id: todoList[todoList.length - 1].id + 1,
        title: newTitleTodo,
        detail: newDetailTodo
      }
    ])
    
    setNewTitleTodo('')
    setNewDetailTodo('')
    setShowAddTask(false)
  }

  const deleteTask = (type: string, id: number) => {
    console.log('ddd', id);
    
    if (type === 'todo') {
      const updateTodolist = todoList.filter((item, index) => item.id !== id)
      console.log('updateTodolist', updateTodolist);
      setTodoList(updateTodolist)
    }
  }

  const changeItemType = (changeTo: string, id: number) => {
    if (changeTo == 'toDo') {
      const updateInProgressList = inProgressList.filter((item, index) => item.id !== id)
      setInProgressList(updateInProgressList)

      const updateTodolist = inProgressList.find((item) => item.id == id)
      setTodoList([...todoList, updateTodolist])
    }
    if (changeTo == 'inProgress') {
      const updateTodolist = todoList.filter((item, index) => item.id !== id)
      setTodoList(updateTodolist)
      
      const updateInProgressList = todoList.find((item) => item.id == id)
      setInProgressList([...inProgressList, updateInProgressList])
    }
    if (changeTo == 'done') {
      const updateInProgressList = inProgressList.filter((item, index) => item.id !== id)
      setInProgressList(updateInProgressList)
      
      const updateDoneList = inProgressList.find((item) => item.id == id)
      setDoneList([...doneList, updateDoneList])
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="mb-4">
        <p className="text-3xl ">Todo List</p>
      </div>
      <div className="flex w-full h-full items-center justify-around">
        <div className="w-1/4 min-h-[500px] border border-black rounded items-center">
          <p className="p-2 text-center border-b border-black">Todo</p>
          {
            todoList.map((item, index) => (
              <div 
                key={index} 
                className={`py-3 px-4 border-b border-black" ${
                  index > 0 ? 'border-t-0' : ''
                }
                `}
                style={{ borderColor: 'black'}}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p>{item.title}</p>
                    <p>{item.detail}</p>
                  </div>
                  <div>
                    <button onClick={() => changeItemType('inProgress', item.id)}>{`=>`}</button>
                    <button onClick={() => deleteTask('todo', item.id)}>X</button>
                  </div>
                </div>
              </div>
            ))
          }
          <div>
            <p className="text-2xl text-center hover:cursor-pointer" onClick={showAddTaskModal}>+</p>
          </div>
        </div>
        <div className="w-1/4 min-h-[500px] border border-black rounded items-center">
          <p className="p-2 text-center border-b border-black">In progress</p>
          {
            inProgressList.map((item, index) => (
              <div 
                key={index} 
                className={`py-3 px-4 border-b border-black" ${
                  index > 0 ? 'border-t-0' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p>{item.title}</p>
                    <p>{item.detail}</p>
                  </div>
                  <div>
                    <button onClick={() => changeItemType('done', item.id)}>{`=>`}</button>
                    <button onClick={() => deleteTask('inProgress', item.id)}>X</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="w-1/4 min-h-[500px] border border-black rounded items-center">
          <p className="p-2 text-center border-b border-black">Done</p>
          {
            doneList.map((item, index) => (
              <div 
                key={index} 
                className={`py-3 px-4 border-black border-b " ${
                  index > 0 ? 'border-t-0' : ''
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <p>{item.title}</p>
                    <p>{item.detail}</p>
                  </div>
                  <div>
                    <button onClick={() => deleteTask('done', item.id)}>X</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>

      {
        showAddTask && 
        <div className="fixed left-0 top-0 z-[999] w-full h-full bg-black bg-opacity-50">
          <div className="relative mt-36 mx-auto p-8 w-1/3 h-2/5 bg-white rounded-lg border-1">
            <p className="text-xl text-center mb-8">Add Todo</p>
            <button className="absolute top-0 right-0 mt-3 mr-6" onClick={() => setShowAddTask(false)}>X</button>
            <div className="flex items-center">
              <p className="w-1/3">หัวข้อ :</p>
              <input 
                type="text" 
                value={newTitleTodo} 
                className="text-black border border-1 rounded ml-2 px-2 py-1"
                onChange={(e) => setNewTitleTodo(e.target.value)}
              />
            </div>
            <div className="mt-2 flex items-center">
              <p className="w-1/3">รายละเอียด :</p>
              <input 
                type="text" 
                value={newDetailTodo} 
                onChange={(e) => setNewDetailTodo(e.target.value)}
                className="text-black border border-1 rounded ml-2 px-2 py-1"
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button onClick={addTodo} className="border border-black border-2 rounded py-1 px-6">เพิ่ม</button>
            </div>
          </div>
        </div>
      }
    </main>
  );
}
