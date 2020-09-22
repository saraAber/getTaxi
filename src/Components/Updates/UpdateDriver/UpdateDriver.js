import React, { Component } from 'react'
import { connect } from 'react-redux';
import Update from '../../Signups/SignupDriver/SignupForm/SignupForm'
import axios from 'axios'
import Notification from '../../Orders/Order/Notification'
import { updatedriver, updatestatus, refreshdriver } from '../../../store/reducer/actionUser'
import { Radio } from 'semantic-ui-react'
import { error_message } from '../../../store/action'
import { GetCarsType, UpdateDurationOrder } from '../../../store/reducer/actionServer/actionServer'
// import { Map, GoogleApiWrapper } from 'google-maps-react';
class updateDriver extends Component {
  state = {
    optionCars: [],
    messages: false,
    IsCorrect: false,
    Driver: {

      lastName: {
        type: "text",
        placeholder: "שם משפחה",
        value: "",
        icon: "user",
        pattern: /^[\u0590-\u05FF ,.'-]+$/i,
        valid: false,
        message: "שם משפחה לא תקין",
        className:"seven wide column"

      },
      minway: {
        type: "number",
        placeholder: "מינימום מרחק",
        value: "",
        icon: "point",
        pattern: /^/,
        valid: false,
        className:"seven wide column"
      },
      maxway: {
        type: "number",
        placeholder: "מקסימום מרחק",
        value: "",
        icon: "point",
        pattern: /^/,
        valid: false,
        className:"seven wide column"
      },

      phone: {
        type: "tel",
        placeholder: "טלפון",
        value: "",
        icon: "call",
        pattern: /^\d{10}$/,
        valid: false,
        message: "מספר טלפון  אינו תקין",
        className:"seven wide column"
      },
      email: {
        type: "text",
        placeholder: `דוא"ל`,
        value: "",
        icon: "wifi",
        pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        valid: false,
        message: "כתובת מייל אינו תקין",
        className:"seven wide column"
      },
      password: {
        type: "password",
        placeholder: "סיסמה",
        value: "",
        sumstring: 0,
        sumint: 0,
        icon: "lock",
        pattern: /^.{8,}/,
        valid: false,
        message: "הסיסמה חייבת להכיל לפחות 8 תווים",
        className:"ten wide column"
      }

    },
    Notification: null,
    CarType: null,
    messageCarType: "",
    valuestatus: false,
    visited: false,
    notbusy: false,
    busy: null
  }


  componentWillMount() {
    //return driver after refresh page
    this.props.refreshpage(sessionStorage.getItem("userId"))
    if (this.state.optionCars.length === 0) {
      //return  list of type cars
      GetCarsType().then(x => {
        this.setState({ optionCars: x })
      }).catch(x => {
        this.props.error(x.message)
      })
    }
  }
  componentDidUpdate() {
    //update stattus in the loading page
    const driver = { ...this.props.user }
    if (this.state.valuestatus !== driver.Dr_Status) {
      this.setState({ valuestatus: driver.Dr_Status })
      // this.state.valuestatus = driver.Dr_Status
    }
    if (driver) {
      //if stattus active update location driver
      if (driver.Dr_Status) {
        // this.getCurrentLocation();
        // flag -to know if the first time here
        if (this.state.visited === false) {
          //If the driver is busy - updates the order for the duration of the destination 
          //and checks if it is close to the destination in order to send an sms
          if (driver.Dr_Busy) {
            this.setState({
              busy: setInterval(x => {
                this.props.durationOrder(sessionStorage.getItem("userId")).then().catch(x => {
                  this.props.error(x.message)
                })

              }, 10000)
            })
          }
          else {
            //else-update if there is an order request
            this.setState({ notbusy:  setInterval(x=>{
              console.log("x")
              axios.get(`http://localhost:50130/api/DriverToOrder?IdDriver=${sessionStorage.getItem("userId")}`).then(x => {
                  const orders = [...x.data]
                  for (var item in orders) {
                    if (orders[item].Ord_Stattus === 1) {
                      
                      this.setState({ Notification: <Notification /> })
                      break;
                    }
                  }
                }).catch(error => {
                })
               },10000 ) })
          }
          this.setState({ visited: true })
        }
      }
    }
  }
  //stop the inteval
  componentWillUnmount() {
    clearInterval(this.state.busy)
    clearInterval(this.state.notbusy)
  }
  //A function that updates a current location
  // getCurrentLocation() {
  //   if (navigator.geolocation) {
  //        navigator.geolocation.watchPosition(position => {
  //         const lat = position.coords.latitude;
  //         const lon = position.coords.longitude;
  //           // alert(lat + ',' + lon);
  //         console.log("Driver");
  //        axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyD-escEShizSjF9I3GdoO35gMtEuto0FmA
  //       `).then(x => {
  //         alert(JSON.stringify(x))
  //        }).catch(x => {
  //          alert("not good")
  //        });

  //         // axios.put(`http://localhost:50130/api/driver?Id=${sessionStorage.getItem("userId")}&lat=${lat}&lon=${lon}`).then(x => {
  //         //   const Driver = { ...x.data }
  //         //   console.log(Driver)
  //         // }).catch(x => {
  //         //   alert("not good")
  //         // })


  //       }, (err)=>{}, {
  //           enableHighAccuracy: true,
  //           maximumAge: 3000,
  //           timeout: 3000
  //       });
  //     // navigator.geolocation.watchPosition(position => {
  //     //   const lat = position.coords.latitude;
  //     //   const lon = position.coords.longitude;
  //     //     alert(lat + ',' + lon);
  //     //   console.log("Driver")
  //     //   axios.put(`http://localhost:50130/api/driver?Id=${sessionStorage.getItem("userId")}&lat=${lat}&lon=${lon}`).then(x => {
  //     //     const Driver = { ...x.data }
  //     //     console.log(Driver)
  //     //   }).catch(x => {
  //     //     alert("not good")
  //     //   })


  //     // });
  //   }
  // }

  //update in state the type car
  selectoption = (event, data) => {
    this.setState({ CarType: data.value })
    this.setState({ messageCarType: "" })
  }
  //update stattus driver on click
  toggle = () => {
    this.props.changestatus(this.props.user);
    this.setState({ valuestatus: !this.state.valuestatus });
  }
  //enter here after all letter
  inputChange = (event, id) => {
    const newform = { ...this.state.Driver };
    const formChange = { ...newform[id] };
    formChange.value = event.target.value;
    if (formChange.pattern.test(String(formChange.value).toLowerCase())) {
      formChange.valid = true
    }
    else
      formChange.valid = false
    newform[id] = formChange;
    this.setState({ Driver: newform });
  }

  //Checks all entered data properly
  validation = () => {
    for (var x in this.state.Driver) {
      if (!this.state.Driver[x].valid) {
        this.setState({ messages: true })
        if (this.state.CarType === null)
          this.setState({ messageCarType: "חייב לבחור כלי רכב" })
        return;
      }
    }
    if (this.state.CarType !== null) {
      this.setState({ messageCarType: "" }, () => {
        const data = {
          Dr_Id: this.props.user.Dr_Id,
          Dr_LastName: this.state.Driver.lastName.value,
          Dr_Phone_number: this.state.Driver.phone.value,
          Dr_CarType_kod: this.state.CarType,
          Dr_Password: this.state.Driver.password.value,
          Dr_MaxWay: this.state.Driver.maxway.value,
          Dr_MinWay: this.state.Driver.minway.value,
        }
        this.props.update(data)
        this.setState({ IsCorrect: true })
      })
    }
    else {
      this.setState({ messageCarType: "חייב לבחור כלי רכב" })
    }
  }


  //update details of driver
  submit = () => {
    this.validation()
  }

  render() {
    const arr = [];
    for (let x in this.state.Driver) {
      arr.push({ id: x, config: this.state.Driver[x] })
    }

    return (
      <div>
        <label>סטטוס</label>
        <Radio toggle checked={this.state.valuestatus} onChange={this.toggle} />
        <Update stateProps={arr}
          changed={this.inputChange}
          submit={this.submit}
          optionCars={this.state.optionCars}
          changeoption={this.selectoption}
          loading={this.props.loading}
          messages={this.state.messages}
          error={this.props.errMas}
          messageCar={this.state.messageCarType}
          button={true}
          IsCorrect={this.state.IsCorrect}
          value="עידכון פרטים"
        />
        {this.state.Notification}
      </div>
    )
  }
}
const mapDispatcToProps = dispatch => {
  return {
    error: (err) => dispatch({ type: error_message, value: err }),
    update: (newdriver) => dispatch(updatedriver(newdriver)),
    changestatus: (driver) => dispatch(updatestatus(driver)),
    refreshpage: (Id) => dispatch(refreshdriver(Id)),
    durationOrder: (Id) => dispatch(UpdateDurationOrder(Id))
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.User,
    loading: state.user.loading,
    errMas: state.user.errorMassge,
    // order:state.order.order
    // valuestatus:state.user.User.Dr_Status   
  }
}
export default connect(mapStateToProps, mapDispatcToProps)(updateDriver)
// export default GoogleApiWrapper(
//   (props) => ({
//     apiKey: "AIzaSyD-escEShizSjF9I3GdoO35gMtEuto0FmA"
//   }
// ))(updateDriver)