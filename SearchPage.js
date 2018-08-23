import React, {Component} from 'react';
import TimerMixin from 'react-timer-mixin';
import {TextInput, Button, StyleSheet, Text, View, Image} from 'react-native';
import jikanjs from 'jikanjs';

let
  bgImage = {
    uri: "https://i.imgur.com/KO8mHUm.png"
};
type Props = {};
function urlForQueryAndPage(key, value, pageNumber) {
  mixins: [TimerMixin],
  this.interval = setInterval(() => {
  const params = {
      type: 'TV',
      page: pageNumber,
  };
  params[key] = value;

  const querystring = Object.keys(params)
    .map(key => key + '=' + encodeURIComponent(params[key]))
    .join('&');

  return 'https://api.jikan.moe/search/anime?q=' + querystring;
},4000);}
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
  _onSearchTextChanged = (event) => {
    console.log('_onSearchTextChanged');
    this.setState({ searchString: event.nativeEvent.text });
    console.log('Current: '+this.state.searchString+', Next:'+event.nativeEvent.text);
  };
  _executeQuery = (query) => {
    console.log(query);
    this.setState({ isLoading: true });
    fetch(query)
      .then(response => response.json())
      .then(json => this._handleResponse(json.response))
      .catch(error =>
        this.setState({
          isLoading: false,
          message: 'Something bad happened ' + error
        }));
  };
  _handleResponse = (response) => {
    this.setState({ isLoading: false, message: ''});
    if (response.application_response_code.substr(0, 1) === '1') {
      this.props.navigation.navigate(
        'Results', {listings: response.result});
    } else {
      this.setState({ message: 'Anime not recognized; please try again'});
    }
  };
  _onSearchPressed = () => {
    const query = urlForQueryAndPage('title', this.state.searchString, 1);
    this._executeQuery(query);
  };
  render() {
    const spinner = this.state.isLoading ?
      <ActivityIndicator size='small'/> : null;
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
            {spinner}
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
    height: 200,
    width: 260,
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
