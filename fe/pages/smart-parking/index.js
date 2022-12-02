import { Box, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import LotCard from '../../src/components/Card/ParkingLot';
import GreenHeader from '../../src/components/GreenHeader';
import { search } from '../../src/services';
import Map from 'react-map-gl';
import colours from '../../styles/colours';

const data = [
  {
    id: 1,
    title: 'Abu Bakar Ali',
    place_id: 'Jl. Abu Bakar Ali No.75, 001, Suryatmajan, Kec. Danurejan',
    type: 'Car, Bus',
    capacity: 999,
    used: 899,
  },
  {
    id: 2,
    title: 'Ngabean',
    place_id: 'Jl. Abu Bakar Ali No.75, 001, Suryatmajan, Kec. Danurejan',
    type: 'Motor, Car',
    capacity: 499,
    used: 199,
  },
  {
    id: 3,
    title: 'Malioboro',
    place_id: 'Jl. Abu Bakar Ali No.75, 001, Suryatmajan, Kec. Danurejan',
    type: 'Motor, Car, Bus',
    capacity: 40,
    used: 40,
  },
];

const SmartParking = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchRes, setSearchRes] = useState([]);

  const router = useRouter();

  const searchData = async () => {
    const data = await search(searchValue);
    setSearchRes(data);
    console.log(data);
  };

  useEffect(() => {
    if (searchValue.length >= 3) {
      searchData();
    } else {
      setSearchRes([]);
    }
  }, [searchValue]);

  const handleRedirect = (id) => {
    router.push(`/lot-detail/${id}`);
  };

  return (
    <Box>
      <GreenHeader searchBar={true} setSearchValue={setSearchValue} />
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
        <Box bg={colours.custom2} p={'16px 40px'}>
          <Map
            initialViewState={{
              longitude: 110.36475035239266,
              latitude: -7.811304219087218,
              zoom: 14,
            }}
            style={{ width: '80vw', height: '80vw', borderRadius: '12px' }}
            mapStyle='mapbox://styles/mapbox/streets-v9'
            mapboxAccessToken={
              'pk.eyJ1IjoidGhvcmlxenMiLCJhIjoiY2xiNmtwNmkyMDB5MjNwcnNxNjFxc3g1ciJ9.PNaL13XceIrgtBzdsAJvNg'
            }
          />
        </Box>
      )}
    </Box>
  );
};

export default SmartParking;
