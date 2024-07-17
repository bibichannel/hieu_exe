import React, { useState } from 'react'
import { FilterOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Divider, Drawer, Flex, Menu, Radio, Select, Slider, Space, Typography } from 'antd'
import type { MenuProps } from 'antd'
const OPTIONS = ['Apples', 'Nails', 'Bananas', 'Helicopters']
type MenuItem = Required<MenuProps>['items'][number]

const FilterButton: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o))

  const items: MenuItem[] = [
    {
      key: 'industry',
      label: 'Industry',
      type: 'group',
      children: [
        { key: 'industry1', label: 'All Category' },
        { key: 'industry2', label: 'Software Industry' }
      ]
    },
    {
      key: 'jobRole',
      label: 'JobRole',
      type: 'group',
      children: [
        { key: 'business1', label: 'Software Engineer' },
        { key: 'business2', label: 'Project Manager' }
      ]
    }
  ]

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }
  const onChange = (value: number | number[]) => {
    console.log('onChange: ', value)
  }

  const onChangeComplete = (value: number | number[]) => {
    console.log('onChangeComplete: ', value)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBorderSecondary: '#f0f0f0'
        }
      }}
    >
      <Button size='large' icon={<FilterOutlined />} onClick={showDrawer}>
        Filter
      </Button>
      <Drawer
        title={
          <Flex vertical gap={10}>
            <Typography.Text>Filters</Typography.Text>
            <Typography.Text>Active Filters</Typography.Text>
            <ConfigProvider
              theme={{
                token: {
                  colorBgContainerDisabled: '#ffffff'
                }
              }}
            >
              <Select
                variant='borderless'
                mode='multiple'
                className='disabled:!cursor-default'
                placeholder='Filter not active'
                suffixIcon={null}
                disabled={selectedItems.length <= 0}
                value={selectedItems}
                onChange={setSelectedItems}
                style={{ width: '100%' }}
                options={filteredOptions.map((item) => ({
                  value: item,
                  label: item
                }))}
              />
            </ConfigProvider>
          </Flex>
        }
        closable={false}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80
          }
        }}
      >
        <ConfigProvider
          theme={{
            token: {
              lineWidth: 0
            },
            components: {
              Menu: {
                groupTitleColor: '#4087D7'
              }
            }
          }}
        >
          <Menu
            className='custom-menu-title'
            onClick={onClick}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode='inline'
            items={items}
          />
        </ConfigProvider>
        <Divider />
        <Flex vertical gap={5}>
          <div className='p-[8px_16px] bg-[#e7f0fa] rounded-[8px]'>
            <Typography.Text className='text-[#4087D7]'>Job Type</Typography.Text>
          </div>
          <div className='p-[8px_16px]'>
            <Radio.Group>
              <Space direction='vertical'>
                <Radio value={1}>Full Time</Radio>
                <Radio value={2}>Part-Time</Radio>
                <Radio value={3}>Internship</Radio>
                <Radio value={4}>Remote</Radio>
                <Radio value={5}>Contract</Radio>
                <Radio value={6}>Freelance</Radio>
                <Radio value={7}>Temporary</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Flex>
        <Divider />
        <Flex vertical gap={5}>
          <div className='p-[8px_16px] bg-[#e7f0fa] rounded-[8px]'>
            <Typography.Text className='text-[#4087D7]'>Salary</Typography.Text>
          </div>
          <div className='p-[8px_16px]'>
            <Slider
              onChange={onChange}
              onChangeComplete={onChangeComplete}
              range={{ draggableTrack: true }}
              defaultValue={[20, 50]}
            />
          </div>
          <div className='p-[8px_16px]'>
            <Radio.Group>
              <Space direction='vertical'>
                <Radio value={1}>$10 - $100</Radio>
                <Radio value={2}>$100 - $10,000</Radio>
                <Radio value={3}>$1,000 - $10,000</Radio>
                <Radio value={4}>$10,000 - $100,000</Radio>
                <Radio value={5}>$100,000 up</Radio>
                <Radio value={6}>Custom</Radio>
              </Space>
            </Radio.Group>
          </div>
        </Flex>
        <Flex justify='flex-end'>
          <Button size='large' type='primary'>
            Apply Filter
          </Button>
        </Flex>
      </Drawer>
    </ConfigProvider>
  )
}

export default FilterButton
