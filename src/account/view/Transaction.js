import React, {useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import './balance.css'
import NavbarMenu from '../components/NavbarMenu';
import { format } from 'date-fns';
import { TextField, Button } from '@material-ui/core';
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form'


export default function Transaction() {
  //modal form
  const [amountForm, setAmount] = useState();
  const [currencyForm, setCurrency] = useState();
  const [dateForm, setDate] = useState();
  const [descriptionForm, setDescription] = useState();
  const [inculdeForm, setInclude] = useState();
  const [categoryForm, setCategory] = useState();
  //currency for form
  const [selectForm, setSelect] = useState({data:[{value:0,name:'lol'}]});
  //modal form actions
  const [show, setShow] = useState(false);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //table columns
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
  //array of data from get request
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

//for dropdown list
//get request for balance
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
      let forselect = [];
      r.data.map((ObjectMapped,index) => {
        newCol[ObjectMapped.attributes.balance_id] = ObjectMapped.attributes.currency
        forselect[index] = {value: ObjectMapped.attributes.balance_id, name:ObjectMapped.attributes.currency }
    })
      setSelect({...state,data:forselect })
      setCurrency(forselect[0].value)
      setState({...state, columns:[
        { title: '#', field: 'id', type: 'numeric', editable: 'never' , filtering: false},
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

//returning jsx
  return (
    <>
    <NavbarMenu/>
  
    <MaterialTable 
      title="Transaction"
      columns={state.columns}
      data={state.data}
      actions={[
        {
          icon: 'add',
          tooltip: 'Add transacation',
          isFreeAction: true,
          onClick: (event) => {
            handleShow();
          }
        },
        {
          icon: 'filter_list',
          tooltip: '',
          isFreeAction: true,
          onClick: (event) => {
           alert("hello");
          }
        }
      ]}
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
                      "description": newData.description.toString(),
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <Form.Label>Amount</Form.Label>
         <Form.Control type="amount" placeholder="Enter amount" onChange={e => setAmount(e.target.value)} />
         <Form.Label>Currency</Form.Label>
         <Form.Control as="select" onChange={e => setCurrency(e.target.value)} >
         {selectForm.data.map((e, key) => {
            return <option key={key} value={e.value}>{e.name}</option>;
           })}
         </Form.Control>
         <Form.Label>Category</Form.Label>
         <Form.Control type="category" placeholder="Enter category" onChange={e => setCategory(e.target.value)}/>
         <Form.Label>Description</Form.Label>
         <Form.Control type="description" placeholder="Enter description" onChange={e => setDescription(e.target.value)}/>
         <Form.Label>Include</Form.Label>
         <Form.Control type="include" placeholder="Enter include" onChange={e => setInclude(e.target.value)}/>
         <Form.Label>Date</Form.Label>
         <Form.Control type="date" placeholder="Enter date" type="date" onChange={e => setDate(e.target.value)}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() =>    
          new Promise((resolve) => {
            setTimeout(() => {
              let newData = {
                      "description": descriptionForm,
                      "amount": amountForm,
                      "category": categoryForm,
                      "include": inculdeForm,
                      "currency": currencyForm,
                      "date": dateForm
              }
              console.log(newData);
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
                      "amount": newData.amount,
                      "category": newData.category,
                      "include": newData.include,
                      "balance_id": newData.currency,
                      "date": newData.date
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
                          handleClose();
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
          })}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
    
  );
}


