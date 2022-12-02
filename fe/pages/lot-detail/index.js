import { Box, Flex, Input, Text } from '@chakra-ui/react';
import DetailCard from '../../src/components/Card/DetailCard';
import GreenHeader from '../../src/components/GreenHeader';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import colours from '../../styles/colours';
import Image from 'next/image';
import CustomIcon from '../../src/components/CustomIcon';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';

const DATA = [{ title: 'Motorcycle' }, { title: 'Motorcycle' }, { title: 'Motorcycle' }];

const LotDetail = () => {
  return (
    <Box overflowY={'scroll'}>
      <GreenHeader searchBar={false} />
      <Box p={'8px 32px'}>
        <Flex w={'full'} h={'320px'} pos={'relative'} marginBottom={'8px'}>
          <Image src={'/image/dummy-place.png'} alt={'Parking Lot Image'} layout={'fill'} />
        </Flex>
        {DATA.map((item, idx) => {
          return (
            <DetailCard icon={<TwoWheelerOutlinedIcon />} key={idx} title={item.title}>
              <Flex
                justifyContent={'space-between'}
                textAlign={'center'}
                bg={'white'}
                borderRadius={'8px 8px 8px 8px'}
                fontSize={'12px'}
                p={'4px 12px'}>
                <Box>
                  <Text>Capacity</Text>
                  <Text>100</Text>
                </Box>
                <Box>
                  <Text>Available</Text>
                  <Text>20</Text>
                </Box>
                <Box>
                  <Text>Used</Text>
                  <Text>80</Text>
                </Box>
              </Flex>
            </DetailCard>
          );
        })}
        <DetailCard title={'Detail Information'}>
          <Box p={'6px 16px'} fontSize={'12px'}>
            <Box marginBottom={'4px'}>
              <Text>Name</Text>
              <Text borderRadius={'4px'} border={`1px solid ${colours.custom3}`} p={'2px 4px'}>
                Abu Bakar Ali
              </Text>
            </Box>
            <Box marginBottom={'4px'}>
              <Text>Address</Text>
              <Text borderRadius={'4px'} border={`1px solid ${colours.custom3}`} p={'2px 4px'}>
                Jl. Abu Bakar Ali No.75, 001, Suryatmajan, Kec. Danurejan, Kota Yogyakarta, Daerah Istimewa Yogyakarta
                55213
              </Text>
            </Box>
            <Box marginBottom={'4px'}>
              <Text>Nearby Loaction</Text>
              <Text borderRadius={'4px'} border={`1px solid ${colours.custom3}`} p={'2px 4px'}>
                Malioboro, Titik 0 KM, Taman Pintar
              </Text>
            </Box>
          </Box>
        </DetailCard>
      </Box>
      <Box h={'60px'}></Box>
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        bg={colours.custom3}
        h={'60px'}
        pos={'fixed'}
        bottom={0}
        w={'full'}>
        <CustomIcon iconComp={<NavigationOutlinedIcon sx={{ color: 'white' }} />} />
        <Text color={'white'}>Direction</Text>
      </Flex>
    </Box>
  );
};

export default LotDetail;
