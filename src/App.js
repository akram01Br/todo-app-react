import logo from "./logo.svg";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import ToDoList from "./components/ToDoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
const theme = createTheme({
  typography: {
    fontFamily: ["Smooch"],
  },
  palette :{
    primary : {
      main :"#dd2c00"
    }
  }
});


const initialTodos = [
  {
    id: uuidv4(),
    title: "Learn React Flexbox",
    details:
      "Practice using display: flex to center elements and build responsive layouts in React.",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Build a Todo App",
    details:
      " Description: Create a task manager with add and delete functionality using React state..",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "Create a Responsive Navbar",
    details: "Build a mobile-friendly navigation bar using Flexbox and CSS",
    isCompleted: false,
  },
];
function App() {
    const [todos, setToDos] = useState(initialTodos);
  
  return (
    <ThemeProvider theme={theme}>
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#191b1f",
        height: "100vh",
      }}
    >
<TodosContext.Provider value ={{todos, setToDos}}>

<ToDoList />
</TodosContext.Provider>
      
    </div>
    </ThemeProvider>
  );
}

export default App;
