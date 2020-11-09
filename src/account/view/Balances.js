import NavbarMenu from '../components/NavbarMenu';
import React from 'react';
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
   
  var arr =  [
    {
        amount: '1000',
        currency: 'USD'
    },
    {
        amount: '432',
        currency:'EUR'
    }
];
  
 const Balances = () => {
     const classes = useStyles();
   
     return (
      <>
      <NavbarMenu/>
         <Container maxWidth={false}>
           <Grid
             container
             spacing={3}
           >
           {
          arr.map((ObjectMapped, index) => (
            <Grid
             item
             lg={3} 
             sm={6}
             xl={3}
             xs={12}
           >
           <Balance amount = {ObjectMapped.amount} currency = {ObjectMapped.currency} />
          </Grid>
          ))
          } 
           </Grid>
         </Container>
         </>
     );
   };
   
   export default Balances;