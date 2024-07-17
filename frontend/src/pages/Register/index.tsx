import React from 'react'
import RegisterForm from '~/components/form/RegisterForm'
import DiagonalSplitLayout from '~/layouts/DiagonalSplitLayout'
const RegisterPage: React.FC = () => {
  return (
    <DiagonalSplitLayout>
      <RegisterForm />
    </DiagonalSplitLayout>
  )
}

export default RegisterPage
