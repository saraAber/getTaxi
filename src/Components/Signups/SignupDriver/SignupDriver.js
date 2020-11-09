import React, { Component } from 'react';
import SigninForm from './SignupForm/SignupForm';
import { GetCarsType } from '../../../store/reducer/actionServer/actionServer'
import { signupdriver } from '../../../store/reducer/actionUser'
import { connect } from 'react-redux';
import {error_message} from '../../../store/action'
import '../../../css/Form.css'


class signupDriver extends Component {
    state = {
        src: null,
        inputClass:"",
        optionCars: [],
        Driver: {
            firstName: {
                type: "text",
                placeholder: "שם פרטי",
                value: "",
                icon: "user",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: false,
            },
            lastName: {
                type: "text",
                placeholder: "שם משפחה",
                value: "",
                icon: "user",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: false,
                message: "שם משפחה אינו תקין"
                ,
              
            },
            minway: {
                type: "number",
                placeholder: "מינימום מרחק",
                value: "",
                icon: "road",
                pattern: /^/,
                valid: false,
                className:" way"
            },
            maxway: {
                type: "number",
                placeholder: "מקסימום מרחק",
                value: "",
                icon: "road",
                pattern: /^/,
                valid: false,
                className:" way maxwaylogin"
            },

            phone: {
                type: "tel",
                placeholder: "מספר טלפון",
                value: "",
                icon: "call",
                pattern: /^\d{10}$/,
                valid: false,
               
            },
            email: {
                type: "text",
                placeholder: `דוא"ל`,
                value: "",
                icon: "at",
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                valid: false,
       
            },
            password: {
                type: "password",
                placeholder: "סיסמה",
                value: "",
                sumstring: 0,
                sumint: 0,
                icon: "lock",
                pattern: /^.{8,}/,
                title: "Eight or more characters",
                valid: false,          
            }

        },
        CarType: null,
    }
    //Displays a list of type cars 
    async UNSAFE_componentWillMount() {
        GetCarsType().then(x => {
            this.setState({ optionCars: x })
        }).catch(x => {

                    
        })

    }

      //When the user is found and updated in global state he enters update page
      componentDidUpdate() {
        const url = this.props.userpath
        if (this.props.user !== null) {
            this.props.history.replace(`${url}/update`)
        }
    }
    //Checks all entered data properly
    validation = () => {
        this.setState({ validFile: false })
        
        for (var x in this.state.Driver) {
            if (!this.state.Driver[x].valid) {
                this.setState({
                    inputClass: "invalid"
                   })
                if (this.state.CarType === null)
                    this.setState({ messageCar: "חייב לבחור כלי רכב" })
                
                return;
            }

        }
    
        if (this.state.CarType !== null)
            this.setState({ messageCar: "" }, () => {
                //post new customer
                const data = {
                    Dr_Id: null,
                    Dr_LastName: this.state.Driver.lastName.value,
                    Dr_FirstName: this.state.Driver.firstName.value,
                    Dr_Phone_number: this.state.Driver.phone.value,
                    Dr_Email: this.state.Driver.email.value,
                    Dr_Status: false,
                    Dr_Busy: false,
                    lat: null,
                    lon: null,
                    Dr_CarType_kod: this.state.CarType,
                    Dr_Token: this.props.src,
                    Dr_Password: this.state.Driver.password.value,
                    Dr_MaxWay: this.state.Driver.maxway.value,
                    Dr_MinWay: this.state.Driver.minway.value,
                }
                this.props.signup(data)


            })
        
        else
            this.setState({ messageCar: "חייב לבחור כלי רכב" })
          
    }
    //While clicking on signin  enter this function
    submit = () => {
        this.validation()
    }
  
    //enter here after all letter and update if its correct
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
    //update the car type in state
    selectoption = (event, data) => {
        this.setState({ CarType: data.value })
        this.setState({ messageCar: "" })
    }
      //update the src image
      srcimage = (event, data) => {
        this.setState({ src: event })   
    }
    render() {
        const arr = [];
        for (let x in this.state.Driver) {
            arr.push({ id: x, config: this.state.Driver[x] })
        }
       
        return (
            <div>
                <SigninForm
                    stateProps={arr}
                    changed={this.inputChange}
                    submit={this.submit}
                    value="הירשם"
                    optionCars={this.state.optionCars}
                    changeoption={this.selectoption}
                    loading={this.props.loading}
                    error={this.props.errMas}
                    inputClass={this.state.inputClass}
                    Showpicture={false}
                />
            </div>)
    }
}
const mapDispatcToProps = dispatch => {
    return {
        signup: (user) => dispatch(signupdriver(user)),
        error:(err) => dispatch({type:error_message , value: err })
    }
}
const mapStateToProps = state => {
    return {
        user: state.user.User,
        userpath: state.user.UserPath,
        loading: state.user.loading,
        errMas: state.user.errorMassge,
        src:state.order.src
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(signupDriver);