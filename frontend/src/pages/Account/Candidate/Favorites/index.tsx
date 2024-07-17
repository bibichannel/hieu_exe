import api, { formatError } from '~/api'
import useFetch from '~/hooks/useFetch'
import { useAuthStore } from '~/stores'
import {
  Button,
  Modal,
  Space,
  Table,
  Tag,
  Typography,
  UploadFile,
  UploadProps,
  message,
  notification,
  type TableProps
} from 'antd'
import { JobResponse } from '~/api/v1'
import { InboxOutlined } from '@ant-design/icons'
import Dragger from 'antd/es/upload/Dragger'
import { RcFile } from 'antd/es/upload'
import { useState } from 'react'

interface Application {
  id: number
  jobId: number
  jobTitle: string
  freelancerName: string | null
  cvUrl: string | null
  status: string
  dateApplied: string
}

const FavoritePage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.auth?.accessToken)
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<UploadFile[]>([])
  const [open, setOpen] = useState(false)
  const [responseFavoriteJob] = useFetch(() =>
    api.getFavoriteJobs({ headers: { Authorization: `Bearer ${accessToken}` } })
  )
  const [id, setId] = useState<number>()
  const props: UploadProps = {
    name: 'file',
    multiple: false,
    accept: '.pdf',
    fileList: files,
    beforeUpload: (file: RcFile) => {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
      }

      return false
    },
    onChange(info) {
      const { status } = info.file
      if (status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`)
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
      setFiles(info.fileList)
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files)
    }
  }
  const columns: TableProps<JobResponse>['columns'] = [
    {
      title: 'Job Title',
      dataIndex: 'jobTitle',
      key: 'jobTitle',
      render: (text) => <Typography.Text>{text}</Typography.Text>
    },
    // {
    //   title: 'Date Applied',
    //   dataIndex: 'dateApplied',
    //   key: 'dateApplied'
    // },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   key: 'status',
    //   render: (status: string) => {
    //     let color = 'blue'
    //     if (status === 'ACCEPTED') {
    //       color = 'green'
    //     } else if (status === 'REJECTED') {
    //       color = 'red'
    //     } else if (status === 'PENDING') {
    //       color = 'orange'
    //     }
    //     return <Tag color={color}>{status}</Tag>
    //   }
    // },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => {
        const expirationDate = new Date(record.expirationDate!)
        const currentDate = new Date()

        if (expirationDate < currentDate) {
          return (
            <Button type='primary' size='large' disabled>
              Deadline Expired
            </Button>
          )
        }
        return (
          <Button
            type='primary'
            size='large'
            onClick={() => {
              setId(record.id!)
              setOpen(true)
            }}
          >
            Apply Now
          </Button>
        )
      }
    }
  ]

  const handleApply = async () => {
    try {
      setLoading(true)
      await api.applyJob(Number(id), files[0].originFileObj, undefined, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      setFiles([])
      notification.success({ message: 'Apply thành công' })
    } catch (error) {
      notification.error({ message: formatError(error) })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className='w-full h-full'>
      <Modal
        title='Chọn CV'
        style={{ top: 20 }}
        open={open}
        footer={(_, { CancelBtn }) => (
          <>
            <CancelBtn />
            <Button
              type='primary'
              loading={loading}
              onClick={() => {
                handleApply()
                setOpen(false)
              }}
            >
              Ok
            </Button>
          </>
        )}
        onCancel={() => setOpen(false)}
        width={1000}
      >
        <Dragger {...props}>
          <p className='ant-upload-drag-icon'>
            <InboxOutlined />
          </p>
          <p className='ant-upload-text'>Click or drag CV to this area to upload</p>
          <p className='ant-upload-hint'>
            Support for a single upload. Strictly prohibited from uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Typography.Title level={3}>My Job</Typography.Title>
        <Table columns={columns} dataSource={responseFavoriteJob ? responseFavoriteJob.data : []} />
      </div>
    </div>
  )
}

export default FavoritePage
