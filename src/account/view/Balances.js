import NavbarMenu from '../components/NavbarMenu';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Balance } from './Balance';

const useStyles = makeStyles((theme) => ({
     root: {
       backgroundColor: theme.palette.background.dark,
       minHeight: '100%',
       paddingBottom: theme.spacing(3),
       paddingTop: theme.spacing(3)
     }
   }));



 const Balances = () => {
     const classes = useStyles();
     const [arr, setData] = useState({ data: [] });
     useEffect(() => {
      async function fetchData() {
       
        const res = await fetch('https://cors-anywhere.herokuapp.com/http://159.224.16.138:8000/assistant/balance', {
        method: 'GET',
        headers: {
        'token': localStorage.getItem('token'),
        'user-id': localStorage.getItem('user-id')
        }
        });       
          return res;
       }

      let fun = fetchData().then(
        res=>{
          let promise = res.json(); 
          promise.then(
          r => {
            setData(r);
           });
        }
      );
    }, []);

     return (
      <>
      <NavbarMenu/>
         <Container maxWidth={false}>
           <Grid
             container
             spacing={3}
           >
           {
          arr.data.map((ObjectMapped) => (
            <Grid
             item
             lg={3} 
             sm={6}
             xl={3}
             xs={12}
           >
           <Balance amount = "100" currency = {ObjectMapped.attributes.currency} />
          </Grid>
          ))
          } 
           </Grid>
         </Container>
         </>
     );
     
   };
   
   export default Balances;
