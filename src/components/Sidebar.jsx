import React, { useContext } from 'react';
import { Button, Grid, Typography, Container, Paper, List, ListItem, ListItemText, TextField } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  gridContainer: {
    width: '100%',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  container: {
    width: '600px',
    margin: '35px 0',
    padding: 0,
    [theme.breakpoints.down('xs')]: {
      width: '80%',
    },
  },
  margin: {
    marginTop: 20,
  },
  padding: {
    padding: 20,
  },
  paper: {
    padding: '10px 20px',
    border: '2px solid black',
  },
}));

const Sidebar = ({ children }) => {
  const { me, name, setName, callUser, leaveCall, callAccepted, users, } = useContext(SocketContext);
  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Paper elevation={10} className={classes.paper}>
        <form className={classes.root} noValidate autoComplete="off">
          <Grid container className={classes.gridContainer}>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me} className={classes.margin}>
                <Button variant="contained" color="primary" fullWidth startIcon={<Assignment fontSize="large" />}>
                  Copy Your ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6} className={classes.padding}>
              <Typography gutterBottom variant="h6">Users in Meeting</Typography>
              <List>
                {users.map((user) => (
                  user.id !== me && (
                    <ListItem key={user.id} button onClick={() => callUser(user.id)}>
                      <ListItemText primary={user.id} />
                      <Phone fontSize="large" />
                    </ListItem>
                  )
                ))}
              </List>
            </Grid>
          </Grid>
        </form>
        {callAccepted && (
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            startIcon={<PhoneDisabled fontSize="large" />}
            onClick={leaveCall}
            className={classes.margin}
          >
            Hang Up
          </Button>
        )}
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;
