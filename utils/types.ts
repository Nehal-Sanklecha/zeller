import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface ZellerCustomer {
  id: string
  name: string
  email: string
  role: string
};

export interface CustomersByUserRole {
  [key: string]: ZellerCustomer[];
}

export type RootStackParamList = {
  List: undefined;
  Details: { id: string };
};
