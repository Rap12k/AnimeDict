import React, {Component} from 'react';
import {TextInput,
   Button,
   StyleSheet,
   Text,
   View,
   Image,
   Picker,
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
      message: '',
      value: 0,
      picked: 0,
      genrePickedAnime: 0,
      genrePickedManga: 0,
      radio_props: [
        {
          label: '  Anime  ',
          value: 0,
        },
        {
          label: '  Manga  ',
          value: 1,
        },
      ],
      genre_array: [
        {label: ' Action ', key: 1,},{label: ' Adventure ', key: 2,},
        {label: ' CARS ', key: 3,},{label: ' Comedy ', key: 4,},
        {label: ' DEMENTIA ', key: 5,},{label: ' DEMONS ', key: 6,},
        {label: ' MYSTERY ', key: 7,},{label: ' DRAMA ', key: 8,},
        {label: ' ECCHI ', key: 9,},{label: ' FANTASY ', key: 10,},
        {label: ' GAME ', key: 11,},
        {label: ' HISTORICAL ', key: 13,},{label: ' HORROR ', key: 14,},
        {label: ' KIDS ', key: 15,},{label: ' MAGIC ', key: 16,},
        {label: ' MARTIAL_ARTS ', key: 17,},{label: ' MECHA ', key: 18,},
        {label: ' MUSIC ', key: 19,},{label: ' PARODY ', key: 20,},
        {label: ' SAMURAI ', key: 21,},{label: ' ROMANCE ', key: 22,},
        {label: ' SCHOOL ', key: 23,},{label: ' SCI_FI ', key: 24,},
        {label: ' SHOUJO ', key: 25,},{label: ' SHOUJO_AI ', key: 26,},
        {label: ' SHOUNEN ', key: 27,},{label: ' SHOUNEN_AI ', key: 28,},
        {label: ' SPACE ', key: 29,},{label: ' SPORTS ', key: 30,},
        {label: ' SUPER_POWER ', key: 31,},{label: ' VAMPIRE ', key: 32,},
        {label: ' HAREM ', key: 35,},{label: ' SLICE_OF_LIFE ', key: 36,},
        {label: ' SUPERNATURAL ', key: 37,},{label: ' MILITARY ', key: 38,},
        {label: ' POLICE ', key: 39,},{label: ' PSYCHOLOGICAL ', key: 40,},
        {label: ' THRILLER ', key: 41,},{label: ' SEINEN ', key: 42,},
        {label: ' JOSEI ', key: 43,},
      ]
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
          case 2:
            this.props.navigation.navigate(
              'AnimeGenre', {result: responseJson.anime});
              break;
          case 3:
            this.props.navigation.navigate(
              'MangaGenre', {result: responseJson.manga});
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
  }
  _urlQuery = () => {
      const params = {
          q: this.state.searchString,
          page: 1,
          limit: 25
      };
      var key;
      key = params[key];
      var options = ["anime", "manga", "genre", "genre"];
      var genreOptions = ["anime", "manga"];
      var selectedOption = options[this.state.value];
    
      const querystring = Object.keys(params)
        .map(key => key + '=' + encodeURIComponent(params[key]))
        .join('&');
      switch (this.state.value) {
        case 0:
        case 1:
          return `https://api.jikan.moe/v3/search/${selectedOption}?` + querystring;
          break;
        case 2:
          return `https://api.jikan.moe/v3/${selectedOption}/${genreOptions[0]}/${this.state.genrePickedAnime}?`;
          break;  
        case 3:
          return `https://api.jikan.moe/v3/${selectedOption}/${genreOptions[1]}/${this.state.genrePickedManga}?`;
          break;
        default:
          return `https://api.jikan.moe/v3/search/${selectedOption}?` + querystring;
          break;
      } 
  }
  _onSearchPickedPressed = (searchIndex, searchValue) => {
    this.setState({
      value: searchIndex,
      picked: searchValue,
    });
  }
  _onGenrePickedAnimePressed = (itemIndex, itemValue) => {
    this.setState({
      value: 2,
      genrePickedAnime: itemValue,
    }, () => {
      this._onSearchButtonPressed();
    });
  }
  _onGenrePickedMangaPressed = (itemIndex, itemValue) => {
    this.setState({
      value: 3,
      genrePickedManga: itemValue,
    }, () => {
      this._onSearchButtonPressed();
    });
  }
  _onSearchButtonPressed = () => {
    const query = this._urlQuery();
    this._executeQuery(query);
  }
  render() {
    const {value, genrePicked, picked} = this.state;
    const textOptions = ['Anime', 'Manga', 'Genre-A', 'Genre-M'];
    return (
      <View style={styles.container}>
        <Image source={bgImage} style={styles.Image}/>
        <View style={styles.content}>
          <View style={styles.text}>
            <Text style={styles.heading}>Find Anime</Text>
            <Text style={styles.instructions}>Enter an Anime to search below:</Text>
          </View>
          <View style={styles.flowRight}><TextInput underlineColorAndroid={'transparent'}
             style={styles.searchInput}
             onChangeText={(searchString) => this.setState({searchString})}
             value={this.state.text}
            placeholder='Enter Here' />
            <Button color='#F71735' title='Go' onPress={this._onSearchButtonPressed} disabled={this.state.disabled}/>
          </View>
          <View style={styles.bottomContainer}>
            <View style={{flex: 1}}>
              <Text style={styles.bottomText}>Search {textOptions[this.state.value]}</Text>
              <Picker
                selectedValue={this.state.picked}
                onValueChange={(searchValue, searchIndex) => this._onSearchPickedPressed(searchIndex, searchValue)}>
                <Picker.Item label="Anime" value="anime" />
                <Picker.Item label="Manga" value="manga" />
              </Picker>
              <Text>Value: {this.state.value} Genre Picked: {this.state.genrePickedAnime}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.bottomText}>Anime Genre</Text>
              <View>
              <Picker
                selectedValue={this.state.genrePickedAnime}
                onValueChange={(itemValue, itemIndex) => this._onGenrePickedAnimePressed(itemIndex, itemValue)}>
                {this.state.genre_array.map(genre => {
                  return (< Picker.Item label={genre.label} value={genre.key} key={genre.key}/>);
                })}
              </Picker>
              </View>
              <Text style={styles.bottomText}>Manga Genre</Text>
              <Picker
                selectedValue={this.state.genrePickedManga}
                onValueChange={(itemValue, itemIndex) => this._onGenrePickedMangaPressed(itemIndex, itemValue)}>
                {this.state.genre_array.map(genre => {
                  return (< Picker.Item label={genre.label} value={genre.key} key={genre.key}/>);
                })}
              </Picker>
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
    flexDirection: 'row',
    backgroundColor: '#FDFFFC',
  },
  text: {
    backgroundColor: '#FDFFFC',
    alignItems: 'center',
    alignSelf: 'stretch',
    height: 80,
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
    padding: 4,
    color: '#011627',
    fontSize: 18,
  },
  bottomText: {
    padding: 2,
    color: '#011627',
    fontSize: 16,
  },
  modal: {
    marginTop: 22,
    paddingLeft: 30,
  },
  checkRow: {
    flexDirection: 'row',
    flex: 1,
  },
  boxes: {
  },
});

export default SearchPage;