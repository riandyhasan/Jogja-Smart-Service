import { Flex, Heading, Text } from '@chakra-ui/react';
import ServiceCard from '../../src/components/ServiceCard';
import colours from '../../styles/colours';

const data = [
  { title: 'Smart Parking', src: '/image/smart-parking.png' },
  { title: 'Accident Detector', src: '/image/accident-detector.png' },
  { title: 'Public Transport', src: '/image/public-transport.png' },
  { title: 'Natural Disaster', src: '/image/natural-disaster.png' },
  { title: 'Air Quality', src: '/image/air-quality.png' },
];

const Home = () => {
  return (
    <Flex width={'full'} flexDir={'column'} alignItems={'center'}>
      <Text
        marginTop={'60px'}
        textAlign={'center'}
        width={295}
        fontSize={24}
        fontWeight={'bold'}
        color={colours.custom3}>
        Pilihan Layanan IoT yang Tersedia
      </Text>
      <Text marginTop={'32px'} marginBottom={'14px'} fontSize={14}>
        Silakan pilih layanan yang anda butuhkan
      </Text>
      <Flex>
        <Flex flexFlow={'row wrap'} rowGap={'32px'} columnGap={'32px'} padding={'0 36px'}>
          {data.map((item, idx) => {
            return <ServiceCard title={item.title} src={item.src} key={idx} />;
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
