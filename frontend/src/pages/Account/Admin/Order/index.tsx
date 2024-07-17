import api from '~/api'
import useFetch from '~/hooks/useFetch'
import { Button, Table, Tag } from 'antd'
import type { TableProps } from 'antd'
import { PaymentResponse } from '~/api/v1'
import { formatCurrencyVND, formatDateToDDMMYYYYHHMMSS } from '~/utils'
import { useSearchParams } from 'react-router-dom'

const OrderPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [response] = useFetch(
    () =>
      api.getAllPayments(
        searchParams.get('page') ? Number(searchParams.get('page')) : 1,
        searchParams.get('size') ? Number(searchParams.get('size')) : 8
      ),
    searchParams.get('page'),
    searchParams.get('size')
  )
  const columns: TableProps<PaymentResponse>['columns'] = [
    {
      title: 'Khách hàng',
      dataIndex: 'user',
      key: 'user',
      render: (user) => <a>{user.fullName}</a>
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'amount',
      key: 'amount',
      render: (text) => formatCurrencyVND(text)
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text) => formatDateToDDMMYYYYHHMMSS(new Date(text))
    },
    {
      title: 'Ngày giao dịch',
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      render: (text) => text && formatDateToDDMMYYYYHHMMSS(new Date(text))
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'Mã đơn hàng',
      dataIndex: 'orderCode',
      key: 'orderCode'
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        if (text === 'PAID') {
          return <Tag color='success'>Đã thanh toán</Tag>
        }
        if (text === 'CANCELLED') {
          return <Tag color='error'>Hủy</Tag>
        }
        if (text === 'PENDING') {
          return <Tag color='warning'>Chờ thanh toán</Tag>
        }
      }
    },

    {
      title: 'Chi tiết',
      key: 'action',
      render: (_, record) => <Button>Xem</Button>
    }
  ]
  return (
    <div>
      {/* <div className='py-5 px-10 md:py-10 md:px-20'> */}
      <Table
        pagination={{
          current: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
          position: ['bottomLeft'],
          pageSize: searchParams.get('size') ? Number(searchParams.get('size')) : 8,
          total: response?.totalElements
        }}
        columns={columns}
        dataSource={response ? (response.content as PaymentResponse[]) : []}
        onChange={(pagination) => {
          const queryParams = new URLSearchParams({
            page: pagination.current!.toString(),
            size: pagination.pageSize!.toString()
          })

          setSearchParams(queryParams.toString())
        }}
      />
      {/* </div> */}
    </div>
  )
}

export default OrderPage
