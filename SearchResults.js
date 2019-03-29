'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  TouchableOpacity,
  FlatList,
  Text,
  ActivityIndicator,
} from 'react-native';
const nsfwImage = {
  image_url: "https://i.imgur.com/iux1a7b.png"
};
const nsfwRating = ["R", "Rx", "R+"];
class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#8d99ae'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={nsfwRating.includes(item.rated) ? {uri: nsfwImage.image_url} : {uri: item.image_url} } />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.header}>Type: {item.type}</Text>
              <Text style={styles.header}>Episodes: {item.episodes}</Text>
              <Text style={styles.header}>Rating: {item.rated ? item.rated : 'None'}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }
}

export default class SearchResults extends Component {
  static navigationOptions = {
    title: 'Anime Results',
    headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1, fontWeight:'bold',},
  };
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      serverData: [],
      fetching_from_server: false,
      fetchRequest: this.params.searchQuery,
    };
    this.offset = 1;
    //index of offset to load from web api
  }
  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    <ListItem
       item={item}
       index={index}
       onPressItem={this._onPressItem}
    />
    );
  componentDidMount() {
    fetch(this.state.fetchRequest + '&page=' + this.offset)
    //Sending the currect offset with get request
      .then(response => response.json())
      .then(responseJson => {
      //Successful response from the API Call
        this.offset = this.offset + 1;
        //After the response increasing the offset for the next API call.
        this.setState({
          serverData: [...this.state.serverData, ...responseJson.results],
          //adding the new data with old one available in Data Source of the List
          loading: false,
          //updating the loading state to false
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  _loadMoreData = () => {
    //fetch after clicking load more
    this.setState({ fetching_from_server: true }, () => {
      fetch(this.state.fetchRequest + '&page='+ this.offset)
       //sending the current pagenum with request
      .then(response => response.json())
      .then(responseJson => {
        //successful response from API CALL
        this.offset = this.offset + 1;
        //After response increase offset for next call

        this.setState({
          serverData: [...this.state.serverData, ...responseJson.results],
          //adding the new fetched data to old one available in Data source of list

          fetching_from_server: false
          //update loading state to false
        });
      })
      .catch(error => {
        console.error(error);
      });
    });
  };
  _onPressItem = (index) => {
    const { navigate, state } = this.props.navigation;
    navigate('Anime', {result: serverData[index].params.result});
  };
  renderFooter() {
    return (
    //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this._loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
      {this.state.loading? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={this.state.serverData}
          keyExtractor={(item) => item.toString()}
          renderItem={this._renderItem}
          ListFooterComponent={this.renderFooter.bind(this)}
        />)}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  thumb: {
    width: 100,
    height: 120,
    marginRight: 10
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d80032'
  },
  header: {
    fontSize: 18,
    color: '#011627'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: "#FDFFFC"
  },
});
