import React from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import moment from 'moment'
import { getChats, afterPostMessage } from '../../../_actions/chat_actions'
import ChatCard from './Sections/ChatCard'
import Dropzone from 'react-dropzone'
import Axios from 'axios'


class ChatWindow extends React.Component {
    state = {
        chatMessage: ''
    }

    componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
    }
    
    componentDidMount() {
        const server = 'http://localhost:5000'

        this.props.dispatch(getChats())

        this.socket = io(server)

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            this.props.dispatch(afterPostMessage(messageFromBackEnd))
        })
    }

    submitMessage = (e) => {
        e.preventDefault()

        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }

        const chatMessage = this.state.chatMessage
        const userId = this.props.user.userData._id
        const userName = this.props.user.userData.name
        const userImage = this.props.user.userData.image
        const nowTime = moment()
        const type = 'Text'

        this.socket.emit("Input Chat Message", {
            chatMessage,
            userId,
            userName,
            userImage,
            nowTime,
            type
        })
        this.setState({ chatMessage: ''})
    }

    handleSearchChange = (e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () => 
        this.props.chats.chats
        && this.props.chats.chats.map((chat) => (
            <ChatCard key={chat._id} {...chat}/>
        ))

    onDrop = (files) => {
        console.log(files)
        
        if (this.props.user.userData && !this.props.user.userData.isAuth) {
            return alert('Please Log in first');
        }

        let formData = new FormData

        const config = {
            header: { 'content-type': 'multipart/form-data'}
        }

        formData.append('file', files[0])

        Axios.post('api/chat/uploadfiles', formData, config)
            .then(response => {
                if (response.data.success) {
                    const chatMessage = response.data.url
                    const userId = this.props.user.userData._id
                    const userName = this.props.user.userData.name
                    const userImage = this.props.user.userData.image
                    const nowTime = moment()
                    const type = 'VideoOrImage'
                    this.socket.emit("Input Chat Message", {
                        chatMessage,
                        userId,
                        userName,
                        userImage,
                        nowTime,
                        type
                    })
                }
            })
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <p style={{ fontSize: '2rem', textAlign: 'center' }}>Live Chat</p>
                </div>

                <div style={{ maxWidth: '800px', margin: '0 auto'}}>
                    <div className='infinite-container' style={{ height: '500px', overflowY:'scroll' }}>
                        {this.props.chats && (
                            this.renderCards()
                        )}
                        <div 
                            ref={el => {
                                this.messagesEnd = el;
                            }}                        
                            style={{ float: 'left', clear:'both' }}
                        />
                    </div>

                    <Row>
                        <Form layout='inline' onSubmit={this.submitMessage}>
                            <Col span={18}>
                                <Input
                                    id='message'
                                    prefix={<Icon type='message' style={{ color: 'rgb(0,0,0,.25)' }} />}
                                    placeholder="Let's chat"
                                    type='text'
                                    value={this.state.chatMessage}
                                    onChange={this.handleSearchChange}
                                />
                            </Col>
                            <Col span={2}>
                                <Dropzone onDrop={this.onDrop}>
                                    {({ getRootProps, getInputProps }) => (
                                        <section>
                                            <div {...getRootProps()}>
                                                <input {...getInputProps()} />
                                                <Button>
                                                    <Icon type='upload' />
                                                </Button>
                                            </div>
                                        </section>
                                    )}
                                </Dropzone>
                            </Col>

                            <Col span={4}>
                                <Button type='primary' style={{ width: '100%' }} onClick={this.submitMessage} htmlType='submit'>
                                    <Icon type='enter' />
                                </Button>
                            </Col>
                        </Form>
                    </Row>
                </div>
            </React.Fragment>
        )
    }

}

const mapStateToProps = state => {
    return {
        user : state.user,
        chats: state.chat
    }
}
export default connect(
    mapStateToProps
)(ChatWindow)