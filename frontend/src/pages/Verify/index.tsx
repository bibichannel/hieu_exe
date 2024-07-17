import React from 'react'
import { Typography, Button, Form, Input, Space, Flex, App } from 'antd'
import type { FormProps } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import api from '~/api'
const { Title, Text } = Typography

type FieldType = {
  otp: string
}
const VerifyPage: React.FC = () => {
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const email = searchParams.get('email')
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      await api.verify(email!, Number(values.otp))
      navigate('/login')
      notification.success({ message: `Xác thực thành công` })
    } catch (err) {
      notification.error({ message: (err as string) || 'Sorry! Something went wrong. App server error' })
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className='relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-[#ffffff]'>
      <div className='absolute top-10'>
        <img src='/logo.svg' className='w-mx-auto' />
      </div>
      <div className='max-w-xl px-5 text-center'>
        <Title className='drop-shadow-lg'>Email Verification</Title>
        <Text className='mb-2 text-[#5F636A]'>
          We've sent an verification to{' '}
          <span className='font-medium text-indigo-500'>{email ? email : 'mail@yourdomain.com'}</span>. to verify your
          email address and activate your account.
        </Text>
        <Form
          name='register_form'
          className='mt-5'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType> name='otp' rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input size='large' placeholder='Verification Code' />
          </Form.Item>

          <Form.Item>
            <Button className='w-full' size='large' type='primary' htmlType='submit'>
              <Space>
                Verify My Account
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

          <Flex gap='middle' align='center' justify='center'>
            <Text className='text-[#878F9A] text-center'>
              Did't recieve any code!
              <Button type='link' className='!text-primary'>
                Resends
              </Button>
            </Text>
          </Flex>
        </Form>
      </div>
    </div>
  )
}
export default VerifyPage
