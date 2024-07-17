import React from 'react'
import { Typography, Button, Checkbox, Form, Input, Space, Divider, Flex, App } from 'antd'
import type { FormProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/stores'
import { formatErrorMessage } from '~/utils'

const { Title, Text } = Typography

type FieldType = {
  email: string
  password: string
  remember?: boolean
}

const LoginForm: React.FC = () => {
  const loginUser = useAuthStore((state) => state.loginUser)
  const navigate = useNavigate()

  const { notification } = App.useApp()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      await loginUser(values)
      navigate('/')
      notification.success({ message: `Chào mừng bạn đến với JobSeeker` })
    } catch (err) {
      notification.error({ message: formatErrorMessage(err) })
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='mt-12 lg:mt-24'>
      <Space direction='vertical' className='w-full'>
        <Title className='drop-shadow-lg'>Sign in</Title>
        <Text className='text-[#878F9A]'>
          Don't have account{' '}
          <Link to='/register' className='!text-primary'>
            Create Account
          </Link>
        </Text>

        <Form
          name='login_form'
          className='mt-5'
          initialValues={{ remember: false }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType> name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input size='large' placeholder='Email address' />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password size='large' placeholder='Password' />
          </Form.Item>
          <Form.Item>
            <Form.Item<FieldType> name='remember' valuePropName='checked' noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link className='float-right text-primary' to='/forgetpassword'>
              Forgot password
            </Link>
          </Form.Item>

          <Form.Item>
            <Button className='w-full' size='large' type='primary' htmlType='submit'>
              <Space>
                Sign in
                <svg
                  width='16'
                  className='inline'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M1 7H0V9H1V7ZM15.2071 8.70711C15.5976 8.31658 15.5976 7.68342 15.2071 7.29289L8.84315 0.928932C8.45262 0.538408 7.81946 0.538408 7.42893 0.928932C7.03841 1.31946 7.03841 1.95262 7.42893 2.34315L13.0858 8L7.42893 13.6569C7.03841 14.0474 7.03841 14.6805 7.42893 15.0711C7.81946 15.4616 8.45262 15.4616 8.84315 15.0711L15.2071 8.70711ZM1 9H14.5V7H1V9Z'
                    fill='white'
                  />
                </svg>
              </Space>
            </Button>
          </Form.Item>

          <Divider plain className='!text-[#878F9A]'>
            Or
          </Divider>

          <Form.Item>
            <Flex gap='middle' wrap>
              <Button size='large' className='w-full text-[#515151]'>
                <Flex gap='middle' align='center' justify='center'>
                  <img className='w-5' src='/image3.png' />
                  Sign up with Facebook
                </Flex>
              </Button>
              <Button size='large' className='w-full text-[#515151]'>
                <Flex gap='middle' align='center' justify='center'>
                  <svg className='w-4 inline' viewBox='0 0 533.5 544.3'>
                    <path
                      d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                      fill='#4285f4'
                    />
                    <path
                      d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                      fill='#34a853'
                    />
                    <path
                      d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                      fill='#fbbc04'
                    />
                    <path
                      d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                      fill='#ea4335'
                    />
                  </svg>
                  Sign up with Google
                </Flex>
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Space>
    </div>
  )
}

export default LoginForm
