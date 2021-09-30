import React, { useState } from 'react'
import { Button, Input, Form, DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

const Home = () => {
    const [searchForm, setSearchForm] = useState({ username: '123', startTime: '', endTime: '' })

    const onFinish = value => {
        console.log(value)
    }

    return (
        <div>
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                initialValues={searchForm}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item label="用户名" name="username">
                    <Input />
                </Form.Item>

                <Form.Item label="日期范围" name="date" initialValue={[moment(), moment()]}>
                    <RangePicker />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Home
