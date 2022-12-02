import { Box, Flex, Text } from '@chakra-ui/react';
import DetailCard from '../../src/components/Card/DetailCard';
import GreenHeader from '../../src/components/GreenHeader';
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';
import DirectionsBusFilledIcon from '@mui/icons-material/DirectionsBusFilled';
import colours from '../../styles/colours';
import Image from 'next/image';
import CustomIcon from '../../src/components/CustomIcon';
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import { useEffect, useState } from 'react';
import { getPlaceById } from '../../src/services';
import { useRouter } from 'next/router';
import Head from 'next/head';

// const DATA = [{ title: 'Motorcycle' }, { title: 'Motorcycle' }, { title: 'Motorcycle' }];

const LotDetail = () => {
  const [lotDetail, setLotDetail] = useState();
  const [nearestLot, setNearestLot] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const getPlace = async (id) => {
    const data = await getPlaceById(id);
    setLotDetail(data.place);
    setNearestLot(data.nearest);
  };

  const handleOnClickDirection = (lat, long) => {
    router.push({
      pathname: '/smart-parking',
      query: { lat: lat, long: long },
    });
  };

  useEffect(() => {
    getPlace(id);
  }, []);

  return (
    <>
      <Head>
        <title>Jogja Smart Service | Location</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Box overflowY={'scroll'}>
        <GreenHeader searchBar={false} />
        <Box p={'8px 32px'}>
          <Flex
            w={'full'}
            h={'320px'}
            pos={'relative'}
            sx={{ filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.2))' }}
            marginBottom={'8px'}
            borderRadius={'8px'}
            bg={'white'}>
            <Box w={'100%'} h={'100%'} pos={'relative'} borderRadius={'8px'} overflow={'hidden'}>
              <Image src={`/image/${lotDetail?.image}`} alt={'Parking Lot Image'} layout={'fill'} objectFit={'cover'} />
            </Box>
          </Flex>
          {lotDetail?.parkings?.map((item, idx) => {
            return (
              <DetailCard
                available={item.capacity > item.used}
                icon={
                  item.type === 'Car' ? (
                    <TimeToLeaveIcon />
                  ) : item.type === 'Bus' ? (
                    <DirectionsBusFilledIcon />
                  ) : (
                    <TwoWheelerOutlinedIcon />
                  )
                }
                key={idx}
                title={item.type}>
                <Flex
                  justifyContent={'space-between'}
                  textAlign={'center'}
                  bg={'white'}
                  borderRadius={'8px 8px 8px 8px'}
                  fontSize={'12px'}
                  p={'4px 12px'}>
                  <Box>
                    <Text>Capacity</Text>
                    <Text>{item.capacity}</Text>
                  </Box>
                  <Box>
                    <Text>Available</Text>
                    <Text>{item.capacity - item.used}</Text>
                  </Box>
                  <Box>
                    <Text>Used</Text>
                    <Text>{item.used}</Text>
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
                  {lotDetail?.name}
                </Text>
              </Box>
              <Box marginBottom={'4px'}>
                <Text>Address</Text>
                <Text borderRadius={'4px'} border={`1px solid ${colours.custom3}`} p={'2px 4px'}>
                  {lotDetail?.address}
                </Text>
              </Box>
              {nearestLot.length > 0 && (
                <Box marginBottom={'4px'}>
                  <Text>Nearby Loaction</Text>
                  <Text borderRadius={'4px'} border={`1px solid ${colours.custom3}`} p={'2px 4px'}>
                    {/* Malioboro, Titik 0 KM, Taman Pintar */}
                    {nearestLot?.map((item, idx) => {
                      return `${item.name}${idx < nearestLot.length - 1 ? ', ' : ''}`;
                    })}
                  </Text>
                </Box>
              )}
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
          w={'full'}
          onClick={() => handleOnClickDirection(lotDetail?.latitude, lotDetail?.longitude)}>
          <CustomIcon iconComp={<NavigationOutlinedIcon sx={{ color: 'white' }} />} />
          <Text color={'white'}>Direction</Text>
        </Flex>
      </Box>
    </>
  );
};

export default LotDetail;
