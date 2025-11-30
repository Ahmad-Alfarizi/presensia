import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import OnboardingIndicator from '../../components/OnboardingIndicator';
import SecondaryButton from '../../components/SecondaryButton';

const { width: screenWidth } = Dimensions.get('window');

const onboardingData = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfwvf_9fNOWu7-bshwKTXQEh35gU5z-lDtOv4BC99ODe-FBo0-teD5UUvdQS-833n1uJ2K9G0-eH_ZeeWfZOoip1TG0vevXMiQaXWTvAmy7BoAAJIPOyVxs9YSFo3DoOgTAM5kOaZx9qA_FTo5W_B3erA3vPY5TqbJZhCUKYlqJjXseSdYQ96P19obwdcIaaZJk2tRoWX-OpBF5TUfKgmLYSCYscis4tdQ772Z3zJrKRTS_EF3-lpUcdmqQtKOZgzR506XklAbfYQ',
    title: 'Welcome to Presensia',
    subtitle: 'Track your class attendance effortlessly and never miss an important lecture. Get started in just a few steps.',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDesbyWp3KDVtdXQ5SS9QzGyNjZPSnoZq7Jt94QZAufiTlSh6zcuWlDCKwEgeuHWsXje7iEX1RZucnYQWiyX92IhYvNeAWBU43l1wnkHeeD51fmqEXZf6Ov5zNcQzPt3LeyS_PDokgK3p29aFTEOHMaRMrKrLDgDGbkG9PlFPetVr0tgXjsDKAzouINdx1Av2ADTtiZPIVmRWhRreGB7F3oH7YwPbXVDeJtjiqkwRTxl7b91_QsHs24xLm4PnF3lbyRpEVZQHMHvz0',
    title: 'Effortless Attendance',
    subtitle: 'Mark your attendance in seconds using a QR code or your GPS location.',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBavoADZs5qUZ9KyxiMr7OKttb6QDWpALtGbkCG3YvHkz8vDCazmBbZF0IDnOHSMhHB69Rl_5tq5GYXDclAijV9Uc8JGMKoNPMII7vClyBBGXjbo9gVYFdSsMViyqmqRmYN00Y_35E00r5jxww-9oQyuOc_DaSRZmBJvPHu-twxoPYJtnNpyckkEFIZdeAb4WO-Uikbw7j_FMZXnehqlGtpTTIYHxF_GE3aGFWmGDXwbd_l-AkyzDld3BpOgE8QuAOT9XQsftoAgVQ',
    title: 'Track Your Progress',
    subtitle: 'Easily view your complete attendance history for every class, all in one place.',
  },
];

export default function Onboarding({ navigation }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / screenWidth);
    setActiveIndex(index);
  };

  const handleContinue = () => {
    if (activeIndex < onboardingData.length - 1) {
      scrollViewRef.current.scrollTo({ x: (activeIndex + 1) * screenWidth, animated: true });
    } else {
      navigation.navigate('SelectedRole');
    }
  };

  const handleSkip = () => {
    navigation.navigate('SelectedRole');
  };

  return (
    <View style={styles.container}>
      <HeaderBar onSkip={handleSkip} />

      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
      >
        {onboardingData.map((item, index) => (
          <View key={index} style={[styles.page, { width: screenWidth }]}>
            <View style={styles.content}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <OnboardingIndicator activeIndex={activeIndex} />
        <SecondaryButton
          title={activeIndex === onboardingData.length - 1 ? 'Get Started' : 'Continue'}
          onPress={handleContinue}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f7f8',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 16,
    resizeMode: 'cover',
  },
  title: {
    color: '#1a1a1a',
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 40,
  },
  subtitle: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    maxWidth: 300,
    marginTop: 10,
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
});
