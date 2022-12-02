import { Box, Flex, Text } from '@chakra-ui/react';
import colours from '../../../../styles/colours';
import CustomIcon from '../../CustomIcon';

const DetailCard = ({ icon, children, title, available }) => {
  return (
    <Box
      sx={{ filter: 'drop-shadow(0px 4px 2px rgba(0, 0, 0, 0.2))' }}
      bg={'white'}
      borderRadius={'8px 8px 8px 8px'}
      marginBottom={'20px'}>
      <Flex
        bg={colours.custom3}
        justifyContent={'space-between'}
        borderRadius={'8px 8px 0px 0px'}
        color={'white'}
        p={'4px 12px'}>
        <Flex>
          {icon && <CustomIcon iconComp={icon} />}
          <Text fontWeight={'medium'} marginLeft={'8px'}>
            {title}
          </Text>
        </Flex>
        {available && (
          <Text fontSize={'12px'} lineHeight={'24px'}>
            {available ? 'Available' : 'Full'}
          </Text>
        )}
      </Flex>
      {children}
    </Box>
  );
};

export default DetailCard;
