import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useTodosDispatch } from "../contexts/todosContext";
import TextField from "@mui/material/TextField";
import { ToastContext, useToast } from "../contexts/ToastContext";

// Icon Import
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";


export default function ToDo({ todo, handleCheck, showDelete, showUpdate }) {

  const dispatch = useTodosDispatch();
  const { showHideToast} = useToast();
  //  EVENT HANDLERS
  function handelCheckClick() {
    dispatch({type:"toggledCompleted", payload: todo })
   if (todo.isCompleted) {
      showHideToast("Task completed 🎉", "success");

  } else {
      showHideToast("Task marked as incomplete ↩️");
  }
  }
  //  ==>EVENT HANDLERS
  {
    /*===== >DELETE MODAL */
  }
  function handleDeletClick() {
    showDelete(todo);
  }

  function handleUpdateClick() {
    showUpdate(todo);
  }
  return (
    <>
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
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
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
