import React from "react";
import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator
} from "react-native";
import {
  Constants
} from "expo";
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import {
  createStackNavigator
} from "react-navigation";

const AppNavigator = createStackNavigator({
  HomeScreen: HomeScreen,
  Detail: DetailScreen
}, {
  initialRouteName: "HomeScreen"
});

export default class App extends React.Component {
  state = {
    movieId: '',
  }

  showDetails = movieId => {
    this.setState({
      movieId
    })
  }

  render() {
    console.log(this.state.movieId)
    return ( <
      AppNavigator screenProps = {
        {
          showDetails: this.showDetails
        }
      }
      />
    );
  }
}