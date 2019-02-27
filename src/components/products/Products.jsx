import React, { Component } from 'react'
import { Icon, Button, Input, Col, Row } from 'antd'

class Products extends Component {

    constructor(props){
        super(props)
        this.state = {
            newProduct: {
                nombre: null,
                desc: null,
                precio: null,
                imagen: null,
            },
            productos: null
        }
    }

    componentWillMount = () => {

    }

    changeName = (e) => {
        let obj = this.state.newProduct
        obj.nombre = e.target.value
        this.setState({newProduct: obj})
    }

    changeDesc = (e) => {
        let obj = this.state.newProduct
        obj.desc = e.target.value
        this.setState({newProduct: obj})
    }

    changePrecio = (e) => {
        let obj = this.state.newProduct
        obj.precio = e.target.value
        this.setState({newProduct: obj})
    }

    uploadProduct = () => {
        this.props.db.collection('products').add(this.state.newProduct)
            .then((docRef)=>alert("El producto se ha creado"))
            .catch(err=>
                {console.log(err)
                alert("Ocurrio un error")
                })
    }

    render(){
        return (
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={24}>
                            <p>Productos</p>
                        </Col>
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={24}>
                            <p>Agregar nuevo producto</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Input 
                                placeholder="Nombre del producto"
                                prefix={<Icon type="user"/>}
                                value={this.state.newProduct.nombre}
                                onChange={(e)=>this.changeName(e)}
                            />
                            <Input 
                                placeholder="Descripción del producto"
                                prefix={<Icon type="user"/>}
                                value={this.state.newProduct.desc}
                                onChange={(e)=>this.changeDesc(e)}
                            />
                            <Input 
                                placeholder="Precio del producto"
                                prefix={<Icon type="user"/>}
                                value={this.state.newProduct.precio}
                                onChange={(e)=>this.changePrecio(e)}
                            />
                            <Button 
                                type="primary"
                                shape="round"
                                icon="upload"
                                size={"large"}
                                onClick={this.uploadProduct}
                            >Guardar producto</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

}

export default Products