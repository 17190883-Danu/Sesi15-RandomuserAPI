import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, Image, FlatList, Alert, ScrollView, ActivityIndicator, StyleSheet} from 'react-native';

const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          `https://randomuser.me/api/?results`,
        );
        const json = await response.json();
        setData(d => [...d, ...json.results]);
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    };

    fetchUsers();
  }, [page]);

  const renderItem = ({item}) => (
    <View style={styles.container}>
      <View style={styles.item}>
        <View style={styles.itemFlex}>
          <Image
            style={styles.itemImage}
            source={{uri: item.picture.thumbnail}}
          />
        </View>

        <View style={styles.itemText}>
          <Text style={styles.title}>
            {`${item.name.title} ${item.name.first} ${item.name.last}`}
          </Text>

          <Text>
            {`${item.location.street.number} ${item.location.street.name} ${item.location.city} ${item.location.state}`}
          </Text>

          <Text>{item.email}</Text>
        </View>
      </View>
    </View>
  );

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const renderFooter = () => {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  };
  
  return (
    <SafeAreaView style={styles.SafeAreaView}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Customers</Text>
      </View>

      <ScrollView>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.email}
          onEndReached={handleLoadMore}
          ListFooterComponent={renderFooter}
          onEndReachedThreshold={0.5}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingTop: 20,
  },

  SafeAreaView: {
    flex: 1,
  },

  header: {
    backgroundColor: 'blue',
    padding: 10,
  },

  textHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    borderRadius: 10,
  },

  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  itemText: {
    paddingLeft: 10,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;