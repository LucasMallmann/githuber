import React, { Component } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";

import Header from "../../components/Header";
import RepositoryItem from "./components/RepositoryItem";
import api from "../../services/api";

import styles from "./styles";

class Repositories extends Component {
  state = {
    data: [],
    loading: true,
    error: false,
    refreshing: false
  };

  async componentDidMount() {
    this.loadRepositories();
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list-alt" size={20} color={tintColor} />
    )
  };

  loadRepositories = async () => {
    try {
      this.setState({ refreshing: true });
      const username = await AsyncStorage.getItem("@Githuber:username");
      const { data } = await api.get(`/users/${username}/repos`);
      this.setState({ data, loading: false, error: false, refreshing: false });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  renderListItem = ({ item }) => <RepositoryItem repository={item} />;

  renderRepos = () => {
    const { data, refreshing } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadRepositories}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Repositórios" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderRepos()
        )}
      </View>
    );
  }
}

export default Repositories;
