import { Flex } from '@chakra-ui/react';
import colours from '../../../styles/colours';

const CustomIcon = ({ iconComp, contSize, onClick, contPos, coord }) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      w={contSize ?? '24px'}
      cursor={'pointer'}
      onClick={onClick}
      position={contPos ?? ''}
      top={coord?.top ?? ''}
      right={coord?.right ?? ''}
      bottom={coord?.bot ?? ''}
      left={coord?.left ?? ''}>
      {iconComp}
    </Flex>
  );
};

export default CustomIcon;
