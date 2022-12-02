import { Flex } from '@chakra-ui/react';
import colours from '../../../styles/colours';

const CustomIcon = ({ iconComp, containerSize, onClick }) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      w={containerSize ?? '24px'}
      cursor={'pointer'}
      onClick={onClick}>
      {iconComp}
    </Flex>
  );
};

export default CustomIcon;
