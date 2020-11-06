import React, { Component } from 'react'
import { connect } from 'react-redux';
import Update from '../../Signups/SignupDriver/SignupForm/SignupForm'
import axios from 'axios'
import { updatedriver, updatestatus, refreshdriver } from '../../../store/reducer/actionUser'
import { Radio } from 'semantic-ui-react'
import { error_message } from '../../../store/action'
import { GetCarsType, UpdateDurationOrder } from '../../../store/reducer/actionServer/actionServer'
import '../../../css/UpdateDriver.css'
import '../../../css/Form.css'
import { toast } from 'react-toastify';
class updateDriver extends Component {
  state = {
    optionCars: [],
    inputClass: "",
    IsCorrect: false,
    Driver: {

      lastName: {
        type: "text",
        placeholder: "שם משפחה",
        value: "",
        icon: "user",
        pattern: /^[\u0590-\u05FF ,.'-]+$/i,
        valid: true,
      },
      minway: {
        type: "number",
        placeholder: "מינימום מרחק",
        value: "",
        icon: "road",
        pattern: /^/,
        valid: true,
        className: " way"
      },
      maxway: {
        type: "number",
        placeholder: "מקסימום מרחק",
        value: "",
        icon: "road",
        pattern: /^/,
        valid: true,
        className: " way maxwayupdate"
      },

      phone: {
        type: "tel",
        placeholder: "טלפון",
        value: "",
        icon: "call",
        pattern: /^\d{10}$/,
        valid: true,
      },
      email: {
        type: "text",
        placeholder: `דוא"ל`,
        value: "",
        icon: "at",
        pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
        valid: true,
      },
      password: {
        type: "password",
        placeholder: "סיסמה",
        value: "",
        sumstring: 0,
        sumint: 0,
        icon: "lock",
        pattern: /^.{8,}/,
        valid: true,
      }

    },
    CarType: null,
    valuestatus: false,
    visited: false,

    busy: null,
    update: false
  }


  UNSAFE_componentWillMount() {
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
    this.resetdata();
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
          //and checks if it is close to the destination in order to send an Email
          this.setState({
            busy: setInterval(x => {
              if (driver.Dr_Busy) {
                UpdateDurationOrder(sessionStorage.getItem("userId")).then().catch(x => {
                  this.props.error(x.message)
                })
              }
              else {
                //else-update if there is an order request     
                    axios.get(`http://localhost:50130/api/DriverToOrder?IdDriver=${sessionStorage.getItem("userId")}`).then(x => {
                      const orders = [...x.data]
                      for (var item in orders) {
                        if (orders[item].Ord_Stattus === 1) {
                          toast.success("שלום מחכה לך הזמנה ");    
                          clearInterval(this.state.notbusy)  
                          break;
                        }
                      }
                    }).catch(error => {
                    })               
              }
            }, 10000)
          })  
        this.setState({ visited: true })
      }
    }
  }


}
// reset data
resetdata = () => {
  if (this.state.update === false) {

    let driver = this.state.Driver
    const user = { ...this.props.user }
    driver.lastName.value = user.Dr_LastName
    driver.password.value = user.Dr_Password
    driver.phone.value = user.Dr_Phone_number
    driver.email.value = user.Dr_Email
    driver.minway.value = user.Dr_MinWay
    driver.maxway.value = user.Dr_MaxWay

    this.setState({ Driver: driver, update: true })
  }

}
//stop the inteval
componentWillUnmount() {
  clearInterval(this.state.busy)
}
// A function that updates a current location
// getCurrentLocation() {
//   if (navigator.geolocation) {
//        navigator.geolocation.watchPosition(position => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//           alert(lat + ',' + lon);
//         console.log("Driver");
//        axios.post(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyD-escEShizSjF9I3GdoO35gMtEuto0FmA
//       `).then(x => {
//         alert(JSON.stringify(x))
//        }).catch(x => {
//          alert("not good")
//        });
//       }, (err)=>{}, {
//           enableHighAccuracy: true,
//           maximumAge: 3000,
//           timeout: 3000
//       });
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
      this.setState({
        inputClass: "invalid"
      })

      // this.setState({ messages: true })
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
        Dr_Token: this.props.src === "" ? this.props.user.Dr_Token : this.props.src,
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
      <div id="status">
        <div>סטטוס</div>
        <Radio toggle checked={this.state.valuestatus} onChange={this.toggle} />
      </div>
      <Update
        stateProps={arr}
        changed={this.inputChange}
        submit={this.submit}
        optionCars={this.state.optionCars}
        changeoption={this.selectoption}
        loading={this.props.loading}
        error={this.props.errMas}
        button={true}
        IsCorrect={this.state.IsCorrect}
        value="עדכון פרטים"
        inputClass={this.state.inputClass}
        Showpicture={true}
        srcimage={this.props.user ? this.props.user.Dr_Token : ""}
      />


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
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.User,
    loading: state.user.loading,
    errMas: state.user.errorMassge,
    src: state.order.src

  }
}
export default connect(mapStateToProps, mapDispatcToProps)(updateDriver)
