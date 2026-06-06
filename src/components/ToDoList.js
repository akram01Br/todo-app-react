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
// DIALOG IMPORT
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// outhers

import { v4 as uuidv4 } from "uuid";

import { useContext, useState, useEffect, useMemo, useReducer } from "react";

import todosReducer from "../reducers/todosReducer";
import { useTodos, useTodosDispatch ,TodosContext} from "../contexts/todosContext";
import { ToastContext } from "../contexts/ToastContext";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
//  Components
import ToDo from "./ToDo";

export default function TodoList() {
  console.log("re render");
  const { todos2, setToDos } = useContext(TodosContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [dialogTodo, setDialogTodo] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const { showHideToast } = useContext(ToastContext);

  const [showupdateDialog, setShowUpdateDialog] = useState(false);

  const todos = useTodos();
  const dispatch = useTodosDispatch();
  // filteration arrays

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling completed Todos");
      return t.isCompleted;
    });
  }, [todos]);
  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      console.log("calling  Not completed Todos");

      return !t.isCompleted;
    });
  }, [todos]);

  let todoToBeRendered = todos;
  if (displayedTodosType == "completed") {
    todoToBeRendered = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todoToBeRendered = notCompletedTodos;
  } else {
    todoToBeRendered = todos;
  }

  useEffect(() => {
    dispatch({ type: "get" });
  }, []);
  //handelers

  function openUpdateDialog(todo) {
    setDialogTodo(todo);
    setShowUpdateDialog(true);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleUpdateConfirm() {
    dispatch({ type: "updated", payload: dialogTodo });
    setShowUpdateDialog(false);
    showHideToast("updated");
  }
  const todosJSX = todoToBeRendered.map((t) => {
    return (
      <ToDo
        key={t.id}
        todo={t}
        showDelete={openDeleteDialog}
        showUpdate={openUpdateDialog}
      />
    );
  });

  function openDeleteDialog(todo) {
    setDialogTodo(todo);
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }
  function handleDeleteConfirm() {
    dispatch({ type: "deleted", payload: dialogTodo });
    setShowDeleteDialog(false);
    showHideToast("Task deleted successfully");
  }
  function handleAddClick() {
    dispatch({ type: "added", payload: { newTitle: titleInput } });

    setTitleInput("");
    showHideToast("Task added successfully ");
  }

  // const storageTodos = JSON.parse(localStorage.getItem("todos"));
  // setToDos(storageTodos);
  return (
    <>
      {/*===== DELETE DIALOG */}
      <Dialog
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this post?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You can't undo this action after deleting this post.{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm}>Delete Post</Button>
        </DialogActions>
      </Dialog>
      {/*=====> DELETE DIALOG */}

      <Container maxWidth="sm">
        <Card
          sx={{ minWidth: 275 }}
          style={{
            maxHeight: "80vh",
            overflow: "scroll",
          }}
        >
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
                  disabled={titleInput.length == 0}
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
      {/* UPDATE DIALOG */}
      <Dialog
        onClose={handleUpdateClose}
        open={showupdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to update this post?"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Task Name"
            fullWidth
            variant="standard"
            value={dialogTodo.title}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Task Details"
            fullWidth
            variant="standard"
            value={dialogTodo.details}
            onChange={(e) => {
              setDialogTodo({ ...dialogTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handleUpdateConfirm}>update Post</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
