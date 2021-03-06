'use strict';

import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  FlatList,
  Text,
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
            <Image style={styles.thumb} source={item.r18 ? {uri: nsfwImage.image_url} : {uri: item.image_url} } />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.header}>Type: {item.type}</Text>
              <Text style={styles.header}>Members: {item.members}</Text>
              <Text style={styles.header}>Source: {item.source}</Text>
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
    title: 'Upcoming Anime',
    headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1, fontWeight:'bold',},
  };
  _renderItem = ({item, index}) => (
    <ListItem
       item={item}
       index={index}
       onPressItem={this._onPressItem}
    />
    );

  _onPressItem = (index) => {
    const { navigate, state } = this.props.navigation;
    navigate('UpcomingAnimeView', {result: state.params.result[index]});
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.result}
        initialNumToRender={25}
        maxToRenderPerBatch={25}
        keyExtractor = {(item, index) => index.toString()}
        renderItem={this._renderItem}
      />
    );
  }
}
const styles = StyleSheet.create({
  thumb: {
    width: 100,
    height: 120,
    marginRight: 10
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
