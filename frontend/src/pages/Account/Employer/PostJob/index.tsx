import type { FormProps } from 'antd'
import { App, Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Space, Typography } from 'antd'
import api, { formatError } from '~/api'
import EditorComponent from '~/components/EditorComponent'
import useFetch from '~/hooks/useFetch'
import dayjs from 'dayjs'
import { useState } from 'react'
import { useAuthStore } from '~/stores'
import { useNavigate } from 'react-router-dom'
import PackagesPage from '~/pages/Packages'
type FieldType = {
  jobTitle: string
  jobDescription: string
  requirementDescription: string
  desirableDescription: string
  benefitDescription: string
  tags: string[]
  jobBenefits: string[]
  jobRoleId: number
  jobTypesId: number[]
  minimumSalary: number
  maximumSalary: number
  educationId: number
  experience: string
  vacancies: number
  expirationDate: string
  expirationDateDayjs: dayjs.Dayjs
  jobLevelId: number
  country: string
  city: string
}
const initialValues: FieldType = {
  jobTitle: 'Software Engineer',
  jobDescription: `
  <h1>Job Description</h1><div class="sc-4913d170-4 jSVTbX" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(51, 51, 51);font-family:Inter, Arial, sans-serif;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;orphans:2;padding:16px 0px;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><div class="sc-4913d170-6 hlTVkb" style="box-sizing:border-box;color:rgb(51, 51, 51);font-size:14px;line-height:22px;margin:0px;padding:0px;white-space:pre-line;word-break:break-word;"><div style="box-sizing:border-box;"><p style="box-sizing:border-box;margin:0px;padding:0px;"><strong style="box-sizing:border-box;font-weight:bolder;">POSITION OVERVIEW</strong></p><p style="box-sizing:border-box;margin:0px;padding:0px;">We are looking for a dynamic Solution Sales Representative to join our team. You will be responsible for achieving business results in solution deals and professional services, meeting sales quotas in assigned product lines and services. Your role will involve expanding customer relationships directly and supporting collaborative sales efforts.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">&nbsp;</p><p style="box-sizing:border-box;margin:0px;padding:0px;">In this exciting and expanding business solution role within the IT domain, you will propose solutions that accurately address customer needs, ensuring high customer satisfaction. This position will focus on Enterprise Solution such as eForm, ECM, IDP and RPA… (excluding printing solutions). This position is ideal for someone with a technical background capable of making intuitive high-level decisions.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">&nbsp;</p><p style="box-sizing:border-box;margin:0px;padding:0px;"><strong style="box-sizing:border-box;font-weight:bolder;">RESPONSIBILITIES</strong></p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Identify or take over the prospect from account sales, fully accountable for closing solution deal.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Develop new prospects by collaborating and/or directly visiting listed customers to discover their potential needs.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Achieve assigned sales targets for profitable sales growth in assigned product lines, market areas, assigned geography or account base.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Analyze and qualify customer requirements to propose solutions that meet their business needs.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Propose complex solution products &amp; services, potentially involving cross-functional and cross-service elements.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Present and document solutions to customers, participate in solution discovery and kick-off meetings with customer.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Collaborate with customers and internal FB teams (Solution consultants, business analysts, project delivery, professional services).</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Submit weekly and monthly sales report and forecast to line manager.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">&nbsp;</p></div></div></div><div class="sc-4913d170-4 jSVTbX" style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);box-sizing:border-box;color:rgb(51, 51, 51);font-family:Inter, Arial, sans-serif;font-size:14px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;orphans:2;padding:16px 0px;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"><h2 class="sc-4913d170-5 kKmzVC" style="box-sizing:border-box;color:rgb(51, 51, 51);font-size:18px;line-height:22px;margin:0px 0px 10px;padding:0px;"><strong>Yêu cầu công việc</strong></h2><div class="sc-4913d170-6 hlTVkb" style="box-sizing:border-box;color:rgb(51, 51, 51);font-size:14px;line-height:22px;margin:0px;padding:0px;white-space:pre-line;word-break:break-word;"><div style="box-sizing:border-box;"><p style="box-sizing:border-box;margin:0px;padding:0px;"><strong style="box-sizing:border-box;font-weight:bolder;">REQUIREMENT</strong></p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Excellent communication and interpersonal skills with a genuine passion for a professional sales career.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Ability to engage customers quickly and professionally to deliver an exceptional customer experience.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Skilled in using common language and communication styles tailored to the receiver’s level of understanding.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Ability to work under high pressure and independently to achieve targets.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Positive thinking with strong analytical and problem-solving skills.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Fluent in English.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">&nbsp;</p><p style="box-sizing:border-box;margin:0px;padding:0px;">&nbsp;</p><p style="box-sizing:border-box;margin:0px;padding:0px;">&nbsp;</p><p style="box-sizing:border-box;margin:0px;padding:0px;"><strong style="box-sizing:border-box;font-weight:bolder;">PROFESSIONAL EXPERIENCE</strong></p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Minimum of 6 months of direct sales experience (B2B) is preferred.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Knowledge of the general IT domain is preferred.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Experience working in a business-to-business large/strategic customer segment is preferred.</p><p style="box-sizing:border-box;margin:0px;padding:0px;">&nbsp;</p><p style="box-sizing:border-box;margin:0px;padding:0px;">&nbsp;</p><p style="box-sizing:border-box;margin:0px;padding:0px;"><strong style="box-sizing:border-box;font-weight:bolder;">BENEFIT</strong></p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Professional training system and training program for every new-hire sales and all staff</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Competitive and attractive incentive + bonus + promotion scheme for all sales, 13th month salary</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• 12 up to 21 annual leave days</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Travel allowance, phone allowance for all business purposes</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Premium healthcare package 24/7, yearly health check</p><p style="box-sizing:border-box;margin:0px;padding:0px;">• Professional working environment</p></div></div></div>
  `,
  requirementDescription: "Bachelor's degree in Computer Science or related field.",
  desirableDescription: 'Experience with React framework.',
  benefitDescription: 'Competitive salary, flexible working hours, health insurance.',
  tags: ['Software Engineer', 'React', 'Full-time'],
  jobBenefits: ['Health insurance', 'Flexible working hours'],
  jobRoleId: 1,
  jobTypesId: [1, 2],
  minimumSalary: 10000000,
  maximumSalary: 15000000,
  educationId: 1,
  experience: '2-5 years',
  vacancies: 3,
  expirationDateDayjs: dayjs('2024-12-31'),
  jobLevelId: 2,
  country: 'Vietnam',
  city: 'Ho Chi Minh City',
  expirationDate: '2024-12-31T12:29:02.582Z'
}
const educationOptions = [
  { value: 1, label: 'High School' },
  { value: 2, label: 'College' },
  { value: 3, label: 'Graduation' },
  { value: 4, label: "Bachelor's Degree" },
  { value: 5, label: "Master's Degree" },
  { value: 6, label: 'PhD' }
]
const jobTypeOptions = [
  { value: 1, label: 'Full-time' },
  { value: 2, label: 'Part-time' },
  { value: 3, label: 'Internship' },
  { value: 4, label: 'Remote' },
  { value: 5, label: 'Contract' },
  { value: 6, label: 'Freelance' },
  { value: 7, label: 'Temporary' }
]
const PostJobPage: React.FC = () => {
  const accessToken = useAuthStore((state) => state.auth?.accessToken)
  const [responseProfile] = useFetch(() => api.getProfile({ headers: { Authorization: `Bearer ${accessToken}` } }))
  const [responseJobRole] = useFetch(() => api.getPopularJobRole(0, 100))
  const [form] = Form.useForm()
  const jobRoles = responseJobRole?.content
  const [loading, setLoading] = useState(false)
  const { notification } = App.useApp()
  const navigate = useNavigate()
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    values.expirationDate = values.expirationDateDayjs.toISOString()
    console.log('Success:', values)
    try {
      setLoading(true)
      await api.createJob(values, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      form.resetFields()
      notification.success({ message: 'Đăng bài thành công' })
    } catch (error) {
      notification.error({ message: formatError(error) })
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  if (responseProfile?.purchasedPackages?.length <= 0) {
    return <PackagesPage />
  }

  return (
    <div className='w-full h-full'>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Typography.Title level={3}>Post a job</Typography.Title>
        <Form
          name='basic'
          form={form}
          layout='vertical'
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
        >
          <Form.Item<FieldType>
            label={<Typography.Text>Title</Typography.Text>}
            name='jobTitle'
            rules={[{ required: true, message: 'Please input the job title!' }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={[32, 32]}>
            <Col span={16}>
              <Form.Item<FieldType>
                label={<Typography.Text>Job Tags</Typography.Text>}
                name='tags'
                rules={[{ required: true, message: 'Please input tags!' }]}
              >
                <Select mode='tags' style={{ width: '100%' }} tokenSeparators={[',']} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<FieldType>
                label={<Typography.Text>Job Role</Typography.Text>}
                name='jobRoleId'
                rules={[{ required: true, message: 'Please select the job role!' }]}
              >
                <Select
                  placeholder='Job role'
                  allowClear
                  showSearch
                  optionFilterProp='label'
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={jobRoles ? jobRoles.map((j) => ({ value: j.id, label: j.name })) : []}
                />
              </Form.Item>
            </Col>
          </Row>

          <Typography.Title level={4}>Salary Information</Typography.Title>
          <Row gutter={[32, 32]}>
            <Col span={12}>
              <Form.Item<FieldType>
                label={<Typography.Text>Minimum Salary</Typography.Text>}
                name='minimumSalary'
                rules={[{ required: true, message: 'Please input the minimum salary!' }]}
              >
                <Input suffix='VNĐ' />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item<FieldType>
                label={<Typography.Text>Maximum Salary</Typography.Text>}
                name='maximumSalary'
                rules={[{ required: true, message: 'Please input the maximum salary!' }]}
              >
                <Input suffix='VNĐ' />
              </Form.Item>
            </Col>
          </Row>

          <Typography.Title level={4}>Advance Information</Typography.Title>
          <Row gutter={[32, 32]}>
            <Col span={8}>
              <Form.Item<FieldType>
                label={<Typography.Text>Education</Typography.Text>}
                name='educationId'
                rules={[{ required: true, message: 'Please input the Education!' }]}
              >
                <Select
                  placeholder='Education'
                  allowClear
                  showSearch
                  optionFilterProp='label'
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={educationOptions}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<FieldType>
                label={<Typography.Text>Experience</Typography.Text>}
                name='experience'
                rules={[{ required: true, message: 'Please input Experience!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<FieldType>
                label={<Typography.Text>Job Type</Typography.Text>}
                name='jobTypesId'
                rules={[{ required: true, message: 'Please input Job Type!' }]}
              >
                <Select
                  placeholder='Job Type'
                  allowClear
                  showSearch
                  mode='multiple'
                  optionFilterProp='label'
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={jobTypeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<FieldType>
                label={<Typography.Text>Vacancies</Typography.Text>}
                name='vacancies'
                rules={[{ required: true, message: 'Please input Vacancies!' }]}
              >
                <InputNumber className='w-full' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<FieldType>
                label={<Typography.Text>Expiration date</Typography.Text>}
                name='expirationDateDayjs'
                rules={[{ required: true, message: 'Please input Experience!' }]}
              >
                <DatePicker className='w-full' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item<FieldType>
                label={<Typography.Text>Job Level</Typography.Text>}
                name='jobLevelId'
                rules={[{ required: true, message: 'Please input Job Level!' }]}
              >
                <Select
                  placeholder='Job Level'
                  allowClear
                  showSearch
                  optionFilterProp='label'
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={
                    form.getFieldValue('jobRoleId') && jobRoles
                      ? jobRoles
                          .find((j) => j.id === Number(form.getFieldValue('jobRoleId')))
                          ?.jobLevels?.map((j) => ({ value: j.id, label: j.level }))
                      : []
                  }
                />
              </Form.Item>
            </Col>
          </Row>

          <Typography.Title level={4}>Job Benefits</Typography.Title>
          <Form.Item<FieldType> name='jobBenefits' rules={[{ required: true, message: 'Please input job benefits!' }]}>
            <Select mode='tags' style={{ width: '100%' }} tokenSeparators={[',']} />
          </Form.Item>

          <Form.Item<FieldType> name='jobDescription'>
            <EditorComponent />
          </Form.Item>

          <Form.Item>
            <Button loading={loading} type='primary' htmlType='submit' size='large' className='px-10'>
              Post Job
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default PostJobPage
