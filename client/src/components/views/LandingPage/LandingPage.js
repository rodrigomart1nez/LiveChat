import React from 'react'
import { Button } from 'antd';

function LandingPage() {
    return (
        <div className="app">
            <Button type='primary' href='/chat' icon='message' size='large'>
                Start Chatting
            </Button>
        </div>
    )
}

export default LandingPage
