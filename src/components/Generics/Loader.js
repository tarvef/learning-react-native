import React from 'react';
import {View, ActivityIndicator, StatusBar, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Loader = () => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <StatusBar backgroundColor="transparent" translucent={true} />
      <ActivityIndicator
        style={styles.loader}
        color={Colors.white}
        size="large"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.charade,
  },
  horizontal: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loader: {
    height: '100%',
    alignSelf: 'center',
  },
});

export default Loader;
