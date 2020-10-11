import React from 'react'
import {Icon} from 'antd';
import { useSelector } from "react-redux";

function Footer() {
    const user = useSelector(state => state.user)
    if (user.userData && !user.userData.isAuth) {
        return (
            <div style={{
                height: '80px', display: 'flex',
                flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', fontSize:'1rem'
            }}>
               <p> First login to start chatting  <Icon type="smile" /></p>
            </div>
        )
    } else {
        return (
            <div style={{
                height: '80px', display: 'flex',
                flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', fontSize:'1rem'
            }}>
               <p> This is a public chat  <Icon type="smile" /></p>
            </div>
        )
    }
}

export default Footer
