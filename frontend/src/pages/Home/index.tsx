import { Flex, Input, Typography, Card, List, Tag } from 'antd'

import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import api from '~/api'
import { SearchJobsSortByEnum, SearchJobsSortOrderEnum } from '~/api/v1'
import JobCard from '~/components/JobCard'
import useFetch from '~/hooks/useFetch'
const { Title } = Typography

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
const HomePage: React.FC = () => {
  const [responseIndustries, loadingIndustries] = useFetch(() => api.getPopularCategoriesWithJobCount())
  const [responseJobHighSalary, loadingJobHighSalary] = useFetch(() =>
    searchJobs(0, 100, SearchJobsSortByEnum.Salary, SearchJobsSortOrderEnum.Desc)
  )
  const navigate = useNavigate()
  const dataJobHighSalary = responseJobHighSalary ? responseJobHighSalary.content : []

  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='grid max-w-screen-xl grid-cols-12 px-4 pt-14 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:grid-cols-12'>
        <div className='col-span-12 place-self-center lg:col-span-7'>
          <h1 className='max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white'>
            Find a job that suits <br />
            your interest & skills
          </h1>
          <p className='max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <div className='space-y-4 sm:flex sm:space-y-0 sm:space-x-4'>
            <Input.Search size='large' />
          </div>
        </div>
        <div className='col-span-12 place-self-center flex lg:mt-0 lg:col-span-5 lg:flex'>
          <img src='/banner.png' alt='hero image' />
        </div>
      </div>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Title level={2}>Most Popular Vacancies</Title>
      </div>
      <div className='py-5 px-10 md:py-10 md:px-20 bg-[#F1F2F4]'>
        <Title level={2} className='text-center'>
          How JobSeeker work
        </Title>
        <Flex align='center' justify='center'>
          <img src='/banner2.png' alt='h' />
        </Flex>
      </div>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Title level={2}>Danh mục phổ biến</Title>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 3,
            xl: 3,
            xxl: 3
          }}
          pagination={false}
          loading={loadingIndustries}
          dataSource={responseIndustries ? responseIndustries : []}
          renderItem={(item) => (
            <List.Item>
              <Card
                onClick={() =>
                  navigate({
                    pathname: '/findjob',
                    search: createSearchParams({
                      industry: item.name!
                    }).toString()
                  })
                }
                hoverable
                styles={{ body: { padding: 0, overflow: 'hidden' } }}
              >
                <Flex align='flex-start' justify='space-between' className='p-5 ' gap={8}>
                  <Flex vertical className='flex-1 overflow-hidden'>
                    <Typography.Text strong className='truncate'>
                      {item.name}
                    </Typography.Text>
                    <Typography.Text>{item.jobCount} jobs</Typography.Text>
                  </Flex>
                  <Flex vertical justify='space-between'>
                    <Tag color='#f50'>
                      <svg
                        className='inline'
                        width='14'
                        height='14'
                        viewBox='0 0 14 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          d='M6.06668 0.93335C5.94291 0.93335 5.82421 0.982516 5.73669 1.07003C5.64918 1.15755 5.60001 1.27625 5.60001 1.40002C5.60001 3.75995 2.33334 5.60002 2.33334 8.86668C2.33334 11.3483 5.02297 12.9528 5.97006 13.0567C6.00183 13.0634 6.03421 13.0667 6.06668 13.0667C6.19044 13.0667 6.30914 13.0175 6.39666 12.93C6.48418 12.8425 6.53334 12.7238 6.53334 12.6C6.53331 12.5307 6.51783 12.4622 6.48803 12.3997C6.45823 12.3371 6.41487 12.2819 6.36108 12.2382V12.2373C5.93641 11.8929 5.13334 10.8937 5.13334 9.9814C5.13334 8.48386 6.53334 7.93335 6.53334 7.93335C5.73488 10.192 8.35121 10.4649 8.87761 12.7012H8.87853C8.90152 12.8047 8.9591 12.8973 9.04177 12.9638C9.12444 13.0302 9.22728 13.0665 9.33334 13.0667C9.43162 13.0664 9.52731 13.0352 9.60678 12.9774C9.6152 12.9713 9.6234 12.9649 9.63139 12.9582C9.70734 12.9089 11.6667 11.613 11.6667 8.86668C11.6667 7.74546 11.1059 5.81958 10.7024 4.96655L10.7014 4.96382L10.7005 4.962C10.6662 4.87494 10.6064 4.80023 10.5291 4.74757C10.4517 4.69491 10.3603 4.66673 10.2667 4.66668C10.1577 4.66679 10.0522 4.70503 9.96843 4.77479C9.88469 4.84454 9.82801 4.94141 9.80821 5.04858V5.05041C9.80707 5.05551 9.59273 6.00743 8.86668 6.53335C8.86668 4.33459 7.27925 2.06344 6.4422 1.12384C6.42964 1.10683 6.41593 1.09069 6.40118 1.07554C6.35777 1.03067 6.3058 0.994962 6.24834 0.970538C6.19088 0.946115 6.12911 0.933469 6.06668 0.93335Z'
                          fill='#DC362E'
                        ></path>
                      </svg>
                      Hot
                    </Tag>
                  </Flex>
                </Flex>
              </Card>
            </List.Item>
          )}
        />
      </div>
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Title level={2}>Việc làm đang Hot</Title>
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
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 12
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
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Title level={2}>Việc làm Part Time</Title>
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
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 12
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
      <div className='py-5 px-10 md:py-10 md:px-20'>
        <Title level={2}>Việc làm lương cao</Title>
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
            onChange: (page) => {
              console.log(page)
            },
            pageSize: 12
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
    </section>
  )
}

export default HomePage
