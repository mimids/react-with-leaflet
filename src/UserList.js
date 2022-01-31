import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { Link } from "react-router-dom";
import User from './User'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
}));

export default function UserList() {
  const classes = useStyles();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    UsersGet()
  }, [])
  
  const UsersGet = () => {
    fetch("http://localhost:3001/user")
      .then(res => res.json())
      .then(
        (result) => {
          setUsers(result)
        }
      )
  }

  const UpdateUser = id => {
    window.location = '/update/'+id
  }

  const UserDelete = id => {
    var data = {
      'id': id
    }
    fetch('http://localhost:3001/user/'+id, {
      method: 'DELETE',
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        alert(result['message'])
        if (result['status'] === 'ok') {
          UsersGet();
        }
      }
    )
  }

  return (
    <div className={classes.root}>
      <Container className={classes.container} maxWidth="lg">    
        <Paper className={classes.paper}>
          <Box display="flex">
            <Box flexGrow={1}>
              <Typography component="h2" variant="h6" color="primary" gutterBottom>
                USERS
              </Typography>
            </Box>
            <Box>
              <Link to="/create">
                <Button variant="contained" color="primary">
                  CREATE
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Position</TableCell>
                <TableCell align="left" size='small'>First Name</TableCell>
                <TableCell align="left">Last Name</TableCell>
                <TableCell align="left">birthday</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell align="right"><User positionlat={user.lat} positionlng={user.lng} firstname={user.firstname} lastname={user.lastname} /></TableCell>
                  <TableCell align="left">{user.firstname}</TableCell>
                  <TableCell align="left">{user.lastname}</TableCell>
                  <TableCell align="left">{user.birthday}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup color="primary" aria-label="outlined primary button group">
                      <Button onClick={() => UpdateUser(user._id)}>Edit</Button>
                      <Button onClick={() => UserDelete(user._id)}>Del</Button>
                    </ButtonGroup>
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
      </Container>
    </div>
    
  );
}