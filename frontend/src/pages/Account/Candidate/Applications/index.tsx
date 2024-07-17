import api from '~/api'
import useFetch from '~/hooks/useFetch'
import { useAuthStore } from '~/stores'
import { Button, Space, Table, Tag, Typography, type TableProps } from 'antd'

interface Application {
  id: number
  jobId: number
  jobTitle: string
  freelancerName: string | null
  cvUrl: string | null
  status: string
  dateApplied: string
}

const ApplyPage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.auth?.accessToken)
  const [responseJob] = useFetch(() => api.getAppliedJobs({ headers: { Authorization: `Bearer ${accessToken}` } }))

  const columns: TableProps<Application>['columns'] = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (text) => <Typography.Text>{text}</Typography.Text>
    },
    {
      title: 'Date Applied',
      dataIndex: 'dateApplied',
      key: 'dateApplied'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'blue'
        if (status === 'ACCEPTED') {
          color = 'green'
        } else if (status === 'REJECTED') {
          color = 'red'
        } else if (status === 'PENDING') {
          color = 'orange'
        }
        return <Tag color={color}>{status}</Tag>
      }
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type='primary' size='large'>
          View detail
        </Button>
      )
    }
  ]

  // const applications = responseJob?.flatMap((job) =>
  //   job.applications.map((application) => ({
  //     ...application,
  //     jobId: job.jobId,
  //     jobTitle: job.jobTitle
  //   }))
  // )
  console.log(responseJob)
  return (
    <div className='w-full h-full'>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Typography.Title level={3}>My Job</Typography.Title>
        <Table columns={columns} dataSource={responseJob} />
      </div>
    </div>
  )
}

export default ApplyPage
