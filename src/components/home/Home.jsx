import React from 'react'

const Home = (props) => (
    <div>
        { props.user ? 
            <div>
            <p>Nombre: {props.user.displayName}</p>
            <p>Correo: {props.user.email}</p>
            <img style={{width: "100px"}} src={props.user.photoURL} alt={props.user.displayName} />
            </div>
            : null
        }
    
    </div>
)

export default Home