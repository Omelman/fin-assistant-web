import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import './balance.css'
import NavbarMenu from '../components/NavbarMenu';
import { format } from 'date-fns';

export default function Transaction() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: '#', field: 'id', type: 'numeric', editable: 'never' },
      { title: 'Amount', field: 'amount', type: 'numeric' },

      {
        title: 'Category',
        field: 'category',
        lookup: { food: 'Food & Drinks', transportation: 'Transportation', housing:'Housing',
        vehicle: 'Vehicle', entertainment: 'Life & Entertainment', communication: 'Communication & PC',
        shopping:'Shopping', expenses: 'Financial expenses', investment:'Investment', income: 'Income'
      },
      },
      { title: 'Desciption', field: 'description'},
      { title: 'Include', field: 'include', lookup: { true: 'true', false: 'false' }},
      { title: 'Date', field: 'date', type: 'date' },
    ],
    data: [],
  });

  let nData = [];
 useEffect(() => {
  async function fetchData() {
   
    const res = await fetch('http://159.224.16.138:8000/assistant/transaction', {
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
      if (res.ok) {
      let promise = res.json(); 
      promise.then(
      r => {
        r.data.map((ObjectMapped, index) => {
          if (ObjectMapped.attributes.include===undefined) ObjectMapped.attributes.include = "false";
          nData[index] = {
            id: index + 1,
            date: ObjectMapped.attributes.date,
            amount: ObjectMapped.attributes.amount,
            description: ObjectMapped.attributes.description,
            include: ObjectMapped.attributes.include,
            category: ObjectMapped.attributes.category,
            currency: ObjectMapped.attributes.balance_id,
            transaction_id: ObjectMapped.attributes.transaction_id,
          }
      })
      setState({...state,data:nData });
       
       });
    }
  }
  );
}, []);


useEffect(() => {
  async function fetchBal() {
     
    const res = await fetch('http://159.224.16.138:8000/assistant/balance', {
    method: 'GET',
    headers: {
    'token': localStorage.getItem('token'),
    'user-id': localStorage.getItem('user-id')
    }
    });       
      return res;
   }


fetchBal().then(
  res=>{
    let promise = res.json(); 
    promise.then(
    r => {
      let newCol = {};
      r.data.map(ObjectMapped => (
        newCol[ObjectMapped.attributes.balance_id] = ObjectMapped.attributes.currency
      ))
      setState({...state, columns:[
        { title: '#', field: 'id', type: 'numeric', editable: 'never' },
        { title: 'Amount', field: 'amount', type: 'numeric' },
        {
          title: 'Currency',
          field: 'currency',
          lookup: newCol,
        },
        {
          title: 'Category',
          field: 'category',
          lookup: { food: 'Food & Drinks', transportation: 'Transportation', housing:'Housing',
          vehicle: 'Vehicle', entertainment: 'Life & Entertainment', communication: 'Communication & PC',
          shopping:'Shopping', expenses: 'Financial expenses ',investment:'Investment', income: 'Income'
        },
        },
        { title: 'Desciption', field: 'description'},
        { title: 'Include', field: 'include',lookup: { true: 'true', false: 'false' }},
        { title: 'Date', field: 'date', type: 'date' },
      ], data:nData});
    }
  
 )
})
}, []);




  return (
    <>
    <NavbarMenu/>
    <MaterialTable 
      title="Transaction"
      columns={state.columns}
      data={state.data}
      editable={{

        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              async function fetchData(reqData) {
                const res = await fetch('http://159.224.16.138:8000/assistant/transaction', {
                method: 'POST',
                headers: {
                'token': localStorage.getItem('token'),
                'user-id': localStorage.getItem('user-id')
                },
                body: JSON.stringify(reqData)
                });       
                  return res;
               }

               let reqData = {
                "data": {
                    "attributes": {
                      "description": newData.description,
                      "amount": newData.amount.toString(),
                      "category": newData.category,
                      "include": newData.include,
                      "balance_id": newData.currency,
                      "date": (format(newData.date, 'yyyy-MM-dd')).toString()
                    }
                }
               }

               fetchData(reqData).then(
                res=>{
                  if (res.ok) {   
                    //logic
                    let pro = res.json(); 
                    pro
                      .then(
                        result => {
                        resolve();
                        setState((prevState) => {
                          const data = [...prevState.data];
                          newData.id = data.length + 1;
                          newData.transaction_id = result.data.attributes.id;
                          data.push(newData);
                          return { ...prevState, data };
                    }); 
                  }
                )      
                } else {
                  resolve();
                  return alert("failed")
                }
              }
              );
              
            }, 3000);
          }),

        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              async function fetchData(request) {
                const res = await fetch('http://159.224.16.138:8000/assistant/transaction', {
                method: 'PUT',
                headers: {
                'token': localStorage.getItem('token'),
                'user-id': localStorage.getItem('user-id')
                },
                body: JSON.stringify(request)
                });       
                  return res;
               }
               let dateC = "";
               if (typeof newData.date.getMonth === 'function')  dateC  = (format(newData.date, 'yyyy-MM-dd')).toString();else
               dateC = newData.date;
               let reqData = {
                "data": {
                    "attributes": {
                      "description": newData.description,
                      "amount": newData.amount.toString(),
                      "category": newData.category,
                      "include": newData.include,
                      "balance_id": newData.currency,
                      "date": dateC ,
                      "transaction_id": oldData.transaction_id
                    }
                }
               }

               fetchData(reqData).then(
                res=>{
                  if (res.ok) {   
                    resolve();
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                }else {
                  resolve();
                  return alert("failed")
                }
              }
              );
               
            }, 3000);
          }),

        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              async function fetchData(transactionId) {
                const res = await fetch('http://159.224.16.138:8000/assistant/transaction/'+transactionId, {
                method: 'DELETE',
                headers: {
                'token': localStorage.getItem('token'),
                'user-id': localStorage.getItem('user-id')
                }
                });       
                  return res;
               }
               fetchData(oldData.transaction_id).then(
                res=>{
                  if (res.ok) {   
                    resolve();
                    setState((prevState) => {
                    const data = [...prevState.data];
                    data.splice(data.indexOf(oldData), 1);
                    return { ...prevState, data };
                  });
                }else {
                  resolve();
                  return alert("failed")
                }
              }
              );
              
            }, 3000);
          }),
      }}
    />
    </>
  );
}


