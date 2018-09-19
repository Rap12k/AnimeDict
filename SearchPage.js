import React, {Component} from 'react';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import TimerMixin from 'react-timer-mixin';
import {TextInput,
   Button,
   StyleSheet,
   Text,
   View,
   Image,
   ActivityIndicator,
   } from 'react-native';

let
  bgImage = {
    uri: "https://i.imgur.com/KO8mHUm.png"
};
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
      value: 0,
      radio_props: [
        {
          label: '  Anime  ',
          value: 0,
        },
        {
          label: '  Manga  ',
          value: 1,
        },
        {
          label: 'Something',
          value: 2,
        },
      ],
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
        switch (this.state.value) {
          case 0:
            this.props.navigation.navigate(
            'Results', {result: responseJson.results});
            break;
          case 1:
            this.props.navigation.navigate(
              'MangaList', {result: responseJson.results});
              break;
          default:
            this.props.navigation.navigate(
              'Results', {result: responseJson.results});
            break;
        }
      })
      .catch(error =>
        this.setState({
          disabled: false,
          message: 'Something bad happened ' + error
        }));
  };
  _urlQuery = () => {
      const params = {
          q: this.state.searchString,
          page: 1
      };
      var key;
      params[key] = key;
      var options = ["anime", "manga", "character"];
      var selectedOption = options[this.state.value];
    
      const querystring = Object.keys(params)
        .map(key => key + '=' + encodeURIComponent(params[key]))
        .join('&');
    
      return `https://api.jikan.moe/v3/search/${selectedOption}?` + querystring;
  };
  _onSearchPressed = () => {
    const query = this._urlQuery();
    this._executeQuery(query);
  };
  render() {
    const {value, radio_props} = this.state;
    return (
      <View style={styles.container}>
        <Image source={bgImage} style={styles.Image}/>
        <View style={styles.content}>
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
            <View>
              <RadioForm
                radio_props={radio_props}
                initial={0}
                formHorizontal={true}
                labelHorizontal={false}
                buttonColor={'#2196f3'}
                animation={true}
                onPress={(value) => {this.setState({value:value})}}
              />
            </View>
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
  boxText: {
    padding: 2,
    fontSize: 17,
    color: '#011627',
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
    flex: 1,
    borderColor: '#B0B0B0',
    borderWidth: 2,
    alignItems: 'center',
  },
  Image: {
    height: '50%',
    width: '100%',
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
  checkRow: {
    flexDirection: 'row',
    flex: 1,
  },
  boxes: {
  },
});

export default SearchPage;