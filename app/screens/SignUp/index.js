import React , {Component} from 'react';
import {View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
import firebase from '../../../firebase.js';

export default class SignUp extends Component{
    static navigationOptions = {
        header: null
    }

    state = {
      email:'',
      password:'',
      passwordAgain:'',
      errorMessage:'',

      income:0,
      expense:0,
      bank:0,
      cash:0,
      other:0,

      EatingOut:0,
      Education:0,
      Grocery:0,
      Medical:0,
      Personal:0,
      Other:0,

    }

    

    handleSignUp = (income, expense, bank, cash, other, EatingOut, Education, Grocery, Medical, Personal, Other) => {
     // Alert.alert("Message",this.state.email+" "+this.state.password+ " "+this.state.passwordAgain)

      if(this.state.password != this.state.passwordAgain){
        Alert.alert("Message","Password not match")
      }
      else{
        
        firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(
          () => {
            

            var str = this.state.email.toUpperCase();
            var res = str.replace('.','DOT')
    
            var detailsID = firebase.database().ref('details/'+res).push().getKey();
                    
                    firebase.database().ref('details/'+res).child(detailsID).set({
                       detailsID,
                       income,
                       expense,
                       bank,
                       cash,
                       other
                        
                    }).then((data) => {
                        var str = this.state.email.toUpperCase();
                        var res = str.replace('.','DOT')

                        var names = ['EatingOut', 'Education', 'Grocery', 'Medical', 'Personal', 'Other'];
              
                      for(let i = 0; i < 6; i++){
                          var expenseCategoryID = firebase.database().ref('Otherdetails/'+res).push().getKey();
                                
                          firebase.database().ref('Otherdetails/'+res).child(expenseCategoryID).set({
                              expenseCategoryID,
                              expenseCategoryName:names[i],
                              expenseCategoryAmount:0
                              
                          }).then((data) => {
                              //Alert.alert('Added','Income has been successfully added !')
                          }).catch((error) => {
                                  
                        })
                      } 

                        
                    }).catch((error) => {
                      
                    })

            this.props.navigation.navigate('Login')        
          })
        .catch(error => Alert.alert("Sign Up Faild", error.message))

        
      }
    }

  render(){
    return(
      <View style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false}>

        <View style={[styles.txtView, {height:50, alignItems:'center', justifyContent:'center'}]}>
            <Text style={{fontSize:20, color:'#00e676', fontWeight:'bold'}}>
                Create Account
            </Text>
        </View>

        <Text style={styles.overViewText}>
              Account Info
        </Text>

        <View style={styles.textBoxView}>

            <View style={styles.textBoxImageView}>

                <Image
                  style={styles.textBoxImage}
                  source={require('../../images/email.png')}
                />

            </View>

            <View style={styles.textBoxInputView}>
                <TextInput
                  style={styles.textBoxInput}
                  placeholder='Email Address'
                  onChangeText={email => this.setState({email})}
                />
            </View>

            

        </View>
        <View style={styles.line}>

        </View>

        <View style={styles.textBoxView}>


            <View style={styles.textBoxImageView}>

                <Image
                  style={styles.textBoxImage}
                  source={require('../../images/pass.png')}
                />

            </View>

            <View style={styles.textBoxInputView}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.textBoxInput}
                  placeholder='Password'
                  onChangeText={password => this.setState({password})}
                />
            </View>

            

        </View>
        <View style={styles.line}>

        </View>

        <View style={styles.textBoxView}>

            <View style={styles.textBoxImageView}>

                <Image
                  style={styles.textBoxImage}
                  source={require('../../images/pass.png')}
                />

            </View>

            <View style={styles.textBoxInputView}>
                <TextInput
                  secureTextEntry={true}
                  style={styles.textBoxInput}
                  placeholder='Re-Enter Password'
                  onChangeText={passwordAgain => this.setState({passwordAgain})}
                />
            </View>

        </View>
        <View style={styles.line}>

        </View>

        <TouchableOpacity

          onPress={() => {
              this.handleSignUp(this.state.income, this.state.expense, this.state.bank, this.state.cash, this.state.other, this.state.EatingOut, this.state.Education, this.state.Grocery, this.state.Medical, this.state.Personal, this.state.Other)
            }
          }

        style={{
            height:55,
            width:215,
            alignSelf:'center',
            marginTop:20,
            backgroundColor:'#00e676',
            alignItems:'center',
            justifyContent:'center',
            borderRadius:5,
          }}>
            <Text style={{fontSize:20, color:'white'}}>
              SIGN UP
            </Text>
        

        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Login')}

          style={{
            height:55,
            width:215,
            alignSelf:'center',
            backgroundColor:'#00b0ff',
            marginTop:10,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:5,
          }}
        >
        <Text style={{fontSize:20, color:'white'}}>
              GO TO LOGIN
            </Text>
        </TouchableOpacity>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#a8e8fa',
  },
  contentContainer: {
    paddingVertical: 20
  },
  signupView:{
    height:70,
    backgroundColor:'#268ea6',
    margin:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },
  signupText:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
  },
  textBoxView:{
    height:50,
    backgroundColor:'white',
    marginTop:10,
    marginLeft:30,
    marginRight:30,
    borderRadius:5,
    flexDirection:'row',
   // width:310,
    alignSelf:'center'

  },
  textBoxImageView:{
    flex:1,
    //backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
  },
  textBoxImage:{
    height:25,
    width:25,
  },  
  textBoxInputView:{
    flex:5,
    //backgroundColor:'red',
    
  },
  textBoxInput:{
    color:'#52aec2',
    fontSize:18,
  },
  signupBtn:{
    height:55,
    width:215,
    //alignSelf:'center',
    //marginTop:20,
  },
  alreadyMemBtn:{
    height:55,
    width:330,
    //alignSelf:'center',
    //marginTop:10,
  },
  pInfoView:{
    height:20,
    width:100,
    backgroundColor:'#f7e61d',
    marginLeft:20,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
  },
  txtView:{
    backgroundColor:'white',
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    borderRadius:5,
  },
  overViewText:{
    fontSize:15,
    fontWeight:'bold',
    marginLeft:30,
    color:'#3b99af',
    marginTop:15,
  },
  line:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft:30,
    marginRight:30,
  },
})