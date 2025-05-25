import { Flex, Heading, Button, HStack, chakra, ButtonGroup, useBreakpointValue, Divider } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import NavMobile from './NavMobile';
import LightThemeColors from '../../assets/Colors';

const Header = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true })
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'About Us', path: '/about' },
  ];

  return (
    <chakra.header id="header" borderBottom='1px solid rgb(0,0,0,0.3)'>
      <Flex w='100%' py='5' px={{ base: '4', md: '8', lg: '16' }} align='center' justify='space-between'>
        <Link to='/'>
          <Heading fontSize='3xl' color='brand.primary'>INHABIT REALTIES</Heading>
        </Link>
        {
          isDesktop ? (
          <>
          
           
            <HStack spacing={4}>
              <Link to="/contact">
                <Button
                  size='sm'
                  variant='outline'
                  borderColor='brand.primary'
                  color='brand.primary'
                  _hover={{ bg: 'brand.primary', color: 'white' }}
                >
                  Contact Us
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size='sm'
                  variant='outline'
                  borderColor='brand.success'
                  color='brand.primary'
                  _hover={{ bg: 'brand.primary', color: 'white' }}
                >
                  Sign up
                </Button>
              </Link>
            </HStack>
          </>
          ) : (
            <NavMobile />
          )
        }
      </Flex>
      {/* <Divider color='pink.800' w={}='20px' />  */}
    </chakra.header>
  )
}

export default Header