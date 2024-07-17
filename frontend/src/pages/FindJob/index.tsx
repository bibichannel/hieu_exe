import { SearchOutlined } from '@ant-design/icons'
import { Button, Card, ConfigProvider, Divider, Flex, Input, List, Space, Typography } from 'antd'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '~/api'
import FilterButton from '~/components/FilterButton'
import JobCard from '~/components/JobCard'
import useFetch from '~/hooks/useFetch'

const { Title } = Typography

const searchJobs = (page: number, size: number, industry?: string, title?: string) => {
  return api.searchJobs(
    title,
    undefined,
    undefined,
    undefined,
    undefined,
    industry,
    undefined,
    page,
    size,
    undefined,
    undefined
  )
}
const FindJobPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [responseJobs, loadingJobs] = useFetch(
    () =>
      searchJobs(
        0,
        100,
        searchParams.get('industry') ? searchParams.get('industry')! : undefined,
        searchParams.get('title') ? searchParams.get('title')! : undefined
      ),
    searchParams.get('industry'),
    searchParams.get('title')
  )
  const dataJobs = responseJobs ? responseJobs.content : []

  const [queryTitle, setQueryTitle] = useState('')
  const handleFindJob = () => {
    console.log('find job')
    console.log(queryTitle)
    const queryParams = new URLSearchParams()
    if (queryTitle) {
      queryParams.set('title', queryTitle)
    }
    if (searchParams.get('industry')) {
      queryParams.set('industry', searchParams.get('industry')!)
    }

    setSearchParams(queryParams.toString())
  }
  return (
    <div className='bg-[#FFFFFF] h-full w-full'>
      <div className='py-5 px-10 md:py-10 md:px-20 bg-[#E9E9E9]'>
        <Title level={2}>Find Job</Title>
      </div>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <ConfigProvider
          theme={{
            token: {
              colorBorderSecondary: '#663695'
            }
          }}
        >
          <Card
            bordered
            hoverable
            className='bg-[#FFFFFF] p-2 rounded-lg drop-shadow-lg'
            styles={{ body: { padding: 0 } }}
          >
            <Flex align='center'>
              <Input
                value={queryTitle}
                onChange={(e) => setQueryTitle(e.target.value)}
                addonBefore={<SearchOutlined />}
                size='large'
                placeholder='Search by: Job tittle'
                variant='borderless'
              />
              <Divider type='vertical' className='h-12' />
              <Input
                addonBefore={
                  <svg
                    className='inline'
                    width='20'
                    height='20'
                    viewBox='0 0 25 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M12.5 21C16 17.4 19.5 14.1764 19.5 10.2C19.5 6.22355 16.366 3 12.5 3C8.63401 3 5.5 6.22355 5.5 10.2C5.5 14.1764 9 17.4 12.5 21Z'
                      stroke='#171618'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M12.5 13C14.1569 13 15.5 11.6569 15.5 10C15.5 8.34315 14.1569 7 12.5 7C10.8431 7 9.5 8.34315 9.5 10C9.5 11.6569 10.8431 13 12.5 13Z'
                      stroke='#171618'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                }
                size='large'
                placeholder=' City, state or zip code'
                variant='borderless'
              />
              <Space>
                <FilterButton />
                <Button size='large' type='primary' onClick={handleFindJob}>
                  Find Job
                </Button>
              </Space>
            </Flex>
          </Card>
        </ConfigProvider>
      </div>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4
          }}
          pagination={{
            align: 'center',
            position: 'bottom',
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 12
          }}
          loading={loadingJobs}
          dataSource={dataJobs}
          renderItem={(item) => <List.Item>{<JobCard job={item} isHot={false} />}</List.Item>}
        />
      </div>
    </div>
  )
}

export default FindJobPage
