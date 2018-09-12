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

  return 'https://api.jikan.moe/v3/search/anime?' + querystring;
}
class SearchPage extends Component<Props> {
	static navigationOptions = {
    title: 'AnimeDict',
  };
  constructor(props) {
    super(props);
    this.state = {
      searchString: 'Bobobo',
      disabled: false,
      message: '',
    };
  }
  _executeQuery = (query) => {
    this.setState(
      { 
        disabled: true,
      });
    fetch(query)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ message: '', disabled: false});
        this.props.navigation.navigate(
          'Results', {result: responseJson.results});
      })
      .catch(error =>
        this.setState({
          disabled: false,
          message: 'Something bad happened ' + error
        }));
  };
  _onSearchPressed = () => {
    const query = urlForQueryAndPage('anime', this.state.searchString, 1);
    this._executeQuery(query);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={bgImage} style={styles.Image}/>
          <View style={styles.text}>
            <Text style={styles.heading}>Find Anime</Text>
            <Text style={styles.instructions}>Enter an Anime to search below:</Text>
            <Text style={styles.description}>{this.state.message}</Text>
          </View>
          <View style={styles.flowRight}><TextInput underlineColorAndroid={'transparent'}
             style={styles.searchInput}
             onChangeText={(searchString) => this.setState({searchString})}
             value={this.state.text}
            placeholder='Enter Here' />
            <Button color='#F71735' title='Go' onPress={this._onSearchPressed} disabled={this.state.disabled}/>
          </View>
          <View style={styles.bottomContainer}>
            <Text style={styles.heading}>Check a Box Below: </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFFFC',
  },
  description: {
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#011627'
  },
  bottomContainer: {
    flex: 2,
    backgroundColor: '#FDFFFC',
  },
  text: {
    backgroundColor: '#FDFFFC',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch',
  padding: 5,
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
    flex: 1,
  },
  Image: {
    height: 250,
    width: 360,
    alignSelf: 'center'
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    padding: 5,
    paddingTop: 0,
    alignSelf: 'center',
    color: '#011627',
  },
  instructions: {
    padding: 5,
    color: '#011627',
    fontSize: 20,
  },
});

export default SearchPage;