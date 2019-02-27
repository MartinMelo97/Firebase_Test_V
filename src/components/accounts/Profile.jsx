import React, { Component } from 'react'
import { Input, Button, Row, Col, Icon, DatePicker } from 'antd'

class Profile extends Component {

    constructor(props){
        super(props)
        this.state = {
            first_name: null,
            last_name: null,
            //img: null,
            date_birth: null,
            email: null
        }
    }

    changeFirstName = (e) => {
        this.setState({first_name: e.target.value})
    }

    changeLastName = (e) => {
        this.setState({last_name: e.target.value})
    }

    changeDate = (date, dateString) => {
        this.setState({date_birth: dateString})
    }

    changeEmail = () => {
        this.setState({email: this.props.user.email})
    }

    updateUserInfo = async() => {
        await this.changeEmail()
        await this.props.db.collection("users").doc(this.props.user.uid).set(this.state)
            .then((docRef)=>alert("Se actualizó información del usuario"))
            .catch((err)=>alert("Error al guardar datos"))
    }

    render()
    {
        return (
            <div style={{height: "80vh", 
                width: "100%",
                display:"flex", 
                flexDirection: "column",
                justifyContent: "space-around",
                }}>
                <Row>
                    <Col span={24}>
                        <p>Introduce tus datos personales</p>
                    </Col>
                </Row>

                <Row>
                    <Col span={12} offset={6}>
                        <Input 
                            placeholder="Nombre"
                            prefix={<Icon type="user"/>}
                            value={this.state.first_name}
                            onChange={(e)=>this.changeFirstName(e)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col span={12} offset={6}>
                        <Input 
                            placeholder="Apellidos"
                            prefix={<Icon type="user"/>}
                            value={this.state.last_name}
                            onChange={(e)=>this.changeLastName(e)}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col span={12} offset={6}>
                        <DatePicker onChange={this.changeDate} />
                    </Col>
                </Row>

                <Row>
                    <Col span={12} offset={6}>
                        <Button
                            type="primary"
                            icon="user-add"
                            shape="round"
                            size={"small"}
                            onClick={this.updateUserInfo}
                        >Actualizar datos</Button>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Profile