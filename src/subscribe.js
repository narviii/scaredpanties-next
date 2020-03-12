import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography'

const axios = require('axios');






export function Subscribe(props) {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubscribe = () => {
    axios.get('/api/subscribe', {
      params: {
        email: email
      }
    })
      .catch(function (error) {
        console.log(error);
      })
    setOpen(false);
  };
  
  return (
    <div style={{ display: "inline-block" }}>
      {(props.butToggle)?<Button size="large"   onClick={handleClickOpen}>Subscribe</Button>:<Typography onClick={handleClickOpen}>SUBSCRIBE</Typography>}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe to catalog updates</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Leave your email and i will let you know when something new will pop up
          </DialogContentText>
          <TextField
            value={email}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            style={{ color: "white" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubscribe} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
