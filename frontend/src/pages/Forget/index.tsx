import React from 'react'
import ForgetPasswordForm from '~/components/form/ForgetPasswordForm'
import DiagonalSplitLayout from '~/layouts/DiagonalSplitLayout'

const ForgetPasswordPage: React.FC = () => {
  return (
    <DiagonalSplitLayout>
      <ForgetPasswordForm />
    </DiagonalSplitLayout>
  )
}

export default ForgetPasswordPage
