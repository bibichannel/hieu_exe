import { Button, Card, Col, message, Row, Space, Typography } from 'antd'
import { useState } from 'react'
import api from '~/api'
import { useAuthStore } from '~/stores'
import useScript from 'react-script-hook'
import { useAppStore } from '~/stores/app/app.store'
import useFetch from '~/hooks/useFetch'

const { Title, Text } = Typography
const PackagesPage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.auth?.accessToken)
  const RETURN_URL = `${window.location.href}`
  const CANCEL_URL = `${window.location.href}`
  const userId = useAuthStore((state) => state.auth?.userId)
  const refetch = useAppStore((state) => state.refetch)
  const [openDialogLoading1, setOpenDialogLoading1] = useState(false)
  const [openDialogLoading2, setOpenDialogLoading2] = useState(false)
  const [openDialogLoading3, setOpenDialogLoading3] = useState(false)
  const [responseProfile] = useFetch(() => api.getProfile({ headers: { Authorization: `Bearer ${accessToken}` } }))
  const [loading, error] = useScript({
    src: 'https://cdn.payos.vn/payos-checkout/v1/stable/payos-initialize.js',
    checkForExisting: true
  })

  const openPaymentDialog = async function (checkoutResponse) {
    console.log(checkoutResponse)
    if (checkoutResponse) {
      const url = checkoutResponse.checkoutUrl
      const { open } = window.PayOSCheckout.usePayOS({
        RETURN_URL: RETURN_URL,
        ELEMENT_ID: 'config_root',
        CHECKOUT_URL: url,
        onExit: (eventData) => {
          console.log(eventData)
        },
        onSuccess: (eventData) => {
          console.log(eventData)
          refetch()
        },
        onCancel: (eventData) => {
          console.log(eventData)
          api.cancelOrder(eventData.orderCode).then((res) => {
            console.log(res)
            refetch()
          })
        }
      })
      open()
    }
  }
  const createPaymentLinkHandle = async function (data, callbackFunction, setCallbackLoading) {
    setCallbackLoading(true)
    try {
      const response = await api.createPaymentLink(data)

      console.log(response)
      if (response.data.error != 0) throw new Error('Call Api failed: ')

      callbackFunction(response.data.data)
      setCallbackLoading(false)
    } catch (error) {
      console.log(error)
      setCallbackLoading(false)
      message.error('Có lỗi xảy ra')
    }
  }
  return (
    <div className='bg-[#FFFFFF] h-full w-full'>
      <div className='py-5 px-10 md:py-10 md:px-20 bg-[#E9E9E9]'>
        <Title level={2}>Các gói</Title>
      </div>

      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Row gutter={16}>
          <Col span={8}>
            <Card title='Gói Cơ Bản' hoverable>
              <Space direction='vertical' className='w-full'>
                <Title level={3}>199.000 đ/tháng</Title>
                <Button
                  type='primary'
                  size='large'
                  disabled={responseProfile?.purchasedPackages?.includes('BASIC')}
                  loading={openDialogLoading1}
                  onClick={() =>
                    createPaymentLinkHandle(
                      {
                        productName: `Mua gói cơ bản`,
                        price: 199000,
                        description: `Mua gói cơ bản`,
                        returnUrl: RETURN_URL,
                        cancelUrl: CANCEL_URL,
                        userId: userId!,
                        packages: 'BASIC'
                      },
                      openPaymentDialog,
                      setOpenDialogLoading1
                    )
                  }
                >
                  Mua
                </Button>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Gói Nâng Cao' hoverable>
              <Space direction='vertical' className='w-full'>
                <Title level={3}>499.000 đ/tháng</Title>
                <Button
                  type='primary'
                  size='large'
                  loading={openDialogLoading2}
                  disabled={responseProfile?.purchasedPackages?.includes('ADVANCED')}
                  onClick={() =>
                    createPaymentLinkHandle(
                      {
                        productName: `Mua gói nâng cao`,
                        price: 499000,
                        description: `Mua gói nâng cao`,
                        returnUrl: RETURN_URL,
                        cancelUrl: CANCEL_URL,
                        userId: userId!,
                        packages: 'ADVANCED'
                      },
                      openPaymentDialog,
                      setOpenDialogLoading2
                    )
                  }
                >
                  Mua
                </Button>
              </Space>
            </Card>
          </Col>
          <Col span={8}>
            <Card title='Gói Vip' hoverable>
              <Space direction='vertical' className='w-full'>
                <Title level={3}>599.000 đ/tháng</Title>
                <Button
                  type='primary'
                  size='large'
                  loading={openDialogLoading3}
                  disabled={responseProfile?.purchasedPackages?.includes('VIP')}
                  onClick={() =>
                    createPaymentLinkHandle(
                      {
                        productName: `Mua gói vip`,
                        price: 599000,
                        description: `Mua gói vip`,
                        returnUrl: RETURN_URL,
                        cancelUrl: CANCEL_URL,
                        userId: userId!,
                        packages: 'VIP'
                      },
                      openPaymentDialog,
                      setOpenDialogLoading3
                    )
                  }
                >
                  Mua
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default PackagesPage
