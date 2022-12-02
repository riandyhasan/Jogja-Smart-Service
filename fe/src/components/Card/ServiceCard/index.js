import { Box, color, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import colours from '../../../../styles/colours';

const ServiceCard = ({ title, src, onClick }) => {
  return (
    <Flex
      sx={{ filter: 'drop-shadow(0px 0px 8px rgba(0, 0, 0, 0.2))' }}
      w={143}
      h={193}
      bg={'#FFFFFF'}
      borderRadius={20}
      flexDir={'column'}
      alignItems={'center'}
      padding={'30px 12px 0px 12px'}
      cursor={'pointer'}
      onClick={onClick}>
      <Flex h={'64px'} w={'64px'} pos={'relative'} marginBottom={'24px'}>
        <Image src={src} alt={'Smart Parking Logo'} layout={'fill'} />
      </Flex>
      <Text fontWeight={'medium'} fontSize={'18px'} textAlign={'center'}>
        {title}
      </Text>
    </Flex>
  );
};

export default ServiceCard;
