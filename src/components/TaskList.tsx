import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
  function handleCreateNewTask() {
    if (!newTaskTitle) return; /* não cria uma task com o valor vazio ('') e interrompe o resto do codigo. */
    const newTask = {
      id: Math.random(), // gera um numero aleatorio
      title: newTaskTitle,
      isComplete: false, // a gente quer adicionar um task que não esta completa
    }

    setTasks(oldState => [...oldState, newTask]); // funcao de callback
    setNewTaskTitle(''); // quando quiser resetar o input para add um novo to.do
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID:
    /* Raciocínio:
        1 - Id da task
        2 - precisa ir no array de tasks e mapear todas as tasks
        3 - pegar a task que tem aquele id especifico
        4 - alterar o valor da task (true ou false) => if ternario
        5 - setar como novo estado no newTasks
    */
    const newTasks = tasks.map(task => task.id === id ? {
      ...task,
      isComplete: !task.isComplete // sobrescrevendo a propriedade do array task
    } : task);

    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID  = ele manter as tasks diferentes do id que a gente removeu
    const filteredTask = tasks.filter(task => task.id !== id);
    /* console.log("Id removido", id);
    console.log("Array com os IDs mantidos na list:", filteredTask); */
    setTasks(filteredTask); //  sempre cria um novo estado, ao invés de editar o estado existente no useState<Task[]>([]);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16} />
              </button>
            </li>
          ))}

        </ul>
      </main>
    </section>
  )
}