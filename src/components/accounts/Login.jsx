import React, { Component } from 'react'
import { Input, Row, Col, Icon, Button } from 'antd'
import './login.scss'

class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            correo: null,
            contraseña: null,
            confirmar_contraseña:null
        }
    }

    onChangeEmail = (e) => {
        this.setState({correo: e.target.value})
    }

    onChangePassword = (e) => {
        this.setState({contraseña: e.target.value})
    }

    onChangeConfirmPassword = (e) => {
        this.setState({confirmar_contraseña: e.target.value})
    }

    render(){
        const suffix = this.state.correo ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
        const { Password } = Input
        return(
            <div className="login-container">
                <Row className="row">
                    <Col className="col" span={24}>
                        <p>Inicia sesión</p>
                    </Col>
                </Row>
                <Row className="row">
                    <Col className="col form" span={12}>
                        <p>Login</p>
                        <Input
                            placeholder="Correo electrónico"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix}
                            value={this.state.correo}
                            onChange={e=>this.onChangeEmail(e)}
                        />
                        <Password
                            placeholder="Contraseña"
                            onChange={e=>this.onChangePassword(e)}
                            value={this.state.contraseña}
                        >
                        </Password>
                        <Button type="primary" shape="round" icon="user" size={'small'}>Iniciar sesión</Button>
                    </Col>
                    <Col className="col form" span={12}>
                        <p>Crear cuenta</p>
                        <Input
                            placeholder="Correo electrónico"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            suffix={suffix}
                            value={this.state.correo}
                            onChange={e=>this.onChangeEmail(e)}
                        />
                        <Password
                            placeholder="Contraseña"
                            onChange={e=>this.onChangePassword(e)}
                            value={this.state.contraseña}
                        >
                        </Password>
                        <Password
                            placeholder="Confirmar Contraseña"
                            onChange={e=>this.onChangeConfirmPassword(e)}
                            value={this.state.contraseña}
                        >
                        </Password>
                        <Button type="primary" shape="round" icon="user-add" size={'small'}>Regístrate</Button>
                    </Col>
                </Row>
            </div>

        )
    }
}

export default Login;