import React, {Component} from 'react';
import TimerMixin from 'react-timer-mixin';
import createStackNavigator from 'react-navigation';
import {TextInput,
   Button,
   StyleSheet,
   Text,
   View,
   Image,
   ActivityIndicator,} from 'react-native';

let
  bgImage = {
    uri: "https://i.imgur.com/KO8mHUm.png"
};
function urlForQueryAndPage(key, value, pageNumber) {
  const params = {
      q: value,
      type: 'TV',
      page: pageNumber,
  };
  params[key] = value;

  const querystring = Object.keys(params)
    .map(key => key + '=' + encodeURIComponent(params[key]))
    .join('&');

  return 'https://api.jikan.moe/search/anime?' + querystring;
}
export default class SearchPage extends Component<Props> {
	static navigationOptions = {
    title: 'AnimeDict',
  };
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'Bobobo',
      isLoading: false,
      message: '',
    };
  }
  _executeQuery = (query) => {
    this.setState(
      { isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ isLoading: false, message: ''});
        this.props.navigation.navigate(
          'Results', {result: responseJson.result});
      })
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        }));
  };
  _onSearchPressed = () => {
    const query = urlForQueryAndPage('anime', this.state.searchString, 1);
    this._executeQuery(query);
  };
  render() {
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='large'/> : null;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={bgImage} style={styles.Image}/>
          <View style={styles.text}>
            <Text style={styles.welcome}>Find Anime</Text>
            <Text style={styles.instructions}>Enter an Anime to search below:</Text>
            {spinner}
            <Text style={styles.description}>{this.state.message}</Text>
          </View>
          <View style={styles.flowRight}><TextInput underlineColorAndroid={'transparent'}
             style={styles.searchInput}
             onChangeText={(searchString) => this.setState({searchString})}
             value={this.state.text}
            placeholder='Enter Here' />
            <Button color='#48BBEC' title='Go' onPress={this._onSearchPressed}/>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.welcome}>Check a Box Below: </Text>
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
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
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
    height: 250,
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
