import React from "react";
import ItemCard from "../components/ItemCard";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import SearchBar from "../components/SearchBar";
import CategorySelector from "../components/CategorySelector";
import { ScrollView } from "react-native-gesture-handler";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndividualItemScreen from "../components/IndividualItemScreen";

const dummyData = [
  {
    title: "1984 Minimoog",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072891959?alt=media&token=834bfaae-9f63-4cd9-af1d-47e506cf630b",
    isAvailable: true,
    location: "Guiseley",
    category: "audio",
    price: 10,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  },
  {
    title: "Boom Microphone",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Faaroniousbosch-1574072895305?alt=media&token=165216b8-eaeb-4415-81b9-af0b2264d028",
    isAvailable: true,
    location: "Kirkstall",
    category: "audio",
    price: 20,
    body:
      "A boom microphone is, put simply, a microphone attached to a boom. A microphone is a piece of audio equipment designed to record sounds. A boom is an extendable and adjustable arm which a microphone can be mounted on."
  },
  {
    title: "Wireless Microphone",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Ftonyboi-1574072795955?alt=media&token=e9a9ce56-7ed2-444f-a081-dcd6ffe617dc",
    isAvailable: true,
    location: "Pontefract",
    category: "audio",
    price: 32,
    body:
      "Wireless Microphone System,FIFINE Wireless Microphone Set with Headset and Lavalier Lapel Mics, Beltpack Transmitter and Receiver,Ideal for Teaching, Preaching and Public Speaking Applications-K037B. by FIFINE"
  },
  {
    title: "GoPro Hero 5",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Ftonyboi-1574072799672?alt=media&token=8a0b4342-4b9e-4a16-aba4-530694468006",
    isAvailable: false,
    location: "Ponetfract",
    category: "video",
    price: 20,
    body:
      "HERO5 Black is the most powerful and easy-to-use GoPro ever, thanks to its 4K video, voice control, one-button simplicity, touch display and waterproof design. Smooth stabilized video, crystal-clear audio and pro-quality photo capture combine with GPS to make HERO5 Black simply the best GoPro."
  },
  {
    title: "UGEE M708 Graphics Tablet",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Fumayrs95-1574072424794?alt=media&token=94a065e2-bfbb-41c3-add4-0e2a9fbc82b2",
    isAvailable: false,
    location: "Bradford",
    category: "art",
    price: 10,
    body:
      "UGEE M708 Graphics Tablet, 10 x 6 Inch Large Drawing Tablet, 8192 Levels Pressure Battery-Free Pen Stylus, 8 Hotkeys, Compatible With Windows 10/8/7 and Mac OSX"
  },
  {
    title: "M-Audio KeyLab Essential 49",
    img:
      "https://firebasestorage.googleapis.com/v0/b/kitlet-784db.appspot.com/o/images%2Fumayrs95-1574072432159?alt=media&token=d304da10-8271-4c7b-803c-bee8307a254b",
    isAvailable: false,
    location: "Bradford",
    category: "audio",
    price: 20,
    body:
      "The Minimoog is a vintage synthesiser from the 80s made by moog. This iconic sound can be heard on many of the 80s biggest tracks"
  }
];

class DiscoverScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  state = {
    takePicture: false,
    items: dummyData,
    bottomBorder: false
  };
  orderByPrice = ascending => {
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      const sortedItems = itemsClone.sort((a, b) => {
        return ascending ? a.price - b.price : b.price - a.price;
      });
      return { items: sortedItems };
    });
  };
  orderByAvailability = ascending => {
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      const sortedItems = itemsClone.sort((a, b) => {
        return ascending
          ? a.isAvailable - b.isAvailable
          : b.isAvailable - a.isAvailable;
      });
      return { items: sortedItems };
    });
  };
  orderByLocation = ascending => {
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      const sortedItems = itemsClone.sort((a, b) => {
        return ascending
          ? a.location[0].charCodeAt() - b.location[0].charCodeAt()
          : b.location[0].charCodeAt() - a.location[0].charCodeAt();
      });
      return { items: sortedItems };
    });
  };
  sortByCategory = category => {
    this.setState(currentState => {
      const itemsClone = [...currentState.items];
      sortedItems = itemsClone.filter(item => {
        return item.category === category;
      });
      return { items: sortedItems };
    });
  };
  bottomBorder = needed => {
    this.setState({ bottomBorder: needed });
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
        <SearchBar
          bottomBorder={this.bottomBorder}
          orderByPrice={this.orderByPrice}
          orderByLocation={this.orderByLocation}
          orderByAvailability={this.orderByAvailability}
          filterResults={this.filterResults}
          resetResults={this.resetResults}
        />
        <CategorySelector
          sortByCategory={this.sortByCategory}
          resetResults={this.resetResults}
        />
        <ScrollView>
          {this.state.items.map((item, index) => {
            return (
              <TouchableOpacity
                key={`${index}-view`}
                onPress={() =>
                  this.props.navigation.navigate("IndividualItem", item)
                }
              >
                <ItemCard key={index} props={item} />
              </TouchableOpacity>
            );
          })}
          {this.state.bottomBorder && (
            <View style={styles.bottomPadding}></View>
          )}
        </ScrollView>
      </View>
    );
  }
}

<IndividualItemScreen />;

const DiscoverScreenNavigation = createStackNavigator(
  {
    Discover: DiscoverScreen,
    IndividualItem: IndividualItemScreen
  },
  {
    initialRouteName: "Discover"
  }
);

IndividualItemScreen.navigationOptions = {
  title: "Back To More Items"
};

const DicoverContainer = createAppContainer(DiscoverScreenNavigation);

const styles = StyleSheet.create({
  container: { paddingTop: 50, paddingBottom: 168 },
  header: { fontSize: 22 },
  bottomPadding: { height: 36, paddingBottom: 48, marginBottom: 16 }
});

export default class Discover extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return <DicoverContainer />;
  }
}
