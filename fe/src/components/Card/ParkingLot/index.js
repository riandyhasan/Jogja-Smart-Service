import { Box, Flex, Text } from '@chakra-ui/react';
import colours from '../../../../styles/colours';
import CustomIcon from '../../CustomIcon';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const LotCard = ({ item }) => {
  console.log('line 4 ITEM', item);
  const { title, capacity, used, type, place_id } = item;

  return (
    <Flex
      sx={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.2))' }}
      borderRadius={'8px'}
      w={'320px'}
      h={'70px'}
      bg={'#FFFFFF'}
      color={'black'}
      p={'8px 16px'}
      marginBottom={'10px'}
      flexDir={'column'}>
      <Text fontSize={'14px'} fontWeight={'medium'}>
        {title}
      </Text>
      {capacity > used ? (
        <Text fontSize={'10px'} color={colours.success}>
          Available for: {type}
        </Text>
      ) : (
        <Text fontSize={'10px'} color={colours.fail}>
          Full
        </Text>
      )}
      <Text fontSize={'10px'} color={colours.gray1}>
        {place_id}
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
