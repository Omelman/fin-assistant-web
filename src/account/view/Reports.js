import React, {useEffect, useState} from 'react';
import generatePDFTrans from './reports/Transaction'
import generatePDFBalance from './reports/Balance'
import './balance.css'
import NavbarMenu from '../components/NavbarMenu';
import { Button } from '@material-ui/core'

export default function Report() {
     const [balances, setBalances] = useState([]);
     const [transactions, setTransactions] = useState([]);
     let newCol = {};
     
  
     useEffect(() => {
          async function getAllBalances() {
               const res = await fetch('http://159.224.16.138:8000/assistant/balance', {
               method: 'GET',
               headers: {
               'token': localStorage.getItem('token'),
               'user-id': localStorage.getItem('user-id')
               }
               });       
                 return res;
              }
         
       getAllBalances().then(
          res=>{  
            if (res.ok) {
            let promise = res.json(); 
            promise.then(
            r => {
              let newData = [];
              r.data.map((ObjectMapped, index) => (
                newData[index] = {
                  id: index + 1,
                  currency: ObjectMapped.attributes.currency,
                  amount: ObjectMapped.attributes.amount
                }
               
              ));
              r.data.map(ObjectMapped => (
               newCol[ObjectMapped.attributes.balance_id] = ObjectMapped.attributes.currency
             ))
              setBalances(newData);
          }
              )
          }})     
     }, []);

     useEffect(() => {
          async function getAllTransactions() {
               const res = await fetch('http://159.224.16.138:8000/assistant/transaction', {
               method: 'GET',
               headers: {
               'token': localStorage.getItem('token'),
               'user-id': localStorage.getItem('user-id')
               }
               });       
                 return res;
              }
         
       getAllTransactions().then(
          res=>{  
            if (res.ok) {
            let promise = res.json(); 
            promise.then(
            r => {
              let newData = [];
              r.data.map((ObjectMapped, index) => {
               if (ObjectMapped.attributes.include===undefined) ObjectMapped.attributes.include = "false";
                newData[index] = {
                  id: index + 1,
                  date: ObjectMapped.attributes.date,
                  amount: ObjectMapped.attributes.amount,
                  description: ObjectMapped.attributes.description,
                  include: ObjectMapped.attributes.include,
                  category: ObjectMapped.attributes.category,
                  currency: newCol[ObjectMapped.attributes.balance_id],
                }
               
               });
              setTransactions(newData);
          }
              )
          }})     
     }, []);

  return (
    <>
    <NavbarMenu/>
    <div>
      <div className="container mb-4 mt-4 p-3">
        <div className="row">
          
            <Button variant="contained" color="primary" onClick={() => generatePDFTrans(transactions)}>
            Generate transactions report
            </Button>

            <Button variant="contained" color="primary" onClick={() => generatePDFBalance(balances)}>
            Generate balance report
            </Button>
        </div>
      </div>
      
    </div>
    
    </>
  );
}
