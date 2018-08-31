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
class ListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  }

  render() {
    const item = this.props.item;
    return (
      <TouchableHighlight
        onPress={this._onPress}
        underlayColor='#dddddd'>
        <View>
          <View style={styles.rowContainer}>
            <Image style={styles.thumb} source={{ uri: item.image_url }} />
            <View style={styles.textContainer}>
              <Text style={styles.price}>{item.title}</Text>
              <Text style={styles.title}>Type: {item.type}</Text>
              <Text style={styles.title}>Number of Episodes: {item.episodes}</Text>
              <Text style={styles.title}>MAL Score: {item.score}</Text>
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
    title: 'Results',
    headerTitleStyle: {textAlign:'center', alignSelf:'center',flex:1, fontWeight:'bold',},
  };
  _keyExtractor = (item, index) => index;

  _renderItem = ({item, index}) => (
    <ListItem
       item={item}
       index={index}
       onPressItem={this._onPressItem}
    />
    );

  _onPressItem = (index) => {
    const { navigate, state } = this.props.navigation;
    navigate('Anime', {result: state.params.result[index]});
  };
  render() {
    const { params } = this.props.navigation.state;
    return (
      <FlatList
        data={params.result}
        keyExtractor={this._keyExtractor}
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
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#48BBEC'
  },
  title: {
    fontSize: 20,
    color: '#656565'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  },
});
