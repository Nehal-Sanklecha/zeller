import React, { useMemo, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useQuery } from '@apollo/client';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { CustomersByUserRole, RootStackParamList, ZellerCustomer } from '../utils/types';
import { List_Zeller_Customers } from '../utils/query';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import SearchInput from './SearchInput';

export type Props = NativeStackScreenProps<RootStackParamList, 'List'>;

const UserScreen = ({ navigation }: Props) => {
    const [selectedUserRole, setSelectedUserRole] = useState<string>("");
    const [value, setValue] = useState<string>("");

    const {loading, refetch, data:{listZellerCustomers: {items = []} = {}} = {}} = useQuery(List_Zeller_Customers);

    const userTypes: string[] | null = useMemo(() => {
      if (items) {
        const roles: string[] = items.map((item: ZellerCustomer) => item.role)
        return Array.from(new Set(roles)).sort()
      }
      return null;
    }, [items])
  
  
    const separatedUsersByRole = useMemo(() => {
      return items.reduce?.(
          (acc: CustomersByUserRole, user: ZellerCustomer) => {
            if (!acc[`${user.role}`]) {
              acc[user.role] = [];
            }
            acc[user.role].push(user);
            return acc;
          }, {}
      );
    }, [items]);
  
    const renderUserTypes = () => {
      if (!userTypes) {
        return null;
      }
      return userTypes.map((item) => {
        const isSelected = item === selectedUserRole;
        return (
          <TouchableOpacity
            style={isSelected ? styles.selectedRow: styles.unselectedRow}
            onPress={() => setSelectedUserRole(item)}
            key={item}
          >
            <MaterialIcons
                color={"#0B5AC2"}
                size={24}
                name={isSelected ? "radio-button-checked" : "radio-button-unchecked"}
            />
            <Text style={styles.sectionRow}>{item}</Text>
          </TouchableOpacity>
        )
      })
    }
  
    const renderUserNameRole = ({item}: {item: ZellerCustomer}) => {
      return (
        <TouchableOpacity
            style={{flexDirection: "row", paddingVertical: 8}}
            key={item.id}
            onPress={() => navigation.navigate('Details', {
                id: item.id
            })}
        >
          <View style={styles.box}>
            <Text style={styles.firstLetter}>{item.name.charAt(0)}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.firstLine}>{item.name}</Text>
            <Text style={styles.secondLine}>{item.role}</Text>
          </View>
        </TouchableOpacity>
      )
    }
  
    const renderUsers = () => {
      const users = separatedUsersByRole[selectedUserRole]
  
      if (users?.length > 0) {
        return (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}> {selectedUserRole} Users </Text>
                {users.map((item: ZellerCustomer) => renderUserNameRole({item}))}
          </View>
        )
      }
      return null;
    }

    const filteredUser = useMemo(() => {
        if (!!value) {
            return items.filter((i: ZellerCustomer) => i.name.toLowerCase().includes(value.toLowerCase()))
        }
        return items
    }, [items, value])
  
    if (loading) {
      return <ActivityIndicator size={"large"} color={"#0B5AC2"} />
    }
    
    if (!!value) {
        return(
            <View style={styles.container}>
                <SearchInput
                    value={value}
                    onChangeText={(text) => setValue(text)}
                    isVisible={true}
                />
                <FlatList 
                    data={filteredUser}
                    renderItem={renderUserNameRole}
                    keyExtractor={(item) => item.id}
                />
            </View>
        )
    }
  
    return (
        <ScrollView
            refreshControl={<RefreshControl
                colors={["#0B5AC2"]}
                tintColor={"#0B5AC2"}
                refreshing={loading}
                onRefresh={() => refetch()}
            />}
        >
        <View style={styles.container}>
            <SearchInput
                value={value}
                onChangeText={(text) => setValue(text)}
                isVisible={!!selectedUserRole || !!value}
            />
            <View style={styles.section}>
                <Text style={styles.sectionTitle}> User Types </Text>
                {renderUserTypes()}
            </View>
            {renderUsers()}
        </View>
        </ScrollView>
    )
  }

  export default UserScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
    },
    textContainerStyle: {
        flex: 1,
        marginBottom: 0,
        paddingHorizontal: 4,
        marginHorizontal: 16,
        marginTop: 16,
        height: 32,
        backgroundColor: "#d6d6d6",
        borderRadius: 8
    },
    section: {
      marginTop: 16,
      paddingBottom: 24,
      borderBottomColor: "#e6e6e6",
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      paddingBottom: 8,
    },
    sectionRow: {
      fontSize: 14,
      fontWeight: '400',
      paddingHorizontal: 8
    },
    selectedRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
      backgroundColor: "#E3EFFA",
      padding: 8,
      borderRadius: 6
    },
    unselectedRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 4,
      padding: 8
    },
    box: {
      backgroundColor: "#E3EFFA", 
      width: 40, 
      height: 40,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 16
    },
    firstLetter: {
      color: "#0B5AC2",
      fontSize: 18,
    },
    rowContainer: {
      justifyContent: 'space-evenly'
    },
    firstLine: {
      fontSize: 14,
      fontWeight: "400"
    },
    secondLine: {
      color: "#b0b0b0",
      fontSize: 14,
    }
  });
    