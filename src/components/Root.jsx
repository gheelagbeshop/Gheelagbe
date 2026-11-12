import React from 'react'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Header from './Header'

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