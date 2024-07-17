import { InboxOutlined } from '@ant-design/icons'
import {
  App,
  Button,
  Card,
  Col,
  Divider,
  Flex,
  List,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
  UploadProps,
  message
} from 'antd'
import { RcFile } from 'antd/es/upload'
import Dragger from 'antd/es/upload/Dragger'
import { UploadFile } from 'antd/lib'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import api, { formatError } from '~/api'
import { SearchJobsSortByEnum, SearchJobsSortOrderEnum } from '~/api/v1'
import JobCard from '~/components/JobCard'
import useFetch from '~/hooks/useFetch'
import { useAuthStore } from '~/stores'
import { formatCurrencyVND, formatDateToDDMMYYYY } from '~/utils'
const { Title } = Typography
const imgStyle: React.CSSProperties = {
  display: 'block',
  width: 86,
  height: 86,
  flex: '0 0 86px'
}

const searchJobs = (page: number, size: number, sortBy: SearchJobsSortByEnum, sortOrder: SearchJobsSortOrderEnum) => {
  return api.searchJobs(
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    page,
    size,
    sortBy,
    sortOrder
  )
}

const JobDetailPage: React.FC = () => {
  const { id } = useParams()

  const accessToken = useAuthStore((state) => state.auth?.accessToken)
  const { notification, message } = App.useApp()
  const [response] = useFetch(() => api.getJobById(Number(id)))
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState<UploadFile[]>([])
  const [open, setOpen] = useState(false)

  const fetchProfile = () => {
    return api.getProfile({ headers: { Authorization: `Bearer ${accessToken}` } })
  }
  const [responseJobHighSalary, loadingJobHighSalary] = useFetch(() =>
    searchJobs(0, 9, SearchJobsSortByEnum.Salary, SearchJobsSortOrderEnum.Desc)
  )
  const [responseProfile] = useFetch(fetchProfile)

  const dataJobHighSalary = responseJobHighSalary ? responseJobHighSalary.content : []

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
    <div className='h-full w-full'>
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
      <div className='py-5 px-10 md:py-10 md:px-20 bg-[#E9E9E9]'>
        <Title level={2}>Job Detail</Title>
      </div>
      <div className='py-5  md:py-10 md:px-20 bg-[#E9E9E9]'>
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} md={24} lg={14} xl={14}>
            <Card>
              <Flex align='center' className='p-5 ' gap={20}>
                <div style={imgStyle}>
                  <img alt='avatar' src='/fb.png' className='object-contain align-middle w-full h-full' />
                </div>

                <Flex vertical className='flex-1 overflow-hidden'>
                  <Typography.Title className='truncate'>{response?.jobTitle}</Typography.Title>
                  <Flex gap={10}>
                    <Typography.Text>at {response?.city} </Typography.Text>
                    {response?.jobTypes?.map((tag) => <Tag color='#0BA02C'>{tag}</Tag>)}
                  </Flex>
                </Flex>
              </Flex>
              <div className='p-5 pt-0'>
                <div dangerouslySetInnerHTML={{ __html: response ? response.jobDescription! : '' }} />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={24} lg={10} xl={10}>
            <Card>
              <Flex justify='flex-end' className='mb-10'>
                <Button
                  type='primary'
                  size='large'
                  onClick={() => {
                    if (responseProfile?.purchasedPackages?.length <= 0) {
                      message.error('Vui lòng mua gói')
                      return
                    }
                    setOpen(true)
                  }}
                >
                  Apply Now
                </Button>
              </Flex>
              <Card bordered className='mb-6'>
                <Flex align='flex-start' justify='space-between'>
                  <Flex vertical align='center' className='flex-1' gap={10}>
                    <Typography.Text strong>Salary (USD)</Typography.Text>
                    <Typography.Text className='text-[#3FB459]'>
                      {formatCurrencyVND(response?.minimumSalary)} - {formatCurrencyVND(response?.maximumSalary)}
                    </Typography.Text>
                    <Typography.Text>Monthly salary</Typography.Text>
                  </Flex>
                  <Divider
                    type='vertical'
                    className='h-24'
                    style={{
                      borderInlineStart: '2px solid rgba(5, 5, 5, 0.06)'
                    }}
                  />
                  <Flex vertical align='center' className='flex-1' gap={10}>
                    <Typography.Text strong>Job Location</Typography.Text>
                    <Typography.Text>
                      {response?.city},{response?.country}
                    </Typography.Text>
                  </Flex>
                </Flex>
              </Card>
              <Card bordered className='mb-6'>
                <Typography.Text strong>Job Bennefits</Typography.Text>
                <Flex wrap gap='small' className='mt-2'>
                  {response?.jobBenefits?.map((benefit, index) => (
                    <Tag key={index} className='text-[#3A974F]'>
                      {benefit}
                    </Tag>
                  ))}
                </Flex>
              </Card>
              <Card bordered>
                <Typography.Text strong className='font-medium'>
                  Job Overview
                </Typography.Text>
                <Flex wrap gap={50} className='mt-2'>
                  <Space direction='vertical'>
                    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M30.9375 6.46875H25.0312V4.21875C25.0312 4.06406 24.9047 3.9375 24.75 3.9375H22.7812C22.6266 3.9375 22.5 4.06406 22.5 4.21875V6.46875H13.5V4.21875C13.5 4.06406 13.3734 3.9375 13.2188 3.9375H11.25C11.0953 3.9375 10.9688 4.06406 10.9688 4.21875V6.46875H5.0625C4.44023 6.46875 3.9375 6.97148 3.9375 7.59375V30.9375C3.9375 31.5598 4.44023 32.0625 5.0625 32.0625H30.9375C31.5598 32.0625 32.0625 31.5598 32.0625 30.9375V7.59375C32.0625 6.97148 31.5598 6.46875 30.9375 6.46875ZM29.5312 29.5312H6.46875V16.1719H29.5312V29.5312ZM29.5312 13.7812H6.46875V9H10.9688V10.6875C10.9688 10.8422 11.0953 10.9688 11.25 10.9688H13.2188C13.3734 10.9688 13.5 10.8422 13.5 10.6875V9H22.5V10.6875C22.5 10.8422 22.6266 10.9688 22.7812 10.9688H24.75C24.9047 10.9688 25.0312 10.8422 25.0312 10.6875V9H29.5312V13.7812Z'
                        fill='#C52390'
                      />
                    </svg>

                    <Typography.Text className='font-semibold text-[#666666]'>JOB POSTERD</Typography.Text>
                    <Typography.Text strong>
                      {formatDateToDDMMYYYY(response ? new Date(response.createdAt!) : new Date())}
                    </Typography.Text>
                  </Space>
                  <Space direction='vertical'>
                    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M21.9203 14.8184C21.8675 14.766 21.7961 14.7367 21.7217 14.7367C21.6473 14.7367 21.5759 14.766 21.5231 14.8184L18.5523 17.7891C17.8949 17.6133 17.1672 17.782 16.6504 18.2988C16.4673 18.4815 16.3221 18.6985 16.223 18.9374C16.1239 19.1763 16.0729 19.4324 16.0729 19.691C16.0729 19.9496 16.1239 20.2057 16.223 20.4446C16.3221 20.6835 16.4673 20.9005 16.6504 21.0832C16.8331 21.2662 17.0501 21.4115 17.289 21.5106C17.5279 21.6096 17.784 21.6606 18.0426 21.6606C18.3012 21.6606 18.5573 21.6096 18.7962 21.5106C19.0351 21.4115 19.2521 21.2662 19.4348 21.0832C19.6796 20.8391 19.8557 20.5347 19.9452 20.2007C20.0347 19.8668 20.0345 19.5151 19.9445 19.1812L22.9152 16.2105C23.0242 16.1016 23.0242 15.9223 22.9152 15.8133L21.9203 14.8184ZM17.2269 11.25H18.7738C18.9285 11.25 19.0551 11.1234 19.0551 10.9688V8.15625C19.0551 8.00156 18.9285 7.875 18.7738 7.875H17.2269C17.0723 7.875 16.9457 8.00156 16.9457 8.15625V10.9688C16.9457 11.1234 17.0723 11.25 17.2269 11.25Z'
                        fill='#C52390'
                      />
                      <path
                        d='M32.5125 13.5563C31.7219 11.6849 30.5757 9.98475 29.1375 8.55C27.7028 7.11179 26.0026 5.96561 24.1313 5.175C22.1871 4.35234 20.127 3.9375 18 3.9375C15.873 3.9375 13.8129 4.35234 11.8688 5.175C9.99741 5.96561 8.29725 7.11179 6.8625 8.55C5.42429 9.98475 4.27811 11.6849 3.4875 13.5563C2.66484 15.5004 2.25 17.5605 2.25 19.6875C2.25 24.3527 4.29961 28.7473 7.87148 31.7496L7.93125 31.7988C8.13516 31.9676 8.3918 32.0625 8.65547 32.0625H27.348C27.6117 32.0625 27.8684 31.9676 28.0723 31.7988L28.132 31.7496C31.7004 28.7473 33.75 24.3527 33.75 19.6875C33.75 17.5605 33.3316 15.5004 32.5125 13.5563ZM26.768 29.3906H9.23203C7.87358 28.1658 6.78786 26.6689 6.04532 24.9973C5.30278 23.3257 4.92002 21.5166 4.92188 19.6875C4.92188 16.193 6.28242 12.9094 8.75391 10.4414C11.2254 7.96992 14.509 6.60938 18 6.60938C21.4945 6.60938 24.7781 7.96992 27.2461 10.4414C29.7176 12.9129 31.0781 16.1965 31.0781 19.6875C31.0781 23.4 29.5137 26.9121 26.768 29.3906Z'
                        fill='#C52390'
                      />
                      <path
                        d='M26.8137 11.9813L25.7203 10.8879C25.6675 10.8356 25.5961 10.8062 25.5217 10.8062C25.4473 10.8062 25.3759 10.8356 25.323 10.8879L23.3332 12.8778C23.2809 12.9306 23.2515 13.002 23.2515 13.0764C23.2515 13.1508 23.2809 13.2222 23.3332 13.275L24.4266 14.3684C24.5355 14.4774 24.7148 14.4774 24.8238 14.3684L26.8137 12.3785C26.9227 12.2696 26.9227 12.0903 26.8137 11.9813ZM26.3672 18.9141V20.4609C26.3672 20.6156 26.4937 20.7422 26.6484 20.7422H29.4609C29.6156 20.7422 29.7422 20.6156 29.7422 20.4609V18.9141C29.7422 18.7594 29.6156 18.6328 29.4609 18.6328H26.6484C26.4937 18.6328 26.3672 18.7594 26.3672 18.9141ZM10.691 10.8879C10.6382 10.8356 10.5668 10.8062 10.4924 10.8062C10.418 10.8062 10.3466 10.8356 10.2937 10.8879L9.20039 11.9813C9.14805 12.0341 9.11869 12.1055 9.11869 12.1799C9.11869 12.2543 9.14805 12.3257 9.20039 12.3785L11.1902 14.3684C11.2992 14.4774 11.4785 14.4774 11.5875 14.3684L12.6809 13.275C12.7898 13.166 12.7898 12.9867 12.6809 12.8778L10.691 10.8879ZM9.21094 18.6328H6.39844C6.24375 18.6328 6.11719 18.7594 6.11719 18.9141V20.4609C6.11719 20.6156 6.24375 20.7422 6.39844 20.7422H9.21094C9.36562 20.7422 9.49219 20.6156 9.49219 20.4609V18.9141C9.49219 18.7594 9.36562 18.6328 9.21094 18.6328Z'
                        fill='#C52390'
                      />
                    </svg>

                    <Typography.Text className='font-semibold text-[#666666]'>JOB EXPIRE IN</Typography.Text>
                    <Typography.Text strong>
                      {formatDateToDDMMYYYY(response ? new Date(response.expirationDate!) : new Date())}
                    </Typography.Text>
                  </Space>
                  <Space direction='vertical'>
                    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M30.9375 6.46875H25.0312V4.21875C25.0312 4.06406 24.9047 3.9375 24.75 3.9375H22.7812C22.6266 3.9375 22.5 4.06406 22.5 4.21875V6.46875H13.5V4.21875C13.5 4.06406 13.3734 3.9375 13.2188 3.9375H11.25C11.0953 3.9375 10.9688 4.06406 10.9688 4.21875V6.46875H5.0625C4.44023 6.46875 3.9375 6.97148 3.9375 7.59375V30.9375C3.9375 31.5598 4.44023 32.0625 5.0625 32.0625H30.9375C31.5598 32.0625 32.0625 31.5598 32.0625 30.9375V7.59375C32.0625 6.97148 31.5598 6.46875 30.9375 6.46875ZM29.5312 29.5312H6.46875V16.1719H29.5312V29.5312ZM29.5312 13.7812H6.46875V9H10.9688V10.6875C10.9688 10.8422 11.0953 10.9688 11.25 10.9688H13.2188C13.3734 10.9688 13.5 10.8422 13.5 10.6875V9H22.5V10.6875C22.5 10.8422 22.6266 10.9688 22.7812 10.9688H24.75C24.9047 10.9688 25.0312 10.8422 25.0312 10.6875V9H29.5312V13.7812Z'
                        fill='#C52390'
                      />
                    </svg>

                    <Typography.Text className='font-semibold text-[#666666]'>JOB LEVEL:</Typography.Text>
                    <Typography.Text strong>{response?.jobLevel}</Typography.Text>
                  </Space>
                  <Space direction='vertical'>
                    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M21.9203 14.8184C21.8675 14.766 21.7961 14.7367 21.7217 14.7367C21.6473 14.7367 21.5759 14.766 21.5231 14.8184L18.5523 17.7891C17.8949 17.6133 17.1672 17.782 16.6504 18.2988C16.4673 18.4815 16.3221 18.6985 16.223 18.9374C16.1239 19.1763 16.0729 19.4324 16.0729 19.691C16.0729 19.9496 16.1239 20.2057 16.223 20.4446C16.3221 20.6835 16.4673 20.9005 16.6504 21.0832C16.8331 21.2662 17.0501 21.4115 17.289 21.5106C17.5279 21.6096 17.784 21.6606 18.0426 21.6606C18.3012 21.6606 18.5573 21.6096 18.7962 21.5106C19.0351 21.4115 19.2521 21.2662 19.4348 21.0832C19.6796 20.8391 19.8557 20.5347 19.9452 20.2007C20.0347 19.8668 20.0345 19.5151 19.9445 19.1812L22.9152 16.2105C23.0242 16.1016 23.0242 15.9223 22.9152 15.8133L21.9203 14.8184ZM17.2269 11.25H18.7738C18.9285 11.25 19.0551 11.1234 19.0551 10.9688V8.15625C19.0551 8.00156 18.9285 7.875 18.7738 7.875H17.2269C17.0723 7.875 16.9457 8.00156 16.9457 8.15625V10.9688C16.9457 11.1234 17.0723 11.25 17.2269 11.25Z'
                        fill='#C52390'
                      />
                      <path
                        d='M32.5125 13.5563C31.7219 11.6849 30.5757 9.98475 29.1375 8.55C27.7028 7.11179 26.0026 5.96561 24.1313 5.175C22.1871 4.35234 20.127 3.9375 18 3.9375C15.873 3.9375 13.8129 4.35234 11.8688 5.175C9.99741 5.96561 8.29725 7.11179 6.8625 8.55C5.42429 9.98475 4.27811 11.6849 3.4875 13.5563C2.66484 15.5004 2.25 17.5605 2.25 19.6875C2.25 24.3527 4.29961 28.7473 7.87148 31.7496L7.93125 31.7988C8.13516 31.9676 8.3918 32.0625 8.65547 32.0625H27.348C27.6117 32.0625 27.8684 31.9676 28.0723 31.7988L28.132 31.7496C31.7004 28.7473 33.75 24.3527 33.75 19.6875C33.75 17.5605 33.3316 15.5004 32.5125 13.5563ZM26.768 29.3906H9.23203C7.87358 28.1658 6.78786 26.6689 6.04532 24.9973C5.30278 23.3257 4.92002 21.5166 4.92188 19.6875C4.92188 16.193 6.28242 12.9094 8.75391 10.4414C11.2254 7.96992 14.509 6.60938 18 6.60938C21.4945 6.60938 24.7781 7.96992 27.2461 10.4414C29.7176 12.9129 31.0781 16.1965 31.0781 19.6875C31.0781 23.4 29.5137 26.9121 26.768 29.3906Z'
                        fill='#C52390'
                      />
                      <path
                        d='M26.8137 11.9813L25.7203 10.8879C25.6675 10.8356 25.5961 10.8062 25.5217 10.8062C25.4473 10.8062 25.3759 10.8356 25.323 10.8879L23.3332 12.8778C23.2809 12.9306 23.2515 13.002 23.2515 13.0764C23.2515 13.1508 23.2809 13.2222 23.3332 13.275L24.4266 14.3684C24.5355 14.4774 24.7148 14.4774 24.8238 14.3684L26.8137 12.3785C26.9227 12.2696 26.9227 12.0903 26.8137 11.9813ZM26.3672 18.9141V20.4609C26.3672 20.6156 26.4937 20.7422 26.6484 20.7422H29.4609C29.6156 20.7422 29.7422 20.6156 29.7422 20.4609V18.9141C29.7422 18.7594 29.6156 18.6328 29.4609 18.6328H26.6484C26.4937 18.6328 26.3672 18.7594 26.3672 18.9141ZM10.691 10.8879C10.6382 10.8356 10.5668 10.8062 10.4924 10.8062C10.418 10.8062 10.3466 10.8356 10.2937 10.8879L9.20039 11.9813C9.14805 12.0341 9.11869 12.1055 9.11869 12.1799C9.11869 12.2543 9.14805 12.3257 9.20039 12.3785L11.1902 14.3684C11.2992 14.4774 11.4785 14.4774 11.5875 14.3684L12.6809 13.275C12.7898 13.166 12.7898 12.9867 12.6809 12.8778L10.691 10.8879ZM9.21094 18.6328H6.39844C6.24375 18.6328 6.11719 18.7594 6.11719 18.9141V20.4609C6.11719 20.6156 6.24375 20.7422 6.39844 20.7422H9.21094C9.36562 20.7422 9.49219 20.6156 9.49219 20.4609V18.9141C9.49219 18.7594 9.36562 18.6328 9.21094 18.6328Z'
                        fill='#C52390'
                      />
                    </svg>

                    <Typography.Text className='font-semibold text-[#666666]'>EXPERIENCE</Typography.Text>
                    <Typography.Text strong>{response?.experience}</Typography.Text>
                  </Space>
                  <Space direction='vertical'>
                    <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                        d='M21.9203 14.8184C21.8675 14.766 21.7961 14.7367 21.7217 14.7367C21.6473 14.7367 21.5759 14.766 21.5231 14.8184L18.5523 17.7891C17.8949 17.6133 17.1672 17.782 16.6504 18.2988C16.4673 18.4815 16.3221 18.6985 16.223 18.9374C16.1239 19.1763 16.0729 19.4324 16.0729 19.691C16.0729 19.9496 16.1239 20.2057 16.223 20.4446C16.3221 20.6835 16.4673 20.9005 16.6504 21.0832C16.8331 21.2662 17.0501 21.4115 17.289 21.5106C17.5279 21.6096 17.784 21.6606 18.0426 21.6606C18.3012 21.6606 18.5573 21.6096 18.7962 21.5106C19.0351 21.4115 19.2521 21.2662 19.4348 21.0832C19.6796 20.8391 19.8557 20.5347 19.9452 20.2007C20.0347 19.8668 20.0345 19.5151 19.9445 19.1812L22.9152 16.2105C23.0242 16.1016 23.0242 15.9223 22.9152 15.8133L21.9203 14.8184ZM17.2269 11.25H18.7738C18.9285 11.25 19.0551 11.1234 19.0551 10.9688V8.15625C19.0551 8.00156 18.9285 7.875 18.7738 7.875H17.2269C17.0723 7.875 16.9457 8.00156 16.9457 8.15625V10.9688C16.9457 11.1234 17.0723 11.25 17.2269 11.25Z'
                        fill='#C52390'
                      />
                      <path
                        d='M32.5125 13.5563C31.7219 11.6849 30.5757 9.98475 29.1375 8.55C27.7028 7.11179 26.0026 5.96561 24.1313 5.175C22.1871 4.35234 20.127 3.9375 18 3.9375C15.873 3.9375 13.8129 4.35234 11.8688 5.175C9.99741 5.96561 8.29725 7.11179 6.8625 8.55C5.42429 9.98475 4.27811 11.6849 3.4875 13.5563C2.66484 15.5004 2.25 17.5605 2.25 19.6875C2.25 24.3527 4.29961 28.7473 7.87148 31.7496L7.93125 31.7988C8.13516 31.9676 8.3918 32.0625 8.65547 32.0625H27.348C27.6117 32.0625 27.8684 31.9676 28.0723 31.7988L28.132 31.7496C31.7004 28.7473 33.75 24.3527 33.75 19.6875C33.75 17.5605 33.3316 15.5004 32.5125 13.5563ZM26.768 29.3906H9.23203C7.87358 28.1658 6.78786 26.6689 6.04532 24.9973C5.30278 23.3257 4.92002 21.5166 4.92188 19.6875C4.92188 16.193 6.28242 12.9094 8.75391 10.4414C11.2254 7.96992 14.509 6.60938 18 6.60938C21.4945 6.60938 24.7781 7.96992 27.2461 10.4414C29.7176 12.9129 31.0781 16.1965 31.0781 19.6875C31.0781 23.4 29.5137 26.9121 26.768 29.3906Z'
                        fill='#C52390'
                      />
                      <path
                        d='M26.8137 11.9813L25.7203 10.8879C25.6675 10.8356 25.5961 10.8062 25.5217 10.8062C25.4473 10.8062 25.3759 10.8356 25.323 10.8879L23.3332 12.8778C23.2809 12.9306 23.2515 13.002 23.2515 13.0764C23.2515 13.1508 23.2809 13.2222 23.3332 13.275L24.4266 14.3684C24.5355 14.4774 24.7148 14.4774 24.8238 14.3684L26.8137 12.3785C26.9227 12.2696 26.9227 12.0903 26.8137 11.9813ZM26.3672 18.9141V20.4609C26.3672 20.6156 26.4937 20.7422 26.6484 20.7422H29.4609C29.6156 20.7422 29.7422 20.6156 29.7422 20.4609V18.9141C29.7422 18.7594 29.6156 18.6328 29.4609 18.6328H26.6484C26.4937 18.6328 26.3672 18.7594 26.3672 18.9141ZM10.691 10.8879C10.6382 10.8356 10.5668 10.8062 10.4924 10.8062C10.418 10.8062 10.3466 10.8356 10.2937 10.8879L9.20039 11.9813C9.14805 12.0341 9.11869 12.1055 9.11869 12.1799C9.11869 12.2543 9.14805 12.3257 9.20039 12.3785L11.1902 14.3684C11.2992 14.4774 11.4785 14.4774 11.5875 14.3684L12.6809 13.275C12.7898 13.166 12.7898 12.9867 12.6809 12.8778L10.691 10.8879ZM9.21094 18.6328H6.39844C6.24375 18.6328 6.11719 18.7594 6.11719 18.9141V20.4609C6.11719 20.6156 6.24375 20.7422 6.39844 20.7422H9.21094C9.36562 20.7422 9.49219 20.6156 9.49219 20.4609V18.9141C9.49219 18.7594 9.36562 18.6328 9.21094 18.6328Z'
                        fill='#C52390'
                      />
                    </svg>

                    <Typography.Text className='font-semibold text-[#666666]'>EDUCATION</Typography.Text>
                    <Typography.Text strong>{response?.education}</Typography.Text>
                  </Space>
                </Flex>
              </Card>
            </Card>
          </Col>
        </Row>
      </div>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Title level={2}>Việc Làm Bạn Sẽ Thích</Title>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 3
          }}
          loading={loadingJobHighSalary}
          dataSource={dataJobHighSalary}
          renderItem={(item) => (
            <List.Item>
              <JobCard job={item} />
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}

export default JobDetailPage
