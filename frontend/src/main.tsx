import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { ConfigProvider, App as AntApp } from 'antd'
import './index.css'
import viLocale from 'antd/locale/vi_VN'
import dayjs from 'dayjs'

dayjs.locale('vi')
ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ConfigProvider
    locale={viLocale}
    theme={{
      token: {
        colorPrimary: '#E291C8',
        colorPrimaryActive: '#E291C8',
        colorPrimaryHover: '#E291C8'
      }
      // components: {
      //   Button: {},
      //   Input: {}
      // }
    }}
  >
    <AntApp>
      <App />
    </AntApp>
  </ConfigProvider>
  // </React.StrictMode>
)
