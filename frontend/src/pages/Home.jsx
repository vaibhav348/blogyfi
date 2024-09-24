import React from 'react'
import MainSection from '../components/MainSection'
 import { Link } from 'react-router-dom'
import Navber from '../components/Navber'
import BlogSection from '../components/BlogSection'
import Footer from '../components/Footer'
const Home = () => {
  return (
 <div>
  <Navber/>
  <MainSection/>
  <BlogSection/>
  <Footer/>
 </div>
  )
}

export default Home