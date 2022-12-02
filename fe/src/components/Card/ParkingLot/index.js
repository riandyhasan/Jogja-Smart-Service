import { Box, Flex, Text } from '@chakra-ui/react';
import colours from '../../../../styles/colours';
import CustomIcon from '../../CustomIcon';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const LotCard = ({ item, onClick }) => {
  const { name, parkings, address } = item;

  const types = (parkings) => {
    let available = 0;
    parkings?.map((item) => {
      if (item.capacity > item.used) available++;
    });

    return available > 0;
  };

  return (
    <Flex
      sx={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))' }}
      borderRadius={'8px'}
      w={'full'}
      h={'70px'}
      bg={'#FFFFFF'}
      color={'black'}
      p={'8px 16px'}
      marginBottom={'10px'}
      flexDir={'column'}
      cursor={'pointer'}
      onClick={onClick}>
      <Text fontSize={'14px'} fontWeight={'medium'}>
        {name}
      </Text>
      {types(parkings) ? (
        <Text fontSize={'10px'} color={colours.success}>
          Available for:{' '}
          {parkings.map((item, idx) => {
            if (item.capacity > item.used) return `${item.type}${idx < parkings.length - 1 ? ', ' : ''}`;
          })}
        </Text>
      ) : (
        <Text fontSize={'10px'} color={colours.fail}>
          Full
        </Text>
      )}
      <Text fontSize={'10px'} color={colours.gray1} noOfLines={1}>
        {address}
      </Text>
      <CustomIcon
        iconComp={<InfoOutlinedIcon sx={{ fontSize: 20, color: colours.gray1 }} />}
        contPos={'absolute'}
        coord={{ top: '13px', right: '16px', bot: '', left: '' }}
      />
    </Flex>
  );
};

export default LotCard;
