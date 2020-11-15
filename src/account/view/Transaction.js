import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import './balance.css'
import NavbarMenu from '../components/NavbarMenu';

export default function Transaction() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: '#', field: 'id', type: 'numeric', editable: 'never' },
      { title: 'Date', field: 'date', type: 'date' },
      { title: 'Amount', field: 'amount', type: 'numeric' },
      { title: 'Desciption', field: 'description'},
      { title: 'Include', field: 'include', type: 'bool'},
      {
        title: 'Category',
        field: 'category',
        lookup: { food: 'food', transport: 'transport' },
      },
    ],
    data: [
    {
      id: 1,
      date: '2019-12-10',
      amount: 100,
      description: "lodcdsc svcdv scdc",
      include: true,
      category: 34,
    }
    ],
  });
  console.log(localStorage.getItem('token'))
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
        let nData = [];
        r.data.map((ObjectMapped, index) => (
          nData[index] = {
            id: index + 1,
            date: ObjectMapped.attributes.date,
            amount: ObjectMapped.attributes.amount,
            description: ObjectMapped.attributes.description,
            include: ObjectMapped.attributes.include,
            category: ObjectMapped.attributes.category,
            balance_id: ObjectMapped.attributes.balance_id,
          }
        ))
        setState({columns: [
          { title: '#', field: 'id', type: 'numeric', editable: 'never' },
          { title: 'Date', field: 'date', type: 'date' },
          { title: 'Amount', field: 'amount', type: 'numeric' },
          { title: 'Desciption', field: 'description'},
          { title: 'Include', field: 'include', type: 'bool'},
          {
            title: 'Category',
            field: 'category',
            lookup: { food: 'food', transport: 'transport' },
          },
        ],data:nData})
       });
    }
  }
  );
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
                const res = await fetch('http://159.224.16.138:8000/assistant/balance', {
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
                        "currency": newData.currency
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
                          newData.amount = 0;
                          newData.balance_id = result.data.attributes.balance_id;
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
              async function fetchData() {
                const res = await fetch('http://159.224.16.138:8000/assistant/balance', {
                method: 'GET',
                headers: {
                'token': localStorage.getItem('token'),
                'user-id': localStorage.getItem('user-id')
                }
                });       
                  return res;
               }
               fetchData().then(
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
              async function fetchData(balanceId) {
                const res = await fetch('http://159.224.16.138:8000/assistant/balance/'+balanceId, {
                method: 'DELETE',
                headers: {
                'token': localStorage.getItem('token'),
                'user-id': localStorage.getItem('user-id')
                }
                });       
                  return res;
               }
               fetchData(oldData.balance_id).then(
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
