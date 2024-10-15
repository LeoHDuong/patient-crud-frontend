import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios'; // Import axios for delete request

function DeleteAlert({ patientId, onPatientDeleted }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token'); // Get token for authorization

    try {
      await axios.delete(`http://localhost:8080/patients/${patientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOpen(false);
      onPatientDeleted(patientId); // Call the callback to update the UI
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  return (
    <React.Fragment>
      <button className="btn btn-danger mx-2" onClick={handleClickOpen} >
        Delete
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete this patient?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this patient? You will not be able to undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DeleteAlert;
