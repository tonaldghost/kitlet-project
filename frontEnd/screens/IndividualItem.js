
export default class IndividualItem extends React.Component {
    static navigationOptions = {
      header: null
    };
    state = {
      takePicture: false,
      items: dummyData
    };
    orderByPrice = ascending => {
      console.log("ordering by price function", ascending);
      this.setState(currentState => {
        const itemsClone = [...currentState.items];
        const sortedItems = itemsClone.sort((a, b) => {
          return ascending ? a.price - b.price : b.price - a.price;
        });
        return { items: sortedItems };
      });
    };
    resetResults = () => {
      this.setState({ items: dummyData });
    };
    filterResults = searchTerm => {
      const itemsClone = [...this.state.items];
      const filteredItems = itemsClone.filter(item => {
        return (
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.body.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      this.setState({ items: filteredItems });
    };
    render() {
      return (
        <View style={styles.container}>
          <Text style={styles.header}>Welcome to Kitlet</Text>
          <SearchBar
            orderByPrice={this.orderByPrice}
            filterResults={this.filterResults}
            resetResults={this.resetResults}
          />
          <ScrollView>
            {this.state.items.map((item, index) => {
              return <ItemCard key={index} props={item} />;
            })}
          </ScrollView>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: { paddingTop: 50, paddingBottom: 84 },
    header: { fontSize: 22 }
  });
  