// CabinList.jsx
import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import CabinCard from "./CabinCard";

/**
 * Component hiển thị danh sách Cabin đã được load và filter sẵn.
 * @param {Object[]} props.cabins — Mảng cabin sau khi đã lọc theo filter.
 */
export default function CabinList({ cabins }) {
  // Nếu không có cabin nào, return null để không render FlatList
  if (!cabins || cabins.length === 0) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={cabins}
        renderItem={({ item }) => <CabinCard cabin={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        // Tắt scroll để component cha điều khiển scroll nếu cần
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 8,
  },
  listContainer: {
    paddingBottom: 32,
    paddingRight: 5,
    marginBottom: 30,
    // Khoảng cách giữa các phần tử
    gap: 20,
  },
});
