import React from 'react'
import moment from 'moment'
import { Comment, Avatar, Tooltip } from 'antd'


const ChatCard = (props) => {
    console.log(props.message)
    return (
        <div style={{ width: '100%' }}>
            <Comment 
                author={props.sender.name}
                avatar={
                    <Avatar 
                        src={props.sender.image} alt={props.sender.name}
                    />
                }
                content={
                    props.message.substring(0,8) === "uploads/" ?
                        props.message.substring(props.message.length - 3, props.message.length) === 'mp4' ?
                            <video 
                                style={{ maxWidth: '200px'}}
                                src={`https://gentle-mountain-82880.herokuapp.com/${props.message}`} 
                                alt='video' 
                                type='video/mp4' controls 
                            />
                            :
                            <img 
                                style={{ maxWidth: '200px'}}
                                src={`https://gentle-mountain-82880.herokuapp.com/${props.message}`} 
                                alt='img' 
                            />
                        :    
                        <p>
                            {props.message}
                        </p>
                }

                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().format('MM-DD-YY')}</span>
                    </Tooltip>
                }
            />
        </div>
    )
}

export default ChatCard