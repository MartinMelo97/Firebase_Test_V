import React, { Component } from 'react'
import { Icon, Button, Input, Col, Row, Progress } from 'antd'
import firebase from 'firebase'
class Products extends Component {

    constructor(props){
        super(props)
        this.storage = firebase.storage()
        this.state = {
            newProduct: {
                nombre: null,
                desc: null,
                precio: null,
                imagen: null,
            },
            productos: null,
            percentage: null,
            isUploading: false
        }
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

    changeImage = (e) => {
        const image = e.target.files[0]
        const storageRef = firebase.storage().ref(`images/${image.name}`)
        const task = storageRef.put(image)

        task.on('state_changed', snapshot => {
            
            let percentage = (snapshot.bytesTransferred/snapshot.totalBytes) * 100
            percentage = percentage.toFixed(2)
            this.setState({isUploading: true, percentage})
        },
        error => {
            console.log(error)
        },
        ()=>{
            task.snapshot.ref.getDownloadURL()
                .then(url=>{
                    let obj = this.state.newProduct
                    obj.imagen = url
                    this.setState({newProduct: obj})
                    alert("YA SE SUBIO LA PINCHE IMAGEN")
                })
                .catch(err=>alert("FALLO ESTA PENDEJADA"))
        }
        )
    }


    uploadProduct = () => {
           
        //this.saveImageinStorage()
        //Before save in DB

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
                            <input type="file"
                                onChange={(e)=>this.changeImage(e)}
                                />
                            {this.state.isUploading ?    
                            <Progress type={"circle"} percent={this.state.percentage} />
                            : null}
                            <Button
                            type="primary"
                            icon="upload"
                            size={"large"}
                            onClick={this.uploadProduct}
                            >Guardar producto </Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }

}

export default Products