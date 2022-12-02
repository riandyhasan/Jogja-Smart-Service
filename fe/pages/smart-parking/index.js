import { Flex, Box, Text, Tag } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LotCard from '../../src/components/Card/ParkingLot';
import GreenHeader from '../../src/components/GreenHeader';
import { search, getNearestByLatLong } from '../../src/services';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import colours from '../../styles/colours';
import Head from 'next/head';

// const data = [
//   {
//     id: 1,
//     title: 'Abu Bakar Ali',
//     place_id: 'Jl. Abu Bakar Ali No.75, 001, Suryatmajan, Kec. Danurejan',
//     type: 'Car, Bus',
//     capacity: 999,
//     used: 899,
//   },
//   {
//     id: 2,
//     title: 'Ngabean',
//     place_id: 'Jl. Abu Bakar Ali No.75, 001, Suryatmajan, Kec. Danurejan',
//     type: 'Motor, Car',
//     capacity: 499,
//     used: 199,
//   },
//   {
//     id: 3,
//     title: 'Malioboro',
//     place_id: 'Jl. Abu Bakar Ali No.75, 001, Suryatmajan, Kec. Danurejan',
//     type: 'Motor, Car, Bus',
//     capacity: 40,
//     used: 40,
//   },
// ];

const SmartParking = () => {
  const router = useRouter();
  const { lat, long } = router.query;

  const [searchValue, setSearchValue] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [mapPoint, setMapPoint] = useState({ lat: lat ?? -7.811850253309766, long: long ?? 110.36286696293398 });
  const [markerPoint, setMarkerPoint] = useState({ lat: lat ?? -7.811850253309766, long: long ?? 110.36286696293398 });
  const [latLongRes, setLatLongRes] = useState([]);

  const searchData = async () => {
    const data = await search(searchValue);
    setSearchRes(data);
  };

  const latLongData = async () => {
    const data = await getNearestByLatLong(markerPoint.lat, markerPoint.long);
    setLatLongRes(data);
  };

  const handleOnDrag = (e) => {
    setMapPoint({ lat: e.lngLat.lat, long: e.lngLat.lng });
    setMarkerPoint({ lat: e.lngLat.lat, long: e.lngLat.lng });
    latLongData();
  };

  const handleMapOnDrag = (e) => {
    setMapPoint({ lat: e.viewState.latitude, long: e.viewState.longitude });
  };

  useEffect(() => {
    if (searchValue.length >= 3) {
      searchData();
    } else {
      setSearchRes([]);
    }
  }, [searchValue]);

  useEffect(() => {
    latLongData();
  }, [markerPoint]);

  const handleRedirect = (id) => {
    router.push(`/lot-detail/${id}`);
  };

  return (
    <>
      <Head>
        <title>Jogja Smart Service | Location</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      <Box>
        <GreenHeader searchBar={true} setSearchValue={setSearchValue} searchValue={searchValue} />
        {searchValue != '' ? (
          <Box p={'16px 40px'}>
            <Text fontSize={'14px'} fontWeight={'medium'} marginBottom={'24px'}>
              Result for "{searchValue}"
            </Text>
            {searchRes && (
              <Box>
                {searchRes.map((item, idx) => {
                  return (
                    <LotCard
                      item={item}
                      key={idx}
                      onClick={() => {
                        handleRedirect(item.id);
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </Box>
        ) : (
          <Flex flexDir={'column'} p={'16px 40px'} height={'100%'}>
            <Box pos={'sticky'} top={'0'}>
              {latLongRes.length > 0 && (
                <Flex flexDir={'column'} marginBottom={'24px'}>
                  <Text fontSize={'14px'} fontWeight={'medium'}>
                    Search Recommendation
                  </Text>
                  <Box>
                    {latLongRes.map((item, idx) => {
                      return (
                        idx < 3 && (
                          <Tag
                            m={'4px 3px'}
                            bg={colours.custom3}
                            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
                            size={'md'}
                            borderRadius={'full'}
                            color={'white'}
                            fontWeight={'medium'}
                            fontSize={'13px'}
                            key={idx}
                            onClick={() => setSearchValue(item.name)}>
                            {item.name}
                          </Tag>
                        )
                      );
                    })}
                  </Box>
                </Flex>
              )}
              <Map
                initialViewState={{
                  longitude: mapPoint.long,
                  latitude: mapPoint.lat,
                  zoom: 16,
                }}
                style={{ width: '80vw', height: '80vw', borderRadius: '12px', zIndex: 20 }}
                mapStyle='mapbox://styles/mapbox/streets-v9'
                mapboxAccessToken={
                  'pk.eyJ1IjoidGhvcmlxenMiLCJhIjoiY2xiNmtwNmkyMDB5MjNwcnNxNjFxc3g1ciJ9.PNaL13XceIrgtBzdsAJvNg'
                }
                latitude={mapPoint.lat}
                longitude={mapPoint.long}
                onDrag={handleMapOnDrag}
                // onDragEnd={handleMapOnDragEnd}
              >
                <Marker
                  latitude={markerPoint.lat}
                  longitude={markerPoint.long}
                  anchor={'center'}
                  pitchAlignment={'map'}
                  draggable={true}
                  scale={3}
                  onDragEnd={handleOnDrag}>
                  <Flex
                    w={8}
                    h={8}
                    justifyContent={'center'}
                    alignItems={'center'}
                    bg={'rgba(67, 115, 226, 0.25)'}
                    borderRadius={'100%'}
                    zIndex={0}>
                    <Box w={4} h={4} bg={colours.custom6} border={'1px solid white'} borderRadius={'100%'}></Box>
                  </Flex>
                </Marker>
              </Map>
            </Box>
            {latLongRes.length > 0 && (
              <Box
                marginTop={'22px'}
                maxH={'23vh'}
                overflowY={'scroll'}
                sx={{
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}>
                {latLongRes.map((item, idx) => {
                  return (
                    <LotCard
                      item={item}
                      key={idx}
                      onClick={() => {
                        handleRedirect(item.id);
                      }}
                    />
                  );
                })}
              </Box>
            )}
          </Flex>
        )}
      </Box>
    </>
  );
};

export default SmartParking;
