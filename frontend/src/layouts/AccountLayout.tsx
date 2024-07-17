import { Layout, Menu, ConfigProvider, MenuProps } from 'antd'
import { useEffect } from 'react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { AuthResponseRoleEnum } from '~/api/v1'

import { useAuthStore } from '~/stores'
const { Sider } = Layout
const AccountLayout: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const logoutUser = useAuthStore((state) => state.logoutUser)

  const auth = useAuthStore((state) => state.auth)
  const pathSegments = location.pathname.split('/')
  const lastSegment = pathSegments[pathSegments.length - 1]
  const items: MenuProps['items'] = [
    ...(auth?.role === AuthResponseRoleEnum.Employer
      ? [
          {
            key: 'profile',
            label: <Link to='profile'>Thông tin cá nhân</Link>
          },
          {
            key: 'postjob',
            label: <Link to='employer/postjob'>Đăng việc làm</Link>
          },
          {
            key: 'myjob',
            label: <Link to='employer/myjob'>Việc làm</Link>
          }
        ]
      : []),
    ...(auth?.role === AuthResponseRoleEnum.Candidate
      ? [
          {
            key: 'profile',
            label: <Link to='profile'>Thông tin cá nhân</Link>
          },
          {
            key: 'applyjob',
            label: <Link to='candidate/applyjob'>Việc làm</Link>
          },
          {
            key: 'favoritejob',
            label: <Link to='candidate/favoritejob'>Việc làm yêu thích</Link>
          }
        ]
      : []),
    ...(auth?.role === AuthResponseRoleEnum.Admin
      ? [
          {
            key: 'profile',
            label: <Link to='profile'>Thông tin cá nhân</Link>
          },
          {
            key: 'dashboard',
            label: <Link to='admin/dashboard'>Dashboard</Link>
          },
          {
            key: 'orders',
            label: <Link to='admin/orders'>Giao dịch</Link>
          }
        ]
      : []),
    {
      key: '5',
      label: 'Đăng xuất'
    }
  ]
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
    if (e.key === '5') {
      logoutUser()
      // navigate('/login')
    }
  }

  useEffect(() => {
    if (!auth) {
      navigate('/login')
    }
  }, [location, auth, navigate])

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            siderBg: '#F7F7F7',
            triggerColor: 'black',
            headerBg: '#FFFFFF',
            headerHeight: 60,
            footerBg: '#FFFFFF'
          },
          Menu: {
            itemBg: '#F7F7F7',
            itemActiveBg: '#FFFFFF',
            itemSelectedBg: '#FFFFFF',
            itemHoverBg: '#FFFFFF',

            itemColor: '#42464D',
            itemHoverColor: '#42464D',
            itemSelectedColor: '#42464D'
          }
        }
      }}
    >
      <Layout hasSider>
        <Sider
          width={250}
          // style={{ paddingTop: 30 }}
          breakpoint='lg'
          collapsedWidth={0}
          onBreakpoint={(broken) => {
            console.log(broken)
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type)
          }}
        >
          <Menu
            onClick={onClick}
            // style={{ marginTop: 30 }}
            className='menuItem'
            mode='inline'
            selectedKeys={[`${lastSegment}`]}
            items={items}
          />
        </Sider>
        <Layout
          style={{
            background: '#FFFFFF',
            minHeight: '100vh'
          }}
        >
          <Outlet />
        </Layout>
      </Layout>
    </ConfigProvider>
  )
}
export default AccountLayout
