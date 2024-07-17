import React from 'react'
import { Flex, Layout, Typography, ConfigProvider, Button, Menu, Avatar, Dropdown, MenuProps } from 'antd'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '~/stores'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { formatUserImageUrl } from '~/utils'
const { Header, Content, Footer } = Layout
const { Text } = Typography
type CommonLayoutTypes = {
  children?: React.ReactNode
}

const CommonLayout: React.FC<CommonLayoutTypes> = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuthStore((state) => state.auth)
  const logoutUser = useAuthStore((state) => state.logoutUser)
  const pathSegments = location.pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]
  const items: MenuProps['items'] = [
    {
      label: <Link to='/account/profile'>Thông tin</Link>,
      key: '3',
      icon: <UserOutlined />
    },
    {
      type: 'divider'
    },
    {
      label: 'Đăng xuất',
      key: '4',
      icon: <LogoutOutlined />
    }
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    if (e.key === '4') {
      logoutUser()
    }
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            headerBg: '#FFFFFF',
            headerHeight: 60,
            footerBg: '#FFFFFF'
          }
        }
      }}
    >
      <Layout className='h-full min-h-screen'>
        <Header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1,
            width: '100%'
          }}
        >
          <Flex align='center' justify='space-between'>
            <Flex align='center' gap={10} className='w-[25%] hidden lg:block'>
              <Link to='/'>
                <img src='/logo.svg' />
              </Link>
            </Flex>
            <Menu
              mode='horizontal'
              selectedKeys={[`${lastSegment}`]}
              items={[
                {
                  key: '',
                  label: <Link to='/'>Trang chủ</Link>
                },
                {
                  key: 'findjob',
                  label: <Link to='/findjob'>Việc làm</Link>
                },
                {
                  key: 'packages',
                  label: <Link to='/packages'>Mua gói</Link>
                }
              ]}
              style={{ flex: 1, minWidth: 0, justifyContent: 'center' }}
            />
            {!auth && (
              <Flex align='center' justify='flex-end' gap={15} className='lg:w-[25%]'>
                <Button
                  className='h-[48px] !text-[#42464D]'
                  onClick={() => {
                    navigate('/register')
                  }}
                >
                  Đăng kí
                </Button>
                <Button
                  type='primary'
                  className='h-[48px]'
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  Đăng nhập
                </Button>
              </Flex>
            )}
            {auth && (
              <Flex align='center' justify='flex-end' gap={15} className='lg:w-[25%]'>
                <Text>{auth.fullName}</Text>
                <Dropdown menu={{ items, onClick }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Avatar size={'large'} src={formatUserImageUrl(auth.imageUrl)} />
                  </a>
                </Dropdown>
              </Flex>
            )}
          </Flex>
        </Header>
        <Content>
          <div
            style={{
              height: '100%',
              width: '100%'
            }}
          >
            {children ? children : <Outlet />}
          </div>
        </Content>
        <Footer className='text-center'>© JobSeeker. {new Date().getFullYear()} — All rights reserved.</Footer>
      </Layout>
    </ConfigProvider>
  )
}

export default CommonLayout
