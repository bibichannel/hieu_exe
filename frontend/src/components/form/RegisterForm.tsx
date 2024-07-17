import React from 'react'
import {
  Typography,
  Button,
  Form,
  Input,
  Space,
  Row,
  Col,
  Flex,
  Divider,
  Checkbox,
  Radio,
  ConfigProvider,
  App
} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import type { FormProps } from 'antd'
import { useAuthStore } from '~/stores'
import { formatErrorMessage } from '~/utils'
const { Title, Text } = Typography

type FieldType = {
  role: string
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  remember?: boolean
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate()
  const registerUser = useAuthStore((state) => state.registerUser)
  const { notification } = App.useApp()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values)
    try {
      values.role = values.role.toUpperCase()
      await registerUser(values)
      navigate(`/verify?email=${values.email}`)
      notification.success({ message: `Vui lòng kiểm tra Email` })
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
        <Title className='drop-shadow-lg'>Create account</Title>
        <Text className='text-[#878F9A]'>
          Already have an account?{' '}
          <Link to='/login' className='!text-primary'>
            Log in
          </Link>
        </Text>

        <Form
          name='register_form'
          className='mt-5'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          initialValues={{ remember: false, role: 'employer' }}
        >
          <Form.Item<FieldType> className='bg-[#F7F7F8] p-4'>
            <Space direction='vertical' className='w-full'>
              <Flex gap='middle' align='center' justify='center'>
                <Text className='text-[#878F9A] text-center'>CREATE ACCOUNT AS A</Text>
              </Flex>

              <ConfigProvider
                theme={{
                  token: {
                    // colorBorder: 'none'
                    controlHeight: 40
                  },
                  components: {
                    Radio: {}
                  }
                }}
              >
                <Form.Item<FieldType> name='role' className='!mb-0'>
                  <Radio.Group buttonStyle='solid' className='w-full'>
                    <Flex gap='middle'>
                      <Radio.Button value='candidate' className='w-full font-semibold rounded-lg'>
                        <Flex gap='middle' align='center' justify='center'>
                          <svg
                            className='w-4 inline'
                            width='22'
                            height='22'
                            viewBox='0 0 22 22'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M20.6467 11.0001C20.6467 13.8727 19.3909 16.452 17.3987 18.2192C15.6964 19.7286 13.4557 20.6457 11.0013 20.6457C8.54679 20.6457 6.30615 19.7286 4.60342 18.2192C2.61125 16.452 1.35547 13.8727 1.35547 11.0001C1.35547 5.67306 5.67373 1.35449 11.0013 1.35449C16.3288 1.35449 20.6467 5.67306 20.6467 11.0001Z'
                              stroke='#231F20'
                              strokeWidth='2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M11.0011 13.8058C12.9584 13.8058 14.5452 12.2191 14.5452 10.2618C14.5452 8.30448 12.9584 6.71777 11.0011 6.71777C9.04377 6.71777 7.45703 8.30448 7.45703 10.2618C7.45703 12.2191 9.04377 13.8058 11.0011 13.8058Z'
                              stroke='#231F20'
                              strokeWidth='2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M17.3969 18.2185C15.6945 19.7279 13.4539 20.645 10.9994 20.645C8.54494 20.645 6.30429 19.7279 4.60156 18.2185C5.58091 15.6385 8.07594 13.8047 10.9994 13.8047C13.9229 13.8047 16.4175 15.6385 17.3969 18.2185Z'
                              stroke='#231F20'
                              strokeWidth='2'
                              strokeMiterlimit='10'
                            />
                          </svg>
                          Candidate
                        </Flex>
                      </Radio.Button>
                      <Radio.Button value='employer' className='w-full font-semibold rounded-lg'>
                        <Flex gap='middle' align='center' justify='center'>
                          <svg
                            width='22'
                            className='w-4 inline'
                            height='20'
                            viewBox='0 0 22 20'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M2.39062 18.5308V1.61328H13.8572V18.3798'
                              stroke='white'
                              strokeWidth='2'
                              strokeMiterlimit='10'
                            />
                            <path
                              d='M13.8594 5.89844H19.6865V18.5304'
                              stroke='white'
                              strokeWidth='2'
                              strokeMiterlimit='10'
                            />
                            <path d='M0 19H22' stroke='white' strokeWidth='2' strokeMiterlimit='10' />
                            <path d='M7.36854 4.44238H4.53906V6.70597H7.36854V4.44238Z' fill='white' />
                            <path d='M11.6146 4.44238H8.78516V6.70597H11.6146V4.44238Z' fill='white' />
                            <path d='M7.36854 8.12109H4.53906V10.3847H7.36854V8.12109Z' fill='white' />
                            <path d='M11.6146 8.12109H8.78516V10.3847H11.6146V8.12109Z' fill='white' />
                            <path d='M17.5554 8.12109H16.1406V10.3847H17.5554V8.12109Z' fill='white' />
                            <path d='M17.5554 11.5166H16.1406V13.7802H17.5554V11.5166Z' fill='white' />
                            <path d='M7.36854 11.5166H4.53906V13.7802H7.36854V11.5166Z' fill='white' />
                            <path d='M11.6146 11.5166H8.78516V13.7802H11.6146V11.5166Z' fill='white' />
                          </svg>
                          Employers
                        </Flex>
                      </Radio.Button>
                    </Flex>
                  </Radio.Group>
                </Form.Item>
              </ConfigProvider>
            </Space>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item<FieldType>
                name='firstName'
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input size='large' placeholder='First Name' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                name='lastName'
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input size='large' placeholder='Last Name' />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item<FieldType> name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
            <Input size='large' placeholder='Email address' />
          </Form.Item>

          <Form.Item<FieldType> name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
            <Input.Password size='large' placeholder='Password' />
          </Form.Item>

          <Form.Item<FieldType>
            name='confirmPassword'
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('The two passwords do not match!'))
                }
              })
            ]}
          >
            <Input.Password size='large' placeholder='Confirm Password' />
          </Form.Item>

          <Form.Item>
            <Form.Item<FieldType>
              name='remember'
              valuePropName='checked'
              noStyle
              rules={[
                {
                  validator: (_, value) =>
                    value ? Promise.resolve() : Promise.reject('You must agree to the terms and conditions!')
                }
              ]}
            >
              <Checkbox>I've read and agree with your</Checkbox>
            </Form.Item>
            <Link className='text-primary' to=''>
              Terms of Services
            </Link>
          </Form.Item>

          <Form.Item>
            <Button className='w-full' size='large' type='primary' htmlType='submit'>
              Create
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

export default RegisterForm
