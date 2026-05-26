import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

// outhers

import { v4 as uuidv4 } from "uuid";

import { useContext, useState, useEffect } from "react";
import { TodosContext } from "../contexts/todosContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
//  Components
import ToDo from "./ToDo";

export default function TodoList() {
  const { todos, setToDos } = useContext(TodosContext);

  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  // filteration arrays
  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });
  let todoToBeRendered = todos;
  if (displayedTodosType == "completed") {
    todoToBeRendered = completedTodos;
  }else if (displayedTodosType == "non-completed")
  {
    todoToBeRendered =notCompletedTodos
  }else{
    todoToBeRendered = todos
  }
  const todosJSX = todoToBeRendered.map((t) => {
    return <ToDo key={t.id} todo={t} />;
  });

  useEffect(() => {
    console.log("calling use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setToDos(storageTodos);
  }, []);
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setToDos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  // const storageTodos = JSON.parse(localStorage.getItem("todos"));
  // setToDos(storageTodos);
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }} style ={{
        maxHeight: "80vh",
        overflow: "scroll",


      }}>
        <CardContent>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            To Do List
            <Divider />
          </Typography>

          {/* FILTER Buttons */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="non-completed" aria-label="right aligned">
              Unfinished
            </ToggleButton>
            <ToggleButton value="completed" aria-label="centered">
              Finished
            </ToggleButton>
            <ToggleButton value="all" aria-label="left aligned">
              All Task
            </ToggleButton>
          </ToggleButtonGroup>

          {/* ======= FILTER Buttons */}

          {/* ALL TODOS */}
          {todosJSX}

          {/*========= ALL TODOS */}

          {/* =INPUT  + ADD BUTTON====== */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                style={{ width: "100%", height: "100%" }}
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length==0}
              >
                Add Task
              </Button>
            </Grid>
            <Grid
              size={8}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {" "}
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="Task Name"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          {/* =====INPUT  + ADD BUTTON====== */}
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Container>
  );
}
