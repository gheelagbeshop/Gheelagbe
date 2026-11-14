import React from 'react'
import { Outlet } from 'react-router'
import Footer from './layout/Footer'
import Header from './layout/Header'

const Root = () => {
  return (
    <main>
        <Header />
        <Outlet />
        <Footer />
    </main>
  )
}

export default Root