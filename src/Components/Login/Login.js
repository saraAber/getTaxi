import React, { Component } from 'react'
import LoginForm from './LoginForm/LoginForm';
import { connect } from 'react-redux';
import { loginuser } from '../../store/reducer/actionUser'

class login extends Component {
    state = {
        User: {
            username: {
                value: "",
                icon: "user",
                placeholder: `דוא"ל`,
                type: "text",
                pattern: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
                valid: false,
                message: "כתובת המייל אינה תקינה"
            },
            password: {
                value: "",
                icon: "lock",
                placeholder: "סיסמה",
                type: "password",
                pattern: /^.{8,}/,
                valid: false,
                message: "הסיסמה חייבת להכיל לפחות 8 תווים"
            }
        },
        messages: false
    }
//enter here after all letter and update if its correct
    inputChange = (event, id) => {
        const newform = { ...this.state.User };
        const formChange = { ...newform[id] };
        formChange.value = event.target.value;
        if (formChange.pattern.test(String(formChange.value).toLowerCase())) {
            formChange.valid = true
        }
        else
            formChange.valid = false
        newform[id] = formChange;
        this.setState({ User: newform });

    }
    
    //Checks all entered data properly
    validation = () => {
        for (var x in this.state.User) {
            if (!this.state.User[x].valid) {
                this.setState({ messages: true })
                return;
            }
        }
        this.setState({ messages: false }, () =>
        this.props.login(this.state.User.password.value, this.state.User.username.value, this.props.userpath));

    }
    //While clicking on login comes to this function
    submit = () => {
        this.validation()

    }
    //When the user is found and updated in global state he enters the appropriate next page
    componentDidUpdate() {
        const url = this.props.userpath
        if (this.props.user !== null) {
            if (url === "/customer")
                this.props.history.replace(`${url}/order`)
            else
                this.props.history.replace(`${url}/update`)
        }          
    }

    render() {
        const arr = [];
        for (let x in this.state.User) {
            arr.push({ id: x, config: this.state.User[x] })
        }
        return (
            <div>
                <LoginForm
                    stateProps={arr}
                    changed={this.inputChange}
                    submit={this.submit}
                    loading={this.props.loading}
                    messages={this.state.messages}
                    error={this.props.errMas}
                ></LoginForm>
            </div>
        )
    }
}
const mapDispatcToProps = dispatch => {
    return {
        login: (password, name, type) => dispatch(loginuser(password, name, type))
    }
}
const mapStateToProps = state => {
    return {
        userpath: state.user.UserPath,
        user: state.user.User,
        loading: state.user.loading,
        errMas: state.user.errorMassge
    }
}
export default connect(mapStateToProps, mapDispatcToProps)(login);