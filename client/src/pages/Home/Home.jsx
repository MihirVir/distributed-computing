import React from 'react'
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import Card from '../../components/Card/Card'
import "./home.css"
import Popular from '../../components/Popular/Popular'

const Home = () => {
  return (
    <>
      <header className = "header">
          <Header />
          <Search />
      </header>     
      <main className = "main">
          <Card />
          <Popular />
      </main>
    </>
  )
}

export default Home