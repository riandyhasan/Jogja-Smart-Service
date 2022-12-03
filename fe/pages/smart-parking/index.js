import { Flex, Box, Text, Tag } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import LotCard from '../../src/components/Card/ParkingLot';
import GreenHeader from '../../src/components/GreenHeader';
import { search, getNearestByLatLong, getRecommendationByLatLong } from '../../src/services';
import Map, { Marker, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import colours from '../../styles/colours';
import Head from 'next/head';
import Pin from '../../public/icon/pin';
import Lot from '../../public/icon/lot';
import Walk from '../../public/icon/walk';

const SmartParking = () => {
  const router = useRouter();
  const { lat, long } = router.query;

  const [searchValue, setSearchValue] = useState('');
  const [searchRes, setSearchRes] = useState([]);
  const [mapPoint, setMapPoint] = useState({ lat: lat ?? -7.811850253309766, long: long ?? 110.36286696293398 });
  const [markerPoint, setMarkerPoint] = useState({ lat: lat ?? -7.811850253309766, long: long ?? 110.36286696293398 });
  const [latLongRes, setLatLongRes] = useState([]);
  const [recommendRes, setRecommendRes] = useState([]);
  const [popupInfo, setPopupInfo] = useState(null);
  const [, Render] = useState();

  const searchData = async () => {
    const data = await search(searchValue);
    setSearchRes(data);
  };

  const latLongData = async () => {
    const data = await getNearestByLatLong(markerPoint.lat, markerPoint.long);
    console.log('line 57 NEAREST', data);
    setLatLongRes(data);
  };

  const recommendData = async () => {
    const data = await getRecommendationByLatLong(markerPoint.lat, markerPoint.long);
    console.log('line 63 RECOMMENDATION', data);
    setRecommendRes(data);
  };

  const handleOnDrag = (e) => {
    setMapPoint({ lat: e.lngLat.lat, long: e.lngLat.lng });
    setMarkerPoint({ lat: e.lngLat.lat, long: e.lngLat.lng });
    latLongData();
    recommendData();
  };

  const handleMapOnDrag = (e) => {
    setMapPoint({ lat: e.viewState.latitude, long: e.viewState.longitude });
  };

  const handleRedirect = (id) => {
    router.push(`/lot-detail/${id}`);
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
    recommendData();
  }, [markerPoint]);

  const forceUpdate = useCallback(() => updateState({}), []);

  // useEffect(() => {
  //   let timer = setTimeout(() => setRender(true), 2000);
  //   console.log('TIMER 2 DETIK');
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [render]);

  console.log('rendering...');

  const pins = useMemo(
    () =>
      latLongRes.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor='bottom'
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}>
          <Lot />
        </Marker>
      )),
    []
  );

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
              {recommendRes.length > 0 && (
                <Flex flexDir={'column'} marginBottom={'24px'}>
                  <Text fontSize={'14px'} fontWeight={'medium'}>
                    Search Recommendation
                  </Text>
                  <Box>
                    {recommendRes.map((item, idx) => {
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
                {latLongRes ? pins : forceUpdate()}

                <Marker
                  latitude={markerPoint.lat}
                  longitude={markerPoint.long}
                  anchor={'center'}
                  pitchAlignment={'map'}
                  draggable={true}
                  scale={3}
                  onDragEnd={handleOnDrag}>
                  <Walk />
                </Marker>

                {popupInfo && (
                  <Popup
                    style={{ maxWidth: '120px', fontSize: '14px', fontFamily: 'poppins', fontWeight: 'medium' }}
                    anchor='top'
                    longitude={Number(popupInfo.longitude)}
                    latitude={Number(popupInfo.latitude)}
                    onClose={() => setPopupInfo(null)}>
                    <img width='100%' src={`/image/${popupInfo.image}`} style={{ borderRadius: '6px' }} />
                    <div
                      onClick={() => {
                        handleRedirect(popupInfo.id);
                      }}>
                      {popupInfo.name}
                    </div>
                  </Popup>
                )}
              </Map>
            </Box>
            {latLongRes.length > 0 && (
              <Box
                marginTop={'22px'}
                maxH={'23vh'}
                // overflowY={'scroll'}
                overflow={'visible'}
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
