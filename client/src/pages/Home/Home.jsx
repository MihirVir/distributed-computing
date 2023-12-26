import React, { Suspense, lazy} from 'react'
const Header = lazy(() => import("../../components/Header/Header"));
const Card = lazy(() => import("../../components/Card/Card"));
const Popular = lazy(() => import("../../components/Popular/Popular"));
const Explore = lazy(() => import("../../components/Explore/Explore"));
const SecondSearch = lazy(() => import("../../components/Search/SecondSearch"));

import "./home.css"
const Home = () => {
  return (
    <>
      <header className = "header">
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <SecondSearch />
        </Suspense>
      </header>     
      <main className = "main">
          <Suspense fallback={<div>Loading...</div>}>
            <Explore />
            <Card />
            <Popular />
          </Suspense>
      </main>
    </>
  )
}

export default Home