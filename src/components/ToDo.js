import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";
import TextField from "@mui/material/TextField";

// Icon Import
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
// DIALOG IMPORT
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function ToDo({ todo, handleCheck }) {
  const [showupdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { todos, setToDos } = useContext(TodosContext);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  //  EVENT HANDLERS
  function handelCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setToDos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  //  ==>EVENT HANDLERS
  {
    /*===== >DELETE MODAL */
  }
  function handleDeletClick() {
    setShowDeleteDialog(true);
  }
  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }
  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }
  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != todo.id;
    });
    setToDos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: updatedTodo.title,
          details: updatedTodo.details,
        };
      } else return t;
    });
    setToDos(updatedTodos);
    setShowUpdateDialog(false);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }
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
            value={updatedTodo.title}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, title: e.target.value });
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
            value={updatedTodo.details}
            onChange={(e) => {
              setUpdatedTodo({ ...updatedTodo, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handleUpdateConfirm}>update Post</Button>
        </DialogActions>
      </Dialog>

      {/* +++>>UPDATE DIALOG */}
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            {/* Action Button */}
            <Grid
              size={4}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              {/*  CHECK ICON BUTTON */}
              <IconButton
                onClick={() => {
                  handelCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>
              {/* UPDATE BUTTON */}
              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#1769aa",
                  background: "white",
                  border: "solid #1769aa 3px",
                }}
              >
                <ModeEditOutlineOutlinedIcon />
              </IconButton>
              {/* ++++++++ UPDATE BUTTON */}

              {/* Delete Button */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#f33f3f",
                  background: "white",
                  border: "solid #f33f3f 3px",
                }}
                onClick={handleDeletClick}
              >
                <DeleteForeverOutlinedIcon />
              </IconButton>
              {/* ====Delete Button */}
            </Grid>
            {/* ===Action Button */}
            <Grid size={8}>
              <Typography variant="h5" sx={{ textAlign: "right" , textDecoration :todo.isCompleted ?"line-through" :"none" }}>
                {todo.title}
              </Typography>
              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {todo.details}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
