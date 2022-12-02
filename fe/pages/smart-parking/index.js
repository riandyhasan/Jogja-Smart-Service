import { Box, Text } from '@chakra-ui/react';
import { useState } from 'react';
import LotCard from '../../src/components/Card/ParkingLot';
import GreenHeader from '../../src/components/GreenHeader';

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

  return (
    <Box>
      <GreenHeader searchBar={true} setSearchValue={setSearchValue} />
      {searchValue != '' || (
        <Box p={'16px 40px'}>
          <Text fontSize={'14px'} fontWeight={'medium'} marginBottom={'24px'}>
            Result for "{searchValue}"
          </Text>
          <Box>
            {data.map((item, idx) => {
              return <LotCard item={item} key={idx} />;
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default SmartParking;
