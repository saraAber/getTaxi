import React, { Component } from 'react';
import SigninForm from './SignupForm/SignupForm';
import { GetCarsType } from '../../../store/reducer/actionServer/actionServer'
import { signupdriver } from '../../../store/reducer/actionUser'
import { connect } from 'react-redux';
import {error_message} from '../../../store/action'

class signupDriver extends Component {
    state = {
        src: null,
        optionCars: [],
        messageCar: "",
        messages: false,
        Driver: {
            firstName: {
                type: "text",
                placeholder: "שם פרטי",
                value: "",
                icon: "user",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: false,
                message: "השם פרטי אינו תקין",
                className:"seven wide column"


            },
            lastName: {
                type: "text",
                placeholder: "שם משפחה",
                value: "",
                icon: "user",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: false,
                message: "שם משפחה אינו תקין",
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
                placeholder: "מספר טלפון",
                value: "",
                icon: "call",
                pattern: /^\d{10}$/,
                valid: false,
                message: "מספר טלפון אינו תקין",
                className:"seven wide column"
            },
            email: {
                type: "text",
                placeholder: `דוא"ל`,
                value: "",
                icon: "wifi",
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                valid: false,
                message: "כתובת מייל אינה תקינה",
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
                title: "Eight or more characters",
                valid: false,
                message: "הסיסמה חייבת להכיל לפחות 8 תווים",
                className:"ten wide column "
            }

        },
        CarType: null,
    }
    //Displays a list of type cars 
    async componentWillMount() {
        GetCarsType().then(x => {
            this.setState({ optionCars: x })
        }).catch(x => {

                    
        })

        //        console.log(x)
        //   const option=await GetCarsType()
        //     axios.get('http://localhost:50130/api/Cars').then(x => {
        //     const data = { ...x.data }
        //     const option = []
        //     for (let x in data) {
        //       option.push({ key: data[x].Car_Kodtype, text: data[x].Car_Nametype, value: data[x].Car_Kodtype })
        //     }
        //     console.log(data)
        //      this.setState({ optionCars: option })  
        //   }).catch(x => {
        //     alert("nnnot good")
        //   })
    }
    //Checks all entered data properly
    validation = () => {
        this.setState({ validFile: false })
        for (var x in this.state.Driver) {
            if (!this.state.Driver[x].valid) {
                this.setState({ messages: true })
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
                    Dr_Token: null,
                    Dr_Password: this.state.Driver.password.value,
                    Dr_MaxWay: this.state.Driver.maxway.value,
                    Dr_MinWay: this.state.Driver.minway.value,
                }
                this.props.signup(data)
            })
        else
            this.setState({ messageCar: "חייב לבחור כלי רכב" })
    }
    //While clicking on signin comes to this function
    submit = () => {
        this.validation()
    }
    //When the user is found and updated in global state he enters order page
    componentDidUpdate() {
        const url = this.props.userpath
        if (this.props.user !== null) {
            this.props.history.replace(`${url}/update`)
        }
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
       //update the src image
       srcimage = (event, data) => {
        this.setState({ src: event })
        console.log("state:" + event)
    }
    //update the car type in state
    selectoption = (event, data) => {
        this.setState({ CarType: data.value })
        this.setState({ messageCar: "" })
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
                    messages={this.state.messages}
                      error={this.props.errMas}
                    messageCar={this.state.messageCar}
                    srcimage={this.srcimage}

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
        errMas: state.user.errorMassge
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(signupDriver);