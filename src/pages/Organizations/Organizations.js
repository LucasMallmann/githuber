import React, { Component } from "react";
import { Text, View, ActivityIndicator, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";

import Header from "../../components/Header";
import OrganizationItem from "./OrganizationItem";
import api from "../../services/api";

import styles from "./styles";

class Organizations extends Component {
  state = {
    data: [],
    loading: true,
    error: false,
    refreshing: false
  };

  async componentDidMount() {
    this.loadOrganizations();
  }

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name="list-alt" size={20} color={tintColor} />
    )
  };

  loadOrganizations = async () => {
    try {
      this.setState({ refreshing: true });
      const username = await AsyncStorage.getItem("@Githuber:username");
      const { data } = await api.get(`/users/${username}/orgs`);
      this.setState({ data, loading: false, error: false, refreshing: false });
    } catch (error) {
      this.setState({ error: true });
    }
  };

  renderListItem = ({ item }) => <OrganizationItem organization={item} />;

  renderOrganizations = () => {
    const { data, refreshing } = this.state;
    return (
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={this.renderListItem}
        onRefresh={this.loadOrganizations}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        refreshing={refreshing}
      />
    );
  };

  render() {
    const { loading } = this.state;
    return (
      <View style={styles.container}>
        <Header title="Organizações" />
        {loading ? (
          <ActivityIndicator style={styles.loading} />
        ) : (
          this.renderOrganizations()
        )}
      </View>
    );
  }
}

export default Organizations;
