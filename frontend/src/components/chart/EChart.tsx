/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from 'react-apexcharts'
import { Row, Col, Typography } from 'antd'
import eChart from './configs/eChart'

const EChart: React.FC<{ data?: any; settings?: any }> = ({ data, settings }) => {
  return (
    <>
      <div id='chart'>
        <ReactApexChart
          className='bar-chart'
          options={settings ? settings : eChart.options}
          series={data ? data : eChart.series}
          type='bar'
          height={220}
        />
      </div>
    </>
  )
}

export default EChart
