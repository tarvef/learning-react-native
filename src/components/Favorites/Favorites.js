import React from 'react';
import Colors from '../../res/Colors';
import Storage from '../../libs/storage';
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  StatusBar,
} from 'react-native';
import exampleStyles from '../../styles/example';
import BadgeItem from '../BadgesScreen/BadgesItem'
import Loader from '../Generics/Loader';

class Favorites extends React.Component {
  state = {
    loading: false,
    badges: undefined,
  };

  //Get all functions for favorites
  componentDidMount() {
    this.getFavorites();
    this.focusEvent();
  }

  //Get all favorites and save the ids on the local storage
  getFavorites = async () => {
    this.setState({loading: true, badges: undefined})
    try {
      const allKeys = await Storage.instance.getAllKeys();
      const keys = allKeys.filter(key => key.includes('favorite-'));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map(fav => JSON.parse(fav[1]));
      this.setState({loading: false, badges: favorites});
    } catch (err) {
      console.log('get favorites err', err);
    }
  };

  //Show details for each badge
  handlePress = item => {
    this.props.navigation.navigate('FavoritesDetails', {item})
  }

  //Get all favorites
  focusEvent = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.getFavorites();
    });
  };

  //Call the function focuslistener
  componentWillUnmount = () => {
    this.focusListener();
  };

  render() {
    const {badges, loading} = this.state;

    if ((loading === true) & !badges) {
      <Loader />
    }
    return (
      <View
        style={[
          styles.favoritesContainer,
          styles.container,
          styles.horizontal,
        ]}>
        <StatusBar backgroundColor="transparent" translucent={true} />
        <FlatList
          style={styles.list}
          data={badges}
          renderItem={({item}) => (
            <BadgeItem item={item} onPress={() => this.handlePress(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  favoritesContainer: {
    paddingTop: 45,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.blackPearl,
    color: Colors.purple,
  },
  horizontal: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loader: {
    height: '100%',
    alignSelf: 'center',
  },
  list: {
    width: '100%',
    paddingHorizontal: 10,
  },
});

export default Favorites;
