import { Box, Flex, Input, InputGroup, InputLeftElement, Text } from '@chakra-ui/react';
import colours from '../../../styles/colours';
import CustomIcon from '../CustomIcon';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import SearchIcon from '@mui/icons-material/Search';
import ShareIcon from '@mui/icons-material/Share';
import IosShareIcon from '@mui/icons-material/IosShare';
import { useRouter } from 'next/router';

const GreenHeader = ({ searchBar, setSearchValue }) => {
  const router = useRouter();

  return (
    <>
      <Box
        bg={colours.custom3}
        padding={`64px 20px ${searchBar ? '15px' : '8px'} 20px`}
        pos={'fixed'}
        w={'full'}
        zIndex={10}>
        {searchBar ? (
          <>
            <Flex marginBottom={'30px'} alignItems={'center'}>
              <CustomIcon
                iconComp={<KeyboardArrowLeftIcon sx={{ fontSize: 32, color: 'white' }} />}
                onClick={() => {
                  router.back();
                }}
              />
              <Text fontSize={'18px'} color={'white'} fontWeight={'medium'} marginLeft={'8px'}>
                Layanan Smart Parking
              </Text>
            </Flex>
            <Flex justifyContent={'center'}>
              <InputGroup w={'full'}>
                <InputLeftElement
                  pointerEvents='none'
                  children={<SearchIcon sx={{ fontSize: 24, color: colours.placeholder }} />}
                />
                <Input
                  type='text'
                  placeholder='Telusuri destinasi / parking lot disini..'
                  bg={'white'}
                  focusBorderColor={colours.custom4}
                  sx={{ filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.2))' }}
                  _placeholder={{ fontSize: '14px' }}
                  onChange={(e) => {
                    console.log('line 42 SEARCH VALUE', e.target.value);
                    setSearchValue(e.target.value);
                  }}
                />
              </InputGroup>
            </Flex>
          </>
        ) : (
          <>
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <CustomIcon
                iconComp={<KeyboardArrowLeftIcon sx={{ fontSize: 32, color: 'white' }} />}
                onClick={() => {
                  router.back();
                }}
              />
              <Text fontSize={'20px'} color={'white'} fontWeight={'medium'} marginBottom={'8px'}>
                Layanan Smart Parking
              </Text>
              <CustomIcon iconComp={<IosShareIcon sx={{ fontSize: 24, color: 'white' }} />} />
            </Flex>
          </>
        )}
      </Box>
      {searchBar ? <Box h={'180px'}></Box> : <Box h={'110px'}></Box>}
    </>
  );
};

export default GreenHeader;
