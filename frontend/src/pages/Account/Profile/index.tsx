import { UserOutlined, EditOutlined } from '@ant-design/icons'
import {
  Row,
  Col,
  Card,
  Skeleton,
  Result,
  Descriptions,
  Space,
  Avatar,
  App,
  Upload,
  Tooltip,
  Button,
  Tag,
  ConfigProvider
} from 'antd'
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/es/upload'
import { useState, useEffect } from 'react'
import ImgCrop from 'antd-img-crop'
import useFetchData from '~/hooks/useFetch'
import { useAuthStore } from '~/stores'
import api from '~/api'
import { formatUserImageUrl } from '~/utils'
const ProfilePage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.auth?.accessToken)
  const fetchProfile = () => {
    return api.getProfile({ headers: { Authorization: `Bearer ${accessToken}` } })
  }
  const { message } = App.useApp()
  const [response, loading, error] = useFetchData(fetchProfile)
  const [data, setData] = useState<any>()
  const [imageUrl, setImageUrl] = useState<string>('error')
  const [render, setRender] = useState<boolean>(true)

  const onChangeAvatar: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {}
  const props: UploadProps = {
    showUploadList: false,
    onChange: onChangeAvatar,
    customRequest: async (options: any) => {},
    beforeUpload: (file: RcFile) => {}
  }
  useEffect(() => {
    if (!loading && !error && response) {
      setData(response)
      setImageUrl(formatUserImageUrl(response.imageUrl))
      setRender(false)
    }
  }, [loading, error, response])
  return (
    <ConfigProvider
      theme={{
        token: {
          lineWidth: 1
        }
      }}
    >
      <div className='p-10'>
        <Row>
          <Col span={24}>
            <Skeleton loading={loading && render} active>
              {error ? (
                <Result title='Failed to fetch' subTitle={error} status='error' />
              ) : (
                <Descriptions
                  title='Thông tin cá nhân'
                  bordered
                  extra={
                    <Space>
                      {/* <UpdatePasswordModal />
                    <ProfileEditModal /> */}
                    </Space>
                  }
                >
                  <Descriptions.Item label='Avatar' span={3}>
                    <Avatar
                      size={100}
                      src={imageUrl}
                      icon={<UserOutlined />}
                      crossOrigin='anonymous'
                      alt='user-image'
                    />
                    {/* user avatar change */}
                    <div style={{ position: 'absolute', marginTop: '-6.5rem', marginLeft: '5rem' }}>
                      <ImgCrop
                        showGrid
                        cropShape='round'
                        rotationSlider
                        beforeCrop={(file: RcFile) => {
                          const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
                          if (!isJpgOrPng) {
                            message.error('You can only upload JPG/PNG file!')
                          }
                          const isLt2M = file.size / 1024 / 1024 < 2
                          if (!isLt2M) {
                            message.error('Image must smaller than 2MB!')
                          }

                          return isJpgOrPng && isLt2M
                        }}
                      >
                        <Upload {...props}>
                          <Tooltip title='Click to change Avatar'>
                            <Button icon={<EditOutlined />} type='default' shape='circle' />
                          </Tooltip>
                        </Upload>
                      </ImgCrop>
                    </div>
                  </Descriptions.Item>

                  <Descriptions.Item label='Tên'>{response?.fullName}</Descriptions.Item>
                  <Descriptions.Item label='Vai trò' span={2}>
                    <Tag style={{ width: '80px', textAlign: 'center', textTransform: 'capitalize' }} color='pink'>
                      {response?.role}
                    </Tag>
                  </Descriptions.Item>

                  <Descriptions.Item label='Email' span={3}>
                    {response?.email}
                  </Descriptions.Item>
                  <Descriptions.Item label='Số lượng đơn nộp' span={3}>
                    120 đơn
                  </Descriptions.Item>
                  <Descriptions.Item label='Số lượng đơn chờ' span={3}>
                    10 đơn
                  </Descriptions.Item>
                  <Descriptions.Item label='Số lượng đơn bị từ chối' span={3}>
                    110 đơn
                  </Descriptions.Item>
                </Descriptions>
              )}
            </Skeleton>
          </Col>
        </Row>
      </div>
    </ConfigProvider>
  )
}

export default ProfilePage
