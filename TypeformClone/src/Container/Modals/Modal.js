import React from 'react'
import Loader from './Loader/Loader'
import './Modal.css'

const Modal = ({ type, fullScreen, ...props }) => {
    switch (type) {
        case 'loader': return (
            <div className={fullScreen && 'modal-fullScreen'}><Loader /></div>
        )
        default: return (<div></div>)
    }
}

export default Modal