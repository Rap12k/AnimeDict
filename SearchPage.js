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
      picked: '',
      genrePickedAnime: 0,
      genrePickedManga: 0,
      topPickedAnime: '',
      topPickedManga: '',
      seasonPicked: 0,
      anime: true,
      manga: false,
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
        {label: ' ACTION ', key: 1,},{label: ' ADVENTURE ', key: 2,},
        {label: ' CARS ', key: 3,},{label: ' COMEDY ', key: 4,},
        {label: ' DEMENTIA ', key: 5,},{label: ' DEMONS ', key: 6,},
        {label: ' DRAMA ', key: 8,},
        {label: ' ECCHI ', key: 9,},{label: ' FANTASY ', key: 10,},
        {label: ' GAME ', key: 11,},{label: ' HAREM ', key: 35,},
        {label: ' HISTORICAL ', key: 13,},{label: ' HORROR ', key: 14,},
        {label: ' JOSEI ', key: 43,},
        {label: ' KIDS ', key: 15,},{label: ' MAGIC ', key: 16,},
        {label: ' MARTIAL_ARTS ', key: 17,},{label: ' MECHA ', key: 18,},
        {label: ' MILITARY ', key: 38,},{label: ' MUSIC ', key: 19,},
        {label: ' MYSTERY ', key: 7,},{label: ' PARODY ', key: 20,},
        {label: ' POLICE ', key: 39,},{label: ' PSYCHOLOGICAL ', key: 40,},
        {label: ' ROMANCE ', key: 22,},
        {label: ' SAMURAI ', key: 21,},
        {label: ' SCHOOL ', key: 23,},{label: ' SCI_FI ', key: 24,},
        {label: ' SEINEN ', key: 42,},
        {label: ' SHOUJO ', key: 25,},{label: ' SHOUJO_AI ', key: 26,},
        {label: ' SHOUNEN ', key: 27,},{label: ' SHOUNEN_AI ', key: 28,},
        {label: ' SLICE_OF_LIFE ', key: 36,},{label: ' SPACE ', key: 29,},
        {label: ' SPORTS ', key: 30,},{label: ' SUPER_POWER ', key: 31,},
        {label: ' SUPERNATURAL ', key: 37,},{label: ' THRILLER ', key: 41,},
        {label: ' VAMPIRE ', key: 32,},
      ]
    };
  }
  _executeQuery = (query) => {
    this.setState(
      {
        disabled: true,
      });
        switch (this.state.value) {
          case 0:
            this.setState({ message: '', disabled: false});
            this.props.navigation.navigate(
            'Results', {searchQuery: query});
            break;
          case 1:
            this.setState({ message: '', disabled: false});
            this.props.navigation.navigate(
              'MangaList', {searchQuery: query});
              break;//the total results are 50
          case 2:
            this.setState({ message: '', disabled: false});
            this.props.navigation.navigate(
              'AnimeGenre', {searchQuery: query});
              break;//total results are 100
          case 3:
            this.setState({ message: '', disabled: false});
            this.props.navigation.navigate(
              'MangaGenre', {searchQuery: query});
              break;//total results are 100
          case 4:
            fetch(query)
              .then(response => response.json())
              .then(responseJson => {
                this.setState({ message: '', disabled: false});
                this.props.navigation.navigate(
                'UpcomingAnime', {result: responseJson.anime});
                })
              .catch(error =>
                this.setState({
                  disabled: false,
                  message: 'Something bad happened ' + error
                }));
            break;//total results are 228
          default:
            this.props.navigation.navigate(
              'Results', {result: responseJson.results});
            break;
        }
  }
  _urlQuery = () => {
      const params = {
          q: this.state.searchString,
          limit: 50,
          type: this.state.picked
      };
      var key;
      key = params[key];
      var options = ["anime", "manga", "genre", "genre", "season"];
      var genreOptions = ["anime", "manga"];
      var yearOptions = ["2018", "217", "2016", "2015"];
      var seasons = ["spring", "summer", "fall", "winter"];
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
          return `https://api.jikan.moe/v3/${selectedOption}/${genreOptions[0]}/${this.state.genrePickedAnime}/`;
          break;
        case 3:
          return `https://api.jikan.moe/v3/${selectedOption}/${genreOptions[1]}/${this.state.genrePickedManga}/`;
          break;
        case 4:
          return `https://api.jikan.moe/v3/${selectedOption}/${this.state.seasonPicked}?`;
          break;
        default:
          return `https://api.jikan.moe/v3/search/${selectedOption}?` + querystring;
          break;
      }
  }
  _onSearchPickedPressed = (searchValue) => {
    this.setState({
      picked: searchValue,
    });
  }
  _onAnimeButtonPressed = () => {
    this.setState({
      value: 0,
      anime: true,
      manga: false,
    })
  }
  _onMangaButtonPressed = () => {
    this.setState({
      value: 1,
      anime: false,
      manga: true,
    })
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
  _onSeasonButtonPressed = (seasonIndex, seasonValue) => {
    {seasonValue ? 
      (
        this.setState({
        value: 4,
        seasonPicked: seasonValue,
        }, () => {
          this._onSearchButtonPressed();
        })
      )
      : (
        console.log("help me"));
      };
  }
  _onTopPickedAnimePressed = (topValue) => {
    {topValue ? 
      (
        this.setState({
        value: 5,
        topPickedAnime: topValue,
        })//, () => {
         // this._onSearchButtonPressed();
        //})
      )
      : (
        console.log("help me"));
      };
  }
  _onTopPickedMangaPressed = (topValue) => {
    {topValue ? 
      (
        this.setState({
        value: 6,
        topPickedManga: topValue,
        })//, () => {
          //this._onSearchButtonPressed();
        //})
      )
      : (
        console.log("help me"));
      };
  }
  _onSearchButtonPressed = () => {
    const query = this._urlQuery();
    this._executeQuery(query);
  }
  render() {
    const {value, genrePicked, picked, seasonPicked, anime, manga} = this.state;
    const textOptions = ['Anime', 'Manga', 'Anime Genre', 'Manga Genre', 'Seasonal'];
    return (
      <View style={styles.container}>
        <Image source={bgImage} style={styles.Image}/>
        <View style={styles.switch}>
            <View style={styles.leftSwitch}>
              <Button color='#F71735' title='Anime' onPress={this._onAnimeButtonPressed} disabled={this.state.anime}/>
            </View>
            <View style={styles.rightSwitch}>
              <Button color='#000000' title='Manga' onPress={this._onMangaButtonPressed} disabled={this.state.manga}/>
            </View>
          </View>
        <View style={styles.content}>
          <View style={styles.text}>
            <Text style={styles.instructions}>Enter an {textOptions[this.state.value]} to search below:</Text>
          </View>
          <View style={styles.flowRight}><TextInput underlineColorAndroid={'transparent'}
             style={styles.searchInput}
             onChangeText={(searchString) => this.setState({searchString})}
             value={this.state.text}
            placeholder='Enter Here' />
            <Button color='#20A4F3' title='Go' onPress={this._onSearchButtonPressed} disabled={this.state.disabled}/>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottomButton}>
              <Text style={styles.bottomText}>Type of {textOptions[this.state.value]}</Text>
              {this.state.anime ?  
                (
                  <Picker
                    selectedValue={0}
                    onValueChange={(searchValue, searchIndex) => this._onSearchPickedPressed(searchValue)}>
                    <Picker.Item label="All" value="all" />
                    <Picker.Item label="TV" value="tv" />
                    <Picker.Item label="OVA" value="ova" />
                    <Picker.Item label="Movie" value="movie" />
                    <Picker.Item label="Special" value="special" />
                    <Picker.Item label="ONA" value="ona" />
                    <Picker.Item label="Music" value="music" />
                  </Picker>)
                : (
                    <Picker
                      selectedValue={0}
                      onValueChange={(searchValue, searchIndex) => this._onSearchPickedPressed(searchValue)}>
                      <Picker.Item label="All" value="all" />
                      <Picker.Item label="Novel" value="novel" />
                      <Picker.Item label="Oneshot" value="oneshot" />
                      <Picker.Item label="Doujin" value="doujin" />
                      <Picker.Item label="Manhwa" value="manhwa" />
                      <Picker.Item label="Manhua" value="manhua" />
                    </Picker>)}
              <Text style={styles.bottomText}>Time</Text>
              {this.state.anime ?  
                (
                  <Picker
                    selectedValue={0}
                    onValueChange={(seasonValue, seasonIndex) => this._onSeasonButtonPressed(seasonIndex, seasonValue)}
                    enabled={this.state.anime}>
                    <Picker.Item label="Season Option" value={false} />
                    <Picker.Item label="Upcoming" value="later" />
                    <Picker.Item label="Schedule" value="later" />
                  </Picker>)
                : (
                  <Picker
                      selectedValue={0}
                      onValueChange={(searchValue, searchIndex) => this._onSearchPickedPressed(searchValue)}>
                      <Picker.Item label="All" value="all" />
                      <Picker.Item label="Novel" value="novel" />
                      <Picker.Item label="Oneshot" value="oneshot" />
                      <Picker.Item label="Doujin" value="doujin" />
                      <Picker.Item label="Manhwa" value="manhwa" />
                      <Picker.Item label="Manhua" value="manhua" />
                  </Picker>
                )}
            </View>
            <View style={styles.bottomButton}>
              <Text style={styles.bottomText}>{textOptions[this.state.value]} Genre</Text>
              <View>
                {this.state.anime ? 
                  ( 
                    <Picker
                      selectedValue={this.state.genrePickedAnime}
                      onValueChange={(itemValue, itemIndex) => this._onGenrePickedAnimePressed(itemIndex, itemValue)}>
                      {this.state.genre_array.map(genre => {
                        return (< Picker.Item label={genre.label} value={genre.key} key={genre.key}/>);
                      })}
                    </Picker>
                  )
                  : (
                    <Picker
                      selectedValue={this.state.genrePickedManga}
                      onValueChange={(itemValue, itemIndex) => this._onGenrePickedMangaPressed(itemIndex, itemValue)}>
                      {this.state.genre_array.map(genre => {
                        return (< Picker.Item label={genre.label} value={genre.key} key={genre.key}/>);
                      })}
                    </Picker>
                  )}
              </View>
              <Text style={styles.bottomText}>Top {textOptions[this.state.value]}</Text>
              <View>
              {this.state.anime ? 
                (
                  <Picker
                      selectedValue={0}
                      onValueChange={(topValue, searchIndex) => this._onTopPickedAnimePressed(topValue)}>
                      <Picker.Item label="Top Option" value={false} />
                      <Picker.Item label="All" value="all" />
                      <Picker.Item label="Airing" value="airing" />
                      <Picker.Item label="Upcoming" value="upcoming" />
                      <Picker.Item label="TV" value="tv" />
                      <Picker.Item label="Movie" value="movie" />
                      <Picker.Item label="OVA" value="ova" />
                      <Picker.Item label="Special" value="special" />
                  </Picker>)
                : (
                  <Picker
                      selectedValue={0}
                      onValueChange={(topValue, searchIndex) => this._onTopPickedMangaPressed(topValue)}>
                      <Picker.Item label="Top Option" value={false} />
                      <Picker.Item label="All" value="all" />
                      <Picker.Item label="Manga" value="manga" />
                      <Picker.Item label="Novel" value="novels" />
                      <Picker.Item label="Oneshot" value="oneshots" />
                      <Picker.Item label="Doujin" value="doujin" />
                      <Picker.Item label="Manhwa" value="manhwa" />
                      <Picker.Item label="Manhua" value="manhua" />
                  </Picker>
                )}
              </View>
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
  bottomButton: {
    flex: 1,
  },
  text: {
    backgroundColor: '#FDFFFC',
    alignItems: 'center',
    alignSelf: 'stretch',
    padding: 7,
  },
  flowRight: {
  flexDirection: 'row',
  alignItems: 'center',
  alignSelf: 'stretch',
  paddingLeft: '2.5%',
  paddingRight: '2.5%',
  paddingBottom: 5,
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
    padding: 2,
    alignItems: 'center',
  },
  Image: {
    flex: 1,
    width: '100%',
  },
  switch: {
    flexDirection: 'row',
  },
  leftSwitch: {
    flex: 1,
    padding: 10,
  },
  rightSwitch: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 5,
    paddingTop: 0,
    alignSelf: 'center',
    color: '#011627',
  },
  instructions: {
    padding: 2,
    color: '#011627',
    fontSize: 18,
  },
  bottomText: {
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 10,
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
});

export default SearchPage;
