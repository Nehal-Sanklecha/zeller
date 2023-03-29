import { useQuery } from '@apollo/client';
import React, { useMemo, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Get_Zeller_Customer } from '../utils/query';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/types';

type Props = NativeStackScreenProps<RootStackParamList, 'Details'>;
const UserDetails = ({route}: Props) => {
    const { id } = route.params;
    const {data:{getZellerCustomer: customer = {}} = {}, loading, error} = useQuery(Get_Zeller_Customer, {
        variables: { getZellerCustomerId: id },
      });

    const renderUserDetails = (label: string, value: string) => {
        return (
            <View style={{flexDirection: "row"}}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.detail}>{value}</Text>
            </View>
        )
    }
    if (loading) {
        return <Text>Fetching data...</Text>
    }

    return (
        <View style={styles.container}>
            {renderUserDetails("Name", customer.name)}
            {renderUserDetails("Email", customer.email)}
            {renderUserDetails("Role", customer.role)}
        </View>
    )
}

export default UserDetails;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
    },
    label: {
        fontSize: 14,
        fontWeight: "800",
        marginVertical: 4,
        color: "#0B5AC2",
        marginRight: 8
    },
    detail: {
        fontSize: 14,
        fontWeight: "600",
        marginVertical: 4,
        color: "#0B5AC2",
    }
});