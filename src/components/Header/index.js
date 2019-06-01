import React, { Component } from "react";
import { View, Text, TouchableOpacity, StatusBar } from "react-native";
import PropTypes from "prop-types";
import { withNavigation } from "react-navigation";

import Icon from "react-native-vector-icons/FontAwesome";

import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";

class Header extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigation: PropTypes.shape({
      navigation: PropTypes.func
    })
  };

  signOut = async () => {
    await AsyncStorage.clear();
    const { navigation } = this.props;
    navigation.navigate("Welcome");
  };

  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.left} />
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={this.signOut}>
          <Icon name="exchange" size={16} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withNavigation(Header);
