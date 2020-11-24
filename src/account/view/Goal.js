import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import './balance.css'
import NavbarMenu from '../components/NavbarMenu';
import { format } from 'date-fns';

export default function Goal() {
  
  const [state, setState] = React.useState({
    columns: [
      { title: '#', field: 'id', type: 'numeric', editable: 'never' },
      { title: 'Amount', field: 'amount', type: 'numeric' },
      {
        title: 'Currency',
        field: 'currency',
      },
      { title: 'Desciption', field: 'description'},
      { title: 'Start Date', field: 'date_start', type: 'date' },
      { title: 'Finish Date', field: 'date_finish', type: 'date' },
    ],
    data: [],
  });

  let nData = [];
 useEffect(() => {
  async function fetchData() {
   
    const res = await fetch('http://159.224.16.138:8000/assistant/goal', {
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
        console.log(r)
        r.data.map((ObjectMapped, index) => {
          nData[index] = {
            id: index + 1,
            date_start: ObjectMapped.attributes.date_start,
            date_finish: ObjectMapped.attributes.date_finish,
            amount: ObjectMapped.attributes.amount,
            description: ObjectMapped.attributes.description,
            currency: ObjectMapped.attributes.balance_id,
            goal_id: ObjectMapped.attributes.goal_id,
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
        { title: 'Desciption', field: 'description'},
        { title: 'Start Date', field: 'date_start', type: 'date' },
        { title: 'Finish Date', field: 'date_finish', type: 'date' },
      ], data:nData});
    }
  
 )
})
}, []);




  return (
    <>
    <NavbarMenu/>
    <MaterialTable 
      title="Goal"
      columns={state.columns}
      data={state.data}
      options={{
        filtering: true
      }}
      editable={{

        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              async function fetchData(reqData) {
                const res = await fetch('http://159.224.16.138:8000/assistant/goal', {
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
                      "balance_id": newData.currency,
                      "date_start": (format(newData.date_start, 'yyyy-MM-dd')).toString(),
                      "date_finish": (format(newData.date_finish, 'yyyy-MM-dd')).toString()
                    }
                }
               }
               console.log(newData.currency)
               fetchData(reqData).then(
                res=>{
                  if (res.ok) {   
                    //logic
                    console.log(res)
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
                const res = await fetch('http://159.224.16.138:8000/assistant/goal', {
                method: 'PUT',
                headers: {
                'token': localStorage.getItem('token'),
                'user-id': localStorage.getItem('user-id')
                },
                body: JSON.stringify(request)
                });       
                  return res;
               }
               let dateF = "";
               let dateS = "";
               if (typeof newData.date_start.getMonth === 'function')  dateS  = (format(newData.date_start, 'yyyy-MM-dd')).toString();else
               dateS = newData.date_start;
               if (typeof newData.date_finish.getMonth === 'function')  dateF  = (format(newData.date_finish, 'yyyy-MM-dd')).toString();else
               dateF = newData.date_finish;
               let reqData = {
                "data": {
                    "attributes": {
                      "description": newData.description,
                      "amount": newData.amount.toString(),
                      "balance_id": newData.currency,
                      "date_start": dateS,
                      "date_finish": dateF,
                      "goal_id": oldData.goal_id
                    }
                }
               }
                console.log(oldData.goal_id)
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
              async function fetchData(goalId) {
                const res = await fetch('http://159.224.16.138:8000/assistant/goal/'+goalId, {
                method: 'DELETE',
                headers: {
                'token': localStorage.getItem('token'),
                'user-id': localStorage.getItem('user-id')
                }
                });       
                  return res;
               }
               fetchData(oldData.goal_id).then(
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


