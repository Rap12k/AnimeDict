'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
  ActivityIndicator,
  Button,
} from 'react-native';
const nsfwImage = {
  image_url: "https://i.imgur.com/iux1a7b.png"
};
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
            <Image style={styles.thumb} source={item.r18 ? {uri: nsfwImage.image_url} : {uri: item.image_url} } />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.header}>Type: {item.type}</Text>
              <Text style={styles.header}>Volumes: {item.volumes}</Text>
              <Text style={styles.header}>Score: {item.score ? item.score : 'None'}</Text>
              <Text style={styles.header}>Genres: {item.genres[0].name ? item.genres[0].name : 'None'} {item.genres[1]? ', ' + item.genres[1].name : ''}</Text>
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
    title: 'Genre Results',
    headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1, fontWeight:'bold',},
  };
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.state = {
      loading: true,
      serverData: [],
      fetching_from_server: false,
      fetchRequest: this.params.searchQuery,
    };
    this.offset = 1;
    //index of offset to load from web api
  }
  componentDidMount() {
    fetch(this.state.fetchRequest + this.offset)
    //Sending the currect offset with get request
      .then(response => response.json())
      .then(responseJson => {
      //Successful response from the API Call
        this.offset = this.offset + 1;
        //After the response increasing the offset for the next API call.
        this.setState({
          serverData: [...this.state.serverData, ...responseJson.manga],
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
      fetch(this.state.fetchRequest + this.offset)
       //sending the current pagenum with request
      .then(response => response.json())
      .then(responseJson => {
        //successful response from API CALL
        this.offset = this.offset + 1;
        //After response increase offset for next call

        this.setState({
          serverData: [...this.state.serverData, ...responseJson.manga],
          //adding the new fetched data to old one available in Data source of list

          fetching_from_server: false
          //update loading state to false
        });
      })
      .catch(error => {
        console.error(error);
      });
    });
    console.log("Loading More Data");
  };
  _renderItem = ({item, index}) => (
    <ListItem
       item={item}
       index={index}
       onPressItem={this._onPressItem}
    />
    );

  _onPressItem = (index) => {
    console.log(this.state.serverData[index]);
    const { navigate, state } = this.props.navigation;
    navigate('GenreMangaView', {result: this.state.serverData[index]});
  };
  renderFooter() {
    return (
    //Footer View with Load More button
      <View style={styles.footer}>
        <Button
          onPress={this._loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          color="#800000"
          title='Load More'
          disabled={this.state.fetching_from_server}
        />
      </View>
    );
  }
  render() {
    return (
    <View>
      {this.state.loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={this.state.serverData}
          initialNumToRender={25}
          maxToRenderPerBatch={25}
          keyExtractor = {(item, index) => index.toString()}
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
    backgroundColor: "#FDFFFC"
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
  },
});