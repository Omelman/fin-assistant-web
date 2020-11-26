import React, {PropTypes} from 'react';
import {Redirect} from 'react-router-dom';
import {CubeGrid} from 'styled-loaders-react'

export default class PrivateRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state={loading:true,authenticated:false,flag:true}
  }
  componentDidMount(){
    setTimeout(()=>{
       fetch('http://159.224.16.138:8000/assistant/check_session', {
          method: 'GET',
          headers: {
              'Token': localStorage.getItem('token'),
              'User-Id': localStorage.getItem('user-id'),
              'Accept': '*/*',
          },
          credentials: "omit"
      }).then(
        res=>{
            if (res.ok)  this.setState({loading:false,authenticated:true,flag:true});else 
            this.setState({loading:false,authenticated:false,flag:false});    
        }
      );
    }, 400)
  }
  render() {
    if(!this.state.flag)
    return <Redirect to="/sign-in" />

    if(this.state.loading)
    return <CubeGrid color="black"/>

    if(this.state.authenticated)
    return (this.props.children);
    else
    return <Redirect to="/" />
  }
}