import React from 'react'
import LoginForm from '~/components/form/LoginForm'
import DiagonalSplitLayout from '~/layouts/DiagonalSplitLayout'

const LoginPage: React.FC = () => {
  return (
    <DiagonalSplitLayout>
      <LoginForm />
    </DiagonalSplitLayout>
  )
}

export default LoginPage
