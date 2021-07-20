import React, { Component } from 'react'
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserS from './UserS';

 class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    setInputValue(property,val) {
        val =val.trim();
        if (val.length > 14) {
            return;
        }
        this.setState({
            [property]: val
        })
    }

    resetForm() {
        this.setState = {
            username: '',
            password: '',
            buttonDisabled: false
        }
    }

    async doLogin() {

        if (!this.state.username) {
            return;
        }
        if (!this.state.password) {
            return;
        }

        this.setState({
            buttonDisabled: true
        })

        try {
            
            let res = await fetch('/login', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type':'application.json'
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password:this.state.password
                })
            })

            let result = await res.json();
            if (result && result.success) {
                UserS.isLoggedIn =true;
                UserS.username= result.username;
            }
            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg)
            }
        } 
        catch (e) {
            console.log(e);
            this.resetForm();
        }

    }

    render() {
        return (
            <div className="LoginForm">
                
                Kullanıcı Girişi  

                
                <InputField
                    type='text'
                    placeholder='Kullanıcı Adı'
                    value={this.state.username ? this.state.username:''}
                    onChange={ (val) => this.setInputValue('username', val) } 
                />
                <InputField
                    type='password'
                    placeholder='Şifre'
                    value={this.state.password ? this.state.password:''}
                    onChange={ (val) => this.setInputValue('password', val) } 
                />
                <SubmitButton
                    text='Giriş Yap'
                    disabled={ this.state.buttonDisabled }
                    onClick={ () => this.doLogin()}
                />
                
                          

              
            </div>
        )
    }
}
export default LoginForm;