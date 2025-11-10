import React from 'react'
import Sparkles from '../Components/Sparkles'
import About from '../Components/About'
import Tracks from '../Components/Tracks'
import GallerySection from '../Components/GallerySection'
import FaqSection from '../Components/FaqSection'
import Login from '../Components/Login'
import MagicBento from '../Components/MagicBento'
import OurSponsors from '../Components/OurSponcers'
import TrackSwitch from '../Components/TrackSwitch'
import Partners from '../Components/Partners'
import OnlineTheme from '../Components/Online/OnlineTheme'

const Home = () => {
  return (
    <div>
      
      <Sparkles/>
      <About/>
      <OnlineTheme/>
      <TrackSwitch defaultTrack="online"/>
      {/* <Tracks/> */}
      <GallerySection/>
      <MagicBento/>
      <Partners/>
      {/* <OurSponsors/> */}
      {/* <MagicBento/> */}
      <FaqSection/>
    </div>
  )
}

export default Home
