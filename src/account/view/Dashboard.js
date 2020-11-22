import React,{useEffect, useState} from 'react';
import NavbarMenu from '../components/NavbarMenu';
import { Chart } from 'react-google-charts';
import './dashboard.css';

const Dashboard = () => { 
  const [state, setState] = useState({data: [] });
  let newData = [];

  useEffect(() => {
    async function fetchData() {
     
      const res = await fetch('http://159.224.16.138:8000/assistant/expenses', {
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
        let promise = res.json(); 
        promise.then(
        r => {   
           newData.push(['Summary', 'Money']);
           if(r.attributes.food != undefined)           newData.push(['Food & Drinks',Math.abs(r.attributes.food)])
           if(r.attributes.transportation != undefined) newData.push(['Transportation',Math.abs(r.attributes.transportation)])
           if(r.attributes.housing != undefined)        newData.push(['Housing',Math.abs(r.attributes.housing)])
           if(r.attributes.vehicle != undefined)        newData.push(['Vehicle',Math.abs(r.attributes.vehicle)])
           if(r.attributes.entertainment!= undefined)   newData.push(['Life & Entertainment',Math.abs(r.attributes.entertainment)])
           if(r.attributes.communication != undefined)  newData.push(['Communication & PC',Math.abs(r.attributes.communication)])
           if(r.attributes.shopping != undefined)       newData.push(['Shopping',Math.abs(r.attributes.shopping)])
           if(r.attributes.expenses != undefined)       newData.push(['Financial expenses',Math.abs(r.attributes.expenses)])
        setState({...state,data:newData });     
         });
      }
    }
    );
  }, []);

  return (
    <>
   <NavbarMenu/>   
   <div className = 'dia'>
   <Chart
  width={'800px'}
  height={'500px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={state.data}
  options={{
    title: 'My Distribution Of Costs',
  }}
  rootProps={{ 'data-testid': '1' }}
/>
</div>
    </>
  )
}

export default Dashboard;
