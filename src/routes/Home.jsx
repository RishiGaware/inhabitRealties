import { Box, Stack } from "@chakra-ui/react";
import Banner from '../components/Banner'
import Search from '../components/Search/Search'
import HouseList from '../components/Houses/HouseList';
import PropertyAnimations from '../components/Animations/ImageSlider';
import ImageSlider from '../components/Animations/ImageSlider';
import GetStarted from '../components/GetStarted';
import AboutUs from '../pages/common/AboutUs';
import Features from '../pages/common/Features';

const Home = () => {
  return (
    <Box>
      <Stack spacing={{ base: 8, md: 16 }}>
        <Banner />
        <GetStarted />
        <PropertyAnimations />
        <Search />
        <HouseList />
        <ImageSlider />

        <Features />
        <AboutUs />
      </Stack>
    </Box>
  )
}

export default Home;