import React from 'react'
import Layout from '../../components/Layout'
import UserRoute from '../../components/routes/userRoute'

const dashboard = () => {
  return (
    <Layout>
      <UserRoute>
        <h1>This is Dashboard</h1>
      </UserRoute>
    </Layout>
  )
}

export default dashboard