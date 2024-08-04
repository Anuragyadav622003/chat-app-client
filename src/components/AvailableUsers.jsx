import React, { useContext, useEffect, useState } from 'react';
import { Grid, Avatar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SocketContext } from '../Context';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    userCard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px',
        padding: '10px',
        border: '1px solid black',
        borderRadius: '10px',
    },
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    genderIndicator: {
        marginTop: '-10px',
    },
}));

const AvailableUsers = () => {
    const classes = useStyles();
    const { availableUsers, callUser } = useContext(SocketContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch the list of available users from the server
        fetch('http://localhost:5000/availableUsers')
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, [availableUsers]);

    return (
        <Grid container className={classes.container}>
            {users.map((user) => (
                <Grid item key={user.id} className={classes.userCard}>
                    <Avatar className={classes.avatar}>{user.name[0]}</Avatar>
                    <Typography>{user.name}</Typography>
                    <Typography className={classes.genderIndicator}>{user.gender}</Typography>
                    <Button variant="contained" color="primary" onClick={() => callUser(user.id)}>
                        Call
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
};

export default AvailableUsers;
