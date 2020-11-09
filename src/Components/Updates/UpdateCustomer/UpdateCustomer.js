import React, { Component } from 'react';
import Update from '../../Signups/SignupCustomer/SignupForm/SignupForm';
import { updatecustomer, refreshcustomer } from '../../../store/reducer/actionUser'
import { connect } from 'react-redux';
class signinCustomer extends Component {
    state = {
        open: false,
        inputClass: "",
        setOpen: true,
        x: null,
        address_from: null,
        updateUser: false,
        content: "הפרטים עודכנו בהצלחה",
        IsCorrect: false,
        customer: {
            lastName: {
                type: "text",
                placeholder: "שם משפחה",
                value: "",
                icon: "user",
                pattern: /^[\u0590-\u05FF ,.'-]+$/i,
                valid: true,
            },
            floor: {
                type: "number",
                placeholder: "ק'",
                value: "",
                // icon: "building",
                pattern: /^/,
                valid: true,
                id: "floor"
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
        }
    }

    UNSAFE_componentWillMount() {
        //when tha page is refreshed the state is initialized
        this.props.refreshpage(sessionStorage.getItem("userId"))

    }
    //reset data
    componentDidUpdate() {
        if (this.state.updateUser === false) {
            let customer = this.state.customer
            const user = { ...this.props.user }
            customer.lastName.value = user.Cust_LastName
            customer.password.value = user.Cust_Password
            customer.phone.value = user.Cust_PhoneNumber
            customer.floor.value = user.Cust_Floor
            customer.email.value = user.Cust_Email
            this.setState({ customer: customer })
            this.setState({ updateUser: true })
            this.setState({ address_from: user.Cust_Address })
        }
    }

    //Checks all entered data properly
    validation = () => {
        this.setState({ validFile: false })
        for (var x in this.state.customer) {
            if (!this.state.customer[x].valid) {
                this.setState({
                    inputClass: "invalid"
                })
                return
            }
        }
       
        const data = {
            Cust_Kod: this.props.user.Cust_Kod,
            Cust_Floor: this.state.customer.floor.value,
            cust_Address: this.state.address_from,
            Cust_LastName: this.state.customer.lastName.value,
            Cust_Password: this.state.customer.password.value,
            Cust_PhoneNumber: this.state.customer.phone.value,
        }
        this.props.update(data)
        this.setState({ IsCorrect: true })
       
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
        this.setState({ customer: newform });
    }
    //While clicking on update enter  this function
    submit = () => {
        this.validation()
    }
    //update the address in state
    selectoptionfrom = (event, data) => {
        this.setState({ address_from: event })
        this.setState({ messageAddress: "" })
    }
    
    render() {

        const arr = [];
        for (let x in this.state.customer) {
            arr.push({ id: x, config: this.state.customer[x] })
        }
        return (
            <div>
                <Update
                    address={this.state.address_from}
                    stateProps={arr}
                    changed={this.inputChange}
                    submit={this.submit}
                    changeoption={this.selectoption}
                    selectoptionfrom={this.selectoptionfrom}
                    err={this.props.errMas}
                    loading={this.props.loading}
                    button={true}
                    IsCorrect={this.state.IsCorrect}
                    inputClass={this.state.inputClass}
                    value="עדכון פרטים"
                />
            </div>)
    }
}
const mapDispatcToProps = dispatch => {
    return {
        update: (newcustomer) => dispatch(updatecustomer(newcustomer)),
        refreshpage: (Id) => dispatch(refreshcustomer(Id))

    }
}
const mapStateToProps = state => {
    return {
        user: state.user.User,
        errMas: state.user.errorMassge,
        loading: state.user.loading,
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(signinCustomer);