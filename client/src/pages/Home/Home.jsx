import React, { Suspense, lazy, useEffect, useState} from 'react'
import axios from 'axios';
const Header = lazy(() => import("../../components/Header/Header"));
const Card = lazy(() => import("../../components/Card/Card"));
const Popular = lazy(() => import("../../components/Popular/Popular"));
const Explore = lazy(() => import("../../components/Explore/Explore"));
const SecondSearch = lazy(() => import("../../components/Search/SecondSearch"));
import { useDispatch, useSelector } from 'react-redux';
import "./home.css"
import { setData } from '../../state/user/user_slice';

const Home = () => {
  const [user, setUser] = useState(false);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost/api/v1/user/current-user")

      dispatch(setData(res.data));
      setUser(true);
    }catch(err) {
      console.log(err);
    }
  }  
  useEffect(() => {
    fetchUser();
  }, [])
  return (
    <>
      <header className = "header">
        <Suspense fallback={<div>Loading...</div>}>
          <Header user={user}/>
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