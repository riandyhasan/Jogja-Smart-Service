import { Flex, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ServiceCard from '../../src/components/Card/ServiceCard';
import colours from '../../styles/colours';
import Head from 'next/head';

const data = [
  { title: 'Smart Parking', src: '/image/smart-parking.png', route: '/smart-parking' },
  { title: 'Accident Detector', src: '/image/accident-detector.png' },
  { title: 'Public Transport', src: '/image/public-transport.png' },
  { title: 'Natural Disaster', src: '/image/natural-disaster.png' },
  { title: 'Air Quality', src: '/image/air-quality.png' },
];

const Home = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Jogja Smart Service | Home</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

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
              return (
                // <a href={item.route}>
                <ServiceCard
                  title={item.title}
                  src={item.src}
                  key={idx}
                  onClick={() => {
                    router.push(`/${item.route}`);
                  }}
                />
                // </a>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Home;
