import React from 'react'

const Home = (props) => (
    <div>
        { props.user ? 
            <div>
            <p>Nombre: {props.user.displayName}</p>
            <p>Correo: {props.user.email}</p>
            <img style={{width: "100px"}} src={props.user.photoURL} alt={props.user.displayName} />
            <button onClick={props.logOut}>Cerrar sesión</button>
            </div>
            :
            <button onClick={props.loginGoogle}>
                Accede con Google
            </button>

        }
    
    </div>
)

export default Home