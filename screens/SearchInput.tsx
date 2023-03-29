import React from 'react';
import {
    TextInput,
    StyleSheet
} from 'react-native';

interface SearchInputProps {
    value: string;
    onChangeText: (text: string) => void
    isVisible: boolean;
}


const SearchInput = (props: SearchInputProps) => {
    if (!props.isVisible) {
        return null;
    }
    return (
        <TextInput
            placeholder={"Enter user name"}
            value={props.value}
            keyboardAppearance="light"
            returnKeyType="done"
            keyboardType="default"
            style={styles.textContainerStyle}
            onChangeText={props.onChangeText}
            clearButtonMode={"always"}
        />
    )
}

export default SearchInput;

const styles = StyleSheet.create({
    textContainerStyle: {
        marginBottom: 0,
        paddingHorizontal: 4,
        marginTop: 16,
        height: 32,
        backgroundColor: "#d6d6d6",
        borderRadius: 8
    },
})