import React, {Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack'

import Login from './app/screens/Login'
import SignUp from './app/screens/SignUp'
import Dashboard from './app/screens/Dashboard'
import Activities from './app/screens/Activities'
import AddIncome from './app/screens/AddIncome'
import AddExpense from './app/screens/AddExpense'
import Statistics from './app/screens/Statistics'
import Savings from './app/screens/Savings'
import Loading from './app/screens/Loading'
import Income from './app/screens/Income'
import ForgotPassword from './app/screens/ForgotPassword'
import ExpenseTypeView from './app/screens/ExpenseTypeView'
import AddNewCategory from './app/screens/AddNewCategory'

const RootStack = createStackNavigator(
  {
    Login: {
      screen: Login
    },
    SignUp: {
      screen: SignUp
    },
    Dashboard: {
      screen: Dashboard
    },
    Activities: {
      screen: Activities
    },
    AddIncome: {
      screen: AddIncome
    },
    AddExpense:{
      screen: AddExpense 
    },
    Statistics:{
      screen: Statistics
    },
    Savings:{
      screen: Savings
    },
    Loading:{
      screen: Loading
    },
    Income:{
      screen: Income
    },
    ForgotPassword:{
      screen: ForgotPassword
    },
    ExpenseTypeView:{
      screen: ExpenseTypeView
    },
    AddNewCategory:{
      screen: AddNewCategory 
    }
  },
  {
    initialRouteName: 'Loading'
  }

);

class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

export default createAppContainer(RootStack);