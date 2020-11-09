import React, { Component } from 'react';
import SignupForm from './SignupForm/SignupForm';
import { signupcustomer } from '../../../store/reducer/actionUser'
import { connect } from 'react-redux';
class signupCustomer extends Component {
    state = {
        City: null,
        inputClass:"",
        address_from: null,
        customer: {
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

            },
            floor: {
                type: "number",
                placeholder: "ק'",
                value: "",
                pattern: /^/,
                valid: false,
                id:"floor"
            },
            phone: {
                type: "tel",
                placeholder: "טלפון",
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
                valid: false,

            }
        }
    }

     //When the user is found and updated in global state he enters order page
     componentDidUpdate() {
        if (this.props.user !== null) {
 
            this.props.history.replace(`${this.props.userpath}/order`)
        }
    }

      //enter here after all letter and update if its correct
      inputChange = (event, id) => {
        const newform = { ...this.state.customer };
        const formChange = { ...newform[id] };
        formChange.value = event.target.value;
        if (formChange.pattern.test(String(formChange.value).toLowerCase())) {
            formChange.valid = true
        }
        else
            formChange.valid = false
        newform[id] = formChange;
        this.setState({ customer: newform })
    }

    //Checks all entered data properly
    validation = () => {
        this.setState({ validFile: false })
        for (var x in this.state.customer) {
            if (!this.state.customer[x].valid) {
                // this.setState({ messages: true })
                this.setState({
                    inputClass: "invalid"
                   })
                return;

            }
        }
        if (this.state.address_from !== null){
            this.setState({ messageAddress:"" }
                , () => {                
                    const data = {
                        Cust_Kod: null,
                        cust_Address: this.state.address_from,
                        Cust_Floor: this.state.customer.floor.value,
                        Cust_Email: this.state.customer.email.value,
                        Cust_FirstName: this.state.customer.firstName.value,
                        Cust_LastName: this.state.customer.lastName.value,
                        Cust_Password: this.state.customer.password.value,
                        Cust_PhoneNumber: this.state.customer.phone.value,
                    }
                    this.props.signup(data)
               
                }
            )
        
        }
        else
        this.setState({messageAddress:"חייב למלא כתובת"})
    }
    //update the address in state
    

    selectoptionfrom = (event, data) => {
        this.setState({ messageAddress:""})
        this.setState({ address_from: event })
    }
  
    //While clicking on signin  enter this function
    submit = () => {
        this.validation()
    }

   

    render() {
     
        const arr = [];
        for (let x in this.state.customer) {
            arr.push({ id: x, config: this.state.customer[x] })
        }

        return (
            <div>
                <SignupForm
                address={null}
                    stateProps={arr}
                    changed={this.inputChange}
                    submit={this.submit}
                    value="הירשם"
                    changeoption={this.selectoption}
                    err={this.props.errMas}
                  
                    selectoptionfrom={this.selectoptionfrom}
                    loading={this.props.loading}
                    button={false}
                    inputClass={this.state.inputClass}
                />
            </div>)
    }
}
const mapDispatcToProps = dispatch => {
    return {
        signup: (user) => dispatch(signupcustomer(user))
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
export default connect(mapStateToProps, mapDispatcToProps)(signupCustomer);
