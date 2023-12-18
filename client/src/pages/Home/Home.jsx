import React from 'react'
import Header from '../../components/Header/Header'
import "./home.css"
import Search from '../../components/Search/Search'

const Home = () => {
  return (
    <>
      <header className = "header">
          <Header />
          <Search />
      </header>     
    </>
  )
}

export default Home