import React, { PureComponent } from "react";
import {View, Platform, StyleSheet} from 'react-native';
import IonIcon from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native-gesture-handler";

import { commonStyles, dimensions } from "../theme";
import PBText from "../components/PBText";
import PBTouchable from '../components/PBTouchable';
import { CommonService } from "../services";
import Image from "react-native-scalable-image";

class SortStripCapsules extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      scrollPosition: 0,
      offset: 0,
    };
    this.offset = 0;
  }

  changeScrollPosion = (type) => {
    // this.setState({
    //   scrollPosition:
    //     type == 2
    //       ? this.state.scrollPosition + 1
    //       : this.state.scrollPosition - 1,
    // });
    try {
      if (this.scroll) {
        this.setState({
          scrollPosition: type == 2 ? 1 : 0,
          offset: type == 2 ? 100 : 0,
        });
        if (type == 2) this.scroll.scrollToEnd({ animated: true });
        else this.scroll.scrollTo({ x: 0, animated: true });
      }
    } catch (e) {
      console.log(e);
    }
  };

  onScroll = (event) => {
    var currentOffset = event.nativeEvent.contentOffset.x;
    //     var direction = currentOffset > this.offset ? 'left' : 'right';
    this.offset = currentOffset;
    this.setState({ offset: currentOffset });
  };

  render() {
    const { props } = this;
    return (
      <View style={[styles.sortStripContainer]}>
        {this.state.offset > 10 ? (
          <View style={[styles.sortScrollArrow, styles.left]}>
            <PBTouchable onPress={() => this.changeScrollPosion(1)}>
              <View style={[styles.sortScrollArrow, styles.left]}>
                <IonIcon
                  name={"chevron-back"}
                  size={20}
                  color={"#464647"}
                />
              </View>
            </PBTouchable>
          </View>
        ) : (
          <View
            style={[
              styles.sortScrollArrow,
              styles.left,
              { backgroundColor: "transparent" },
            ]}
          />
        )}

        <View style={[styles.sortStripContainerInner]}>
          <ScrollView
            ref={(ref) => {
              this.scroll = ref;
            }}
            horizontal={true}
            contentContainerStyle={{ width: `${33.33 * 5}%` }}
            showsHorizontalScrollIndicator={false}
            // scrollEventThrottle={dimensions.vw * 33.3}
            decelerationRate="fast"
            pagingEnabled
            onScroll={this.onScroll}
          >
            {CommonService.capsuleMenuIcons.map((val, key) => (
              <View
                style={{ ...styles.viewFlex, ...styles.sortItem }}
                key={key}
              >
                <PBTouchable onPress={() => props.onSort(key)}>
                  <View style={styles.sortItemInner}>
                    <View
                      style={[
                        styles.iconView,
                        props.activeTab == key && val.iconActive
                          ? styles.whitebg
                          : null,
                      ]}
                    >
                      <Image
                        height={16}
                        source={
                          props.activeTab == key && val.iconActive
                            ? val.iconActive
                            : val.icon
                        }
                      />
                    </View>
                    <PBText
                      style={{
                        ...commonStyles.colorWhite,
                        ...styles.sortText,
                      }}
                    >
                      {val.label}
                    </PBText>
                    <SortIcon
                      sortType={props.sortType}
                      showIcon={props.sortFeild == val.sortFeild}
                    />
                  </View>
                </PBTouchable>
              </View>
            ))}
          </ScrollView>
        </View>
        {this.state.offset <= 10 ? (
          <View style={[styles.sortScrollArrow, styles.right]}>
            <PBTouchable onPress={() => this.changeScrollPosion(2)}>
              <View style={[styles.sortScrollArrow, styles.right]}>
                <IonIcon
                  name={"chevron-forward"}
                  size={20}
                  color={"#464647"}
                />
              </View>
            </PBTouchable>
          </View>
        ) : (
          <View
            style={[
              styles.sortScrollArrow,
              styles.right,
              { backgroundColor: "transparent" },
            ]}
          />
        )}
      </View>
    );
  }
}

const SortIcon = (props) => {
  return props.showIcon ? (
    <Image
      source={require("../assets/icons/sort-arrow.png")}
      style={{
        transform: [{ rotate: props.sortType == "ASC" ? "0deg" : "180deg" }],
      }}
      height={16}
    />
  ) : null;
};

const styles = StyleSheet.create({
  paddingLeft: {
    paddingLeft: 50,
  },
  paddingLeftLess: {
    paddingLeft: 15,
  },
  paddingRight: {
    paddingRight: 30,
  },
  sortScrollArrow: {
    width: 30,
    height: 30,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    // backgroundColor: "$secondaryBG",
  },
  left: {left: 4},
  right: {right: 4},
  sortStripContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    // borderRadius: 15,
    // marginHorizontal: dimensions.vw * 5,
    overflow: 'hidden',
    width: dimensions.vw * 100,
    paddingLeft: 35,
    paddingRight: 35,
  },
  sortStripContainerInner: {
    flex: 1,
    flexDirection: 'row',
  },
  sortItemInner: {
    flex: 1,
    paddingTop: dimensions.vw * 2,
    paddingBottom: dimensions.vw * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "$secondaryBG",
  },
  sortItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#20153D',
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 20,
  },
  sortText: {
    fontSize: 12,
    marginRight: 4,
  },
  viewFlex: {
    // width: (dimensions.vw * 100 - 100) / 3,
    width: `${19.6}%`,
    alignItems: 'center',
  },
  iconView: {
    marginRight: 5,
    padding: 2,
  },
  whitebg: {
    backgroundColor: '#fff',
    borderRadius: 10,
    // height:26,
    width: 20,
    // width:Platform.OS ==='ios' ? dimensions.vw*8: null
  },
});

export default SortStripCapsules;
