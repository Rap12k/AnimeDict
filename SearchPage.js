import React, {Component} from 'react';
import {TextInput, Button, StyleSheet, Text, View, Image} from 'react-native';

let 
  bgImage = {
    uri: "https://i.imgur.com/KO8mHUm.png"
};
type Props = {};
function urlForQueryAndPage(key, value, pageNumber) {
  const data = {
      country: 'uk',
      pretty: '1',
      encoding: 'json',
      listing_type: 'buy',
      action: 'search_listings',
      page: pageNumber,
  };
  data[key] = value;

  const querystring = Object.keys(data)
    .map(key => key + '=' + encodeURIComponent(data[key]))
    .join('&');

  return 'https://api.nestoria.co.uk/api?' + querystring;
}
export default class SearchPage extends Component<Props> {
	static navigationOptions = {
    title: 'AnimeDict',
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={bgImage} style={styles.Image}/>
          <View style={styles.text}>
            <Text style={styles.welcome}>Find Anime</Text>
            <Text style={styles.instructions}>This App does bla bla bla, Enter below:</Text>
          </View>
          <View style={styles.flowRight}><TextInput underlineColorAndroid={'transparent'}
             style={styles.searchInput}
            placeholder='Enter Here' />
            <Button color='#48BBEC' title='Go' onPress={this._onSearchPressed}/>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.welcome}>Check a tag below: </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  bottomContainer: {
    height: 190,
    backgroundColor: 'rgb(158,208,230)',
    width: 360,
  },
  text: {
    backgroundColor: 'rgb(158,208,230)',
    alignItems: 'center',
    alignSelf: 'stretch',
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch',
  },
  searchInput: {
    height: 36,
    padding: 5,
    flexGrow: 1,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'rgb(0,0,0)',
    borderRadius: 1,
    color: 'black',
  },
  content: {
    width: '100%',
    borderColor: '#B0B0B0',
    borderWidth: 2,
    alignItems: 'center',
  },
  Image: {
    height: 300,
    width: 360,
    alignSelf: 'center'
  },
  welcome: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
    paddingTop: 0,
    alignSelf: 'center',
    color: 'rgb(169,63,85)',
  },
  instructions: {
    marginBottom: 5,
    padding: 5,
    color: 'rgb(169,63,85)',
    fontSize: 20,
  },
});
