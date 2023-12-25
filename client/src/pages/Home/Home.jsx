import React from 'react'
import Header from '../../components/Header/Header'
import Search from '../../components/Search/Search'
import Card from '../../components/Card/Card'
import "./home.css"
import Popular from '../../components/Popular/Popular'
import Explore from '../../components/Explore/Explore'
import SecondSearch from '../../components/Search/SecondSearch'

const Home = () => {
  return (
    <>
      <header className = "header">
          <Header />
          {/* <Search /> */}
          <SecondSearch />
      </header>     
      <main className = "main">
          <Explore />
          <Card />
          <Popular />
      </main>
    </>
  )
}

export default Home