import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { Fallback, RootErrorBoundary, Project, ProjectErrorBoundary, projectLoader } from './routes'
import {
  FindJobPage,
  ForgetPasswordPage,
  HomePage,
  JobDetailPage,
  LoginPage,
  PostJobPage,
  ProfilePage,
  RegisterPage,
  ResetPasswordPage,
  VerifyPage
} from './pages'
import CommonLayout from './layouts/CommonLayout'
import AccountLayout from './layouts/AccountLayout'
import MyJobPage from './pages/Account/Employer/MyJob'
import ApplyPage from './pages/Account/Candidate/Applications'
import FavoritePage from './pages/Account/Candidate/Favorites'
import PackagesPage from './pages/Packages'
import DashboardPage from './pages/Account/Admin/Dashboard'
import OrderPage from './pages/Account/Admin/Order'

const router = createBrowserRouter([
  {
    path: '',
    errorElement: <RootErrorBoundary />,
    children: [
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/forgetpassword',
        element: <ForgetPasswordPage />
      },
      {
        path: '/verify',
        element: <VerifyPage />
      },
      {
        path: '/resetpassword',
        element: <ResetPasswordPage />
      },
      {
        path: '/',
        element: <CommonLayout />,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: 'findjob',

            element: <FindJobPage />
          },
          {
            path: 'job/:id',

            element: <JobDetailPage />
          },
          {
            path: 'packages',

            element: <PackagesPage />
          },
          {
            path: 'account',

            element: <AccountLayout />,
            children: [
              {
                path: 'profile',
                element: <ProfilePage />
              },
              {
                path: 'employer/postjob',
                element: <PostJobPage />
              },
              {
                path: 'employer/myjob',
                element: <MyJobPage />
              },
              {
                path: 'candidate/applyjob',
                element: <ApplyPage />
              },
              {
                path: 'candidate/favoritejob',
                element: <FavoritePage />
              },
              {
                path: 'admin/dashboard',
                element: <DashboardPage />
              },
              {
                path: 'admin/orders',
                element: <OrderPage />
              }
            ]
          },
          {
            path: '',
            element: <Outlet />,

            children: [
              {
                path: 'projects/:projectId',
                element: <Project />,
                errorElement: <ProjectErrorBoundary />,
                loader: projectLoader
              }
            ]
          }
        ]
      }
    ]
  }
])

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose())
}

export default function App() {
  return <RouterProvider router={router} fallbackElement={<Fallback />} />
}
