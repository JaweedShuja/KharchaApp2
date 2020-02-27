import React, {Component} from 'react';
import {
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Button, 
  TouchableOpacity, 
  Image,
  ScrollView,
  Alert,
  Linking,
  ActivityIndicator
} from 'react-native';
//import CheckBox from '@react-native-community/checkbox';
import firebase from '../../../firebase.js'

export default class Login extends Component{
    state = {
      email:'',
      password:'',
      loader: false,
    }

    static navigationOptions = {
        header: null
    }
    
    handlelogin = () =>  {
      
      const { email, password } = this.state
      if(email == "" || password == ""){
        Alert.alert('Login Failed', 'Fields Cannot Be Empty')
      }
      else{

        this.setState({
          loader:true,
        })


        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            global.LoginEmail = email;
            this.props.navigation.navigate('Dashboard')
            this.setState({
              loader:false,
            })
          })
          .catch(
            (error) => {
              this.setState({
                loader:false,
              })
  
              Alert.alert('Login Error',error.message)
            }
          )
          
      }
    }
  render(){
    return(
      <ScrollView
        style={styles.container}
       showsVerticalScrollIndicator={false} >

                  <Text
                    style={styles.titleText}>
                        خرچا</Text>

            

            <ActivityIndicator style={{height:50, width:50, alignSelf:'center' }} size="large" animating={this.state.loader} />

            <Text style={{alignSelf:'center', color:'#2e7d32'}}>
              LOGIN HERE
            </Text>

<View style={styles.fieldViewMain}>

         

    <View style={styles.textInputView}>

        <View style={styles.imageView}>
          <Image 
            style={styles.textInputImg}
            source={require('../../images/email.png')}
          />

        </View>

        <View style={styles.fieldView}>
          <TextInput
            style={styles.textInputField}
            
            placeholder='Email Address'
            onChangeText={email => this.setState({email})}
          /> 
        </View>


    </View>
    <View style={styles.line}>

    </View>

    <View style={styles.textInputView}>

        <View style={styles.imageView}>
          <Image 
            style={styles.textInputImg}
            source={require('../../images/pass.png')}
          />

        </View>

        <View style={styles.fieldView}>
          <TextInput
            style={styles.textInputField}
            
            secureTextEntry={true}
            placeholder='Password'
            onChangeText={password => this.setState({password})}
          /> 
        </View>
    </View>
    <View style={styles.line}>

    </View>



</View>

    <TouchableOpacity
    onPress={() => this.props.navigation.navigate('ForgotPassword')} 
    >
        <Text style={styles.forgotTxt}>
          Forgot Password 
        </Text>
    </TouchableOpacity>

    <TouchableOpacity 
    //onPress={() => this.props.navigation.navigate('Dashboard')}
    onPress={this.handlelogin}
    style={styles.btnLogin}>
      <Text  style={{fontSize:20, color:'white'}}>
        LOGIN
      </Text>

    </TouchableOpacity>

    

    <View style={styles.btnSignupView}>
        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('SignUp')} 
        style={styles.btnSignup}>

        {/* <Image
        style={styles.btnImage2}
        source={require('../../images/Singup.png')}/> */}

        <Text style={{fontSize:20, color:'white'}}>
          CREATE ACCOUNT
        </Text>
        </TouchableOpacity>

    </View>

    <View style={{flex:1, alignItems:'center', justifyContent:'center', marginTop:40,}}>
                    <Text>Created By</Text>

<View style={{flexDirection:'row'}}>
    <Image
        style={{height:28, width:28,}}
        source={require('../../images/linkedin.png')}
    />
    <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:20, textDecorationLine:'underline', color:'blue', marginLeft:10,}} onPress={ ()=> Linking.openURL('https://www.linkedin.com/in/jaweed-shuja-uddin-09482317b/') } >Jaweed Shuja-Uddin</Text>
    </View>


</View>
                    </View>


      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    //backgroundColor:'#ace9f7',
    flex:1,
    backgroundColor:'#ace9f7',
    width: '100%',
    height: '100%',
  },  
  titleText:{
    fontSize:100,
    alignSelf:'center',
    marginTop:10,
    color:'#304ffe',
  },
  titleDesText:{
    alignSelf:'center',
    backgroundColor:'#f66f55',
    color:'white',
    borderRadius:30,
    //padding:5,
    paddingTop:5,
    paddingBottom:5,
    paddingLeft:10,
    paddingRight:10,
    fontWeight:'bold',
  },
  loginText:{
    fontSize:15,
    fontWeight:'bold',
    marginTop:10,
    marginLeft:10,
  },
  textInputView:{
    backgroundColor:'white',
    marginTop:10,
    borderRadius:5,
    marginLeft:30,
    marginRight:30,
    height:50,
    alignSelf:'center',
    flexDirection:'row',
  },
  line:{
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginLeft:30,
    marginRight:30,
  },
  btnLogin:{
    height:50,
    width:300,
    backgroundColor:'#00e676',
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    marginTop:30,
  },
  btnSignup:{
    height:50,
    width:250,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,
    marginTop:20,
    backgroundColor:'#00b0ff'
  },  

  btnText:{ 
    fontSize:15,
  },
  contentView: {
    paddingLeft: 10,
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  content: {
    fontSize:20,
    color:'#ff502b',
  },
  textInputImg:{
    height:25,
    width:25,
    
  },
  textInputField:{
    color:'#52aec2',
    fontSize:18,
  },
  imageView:{
    flex:1,
    //backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
  },
  fieldView:{
    flex:4,
    //alignItems:'center',
    //marginLeft:10,
    justifyContent:'center',
    //backgroundColor:'red'
  },
  fieldViewMain:{
    marginTop:20,
  },
  forgotTxt:{
    fontWeight:'bold',
    color:'#3b99af',
    marginLeft:30,
    marginTop:20,
    textDecorationLine: 'underline',
    
  },
  btnImage:{
    height:55,
    width:320,
    borderRadius:30, 
  },
  btnImage2:{
    height:55,
    width:250,
    borderRadius:30, 
  },
  CheckBoxView:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    //backgroundColor:'blue',
    width:210,
    alignSelf:'center',
    marginTop:10,
  },
  cBox:{
    
  },
  cBoxText:{
   textAlign:'right',
   fontWeight:'bold',
   color:'#3b99af',
  },
  btnSignupView:{
    //height:140,
    //backgroundColor:'blue',
    alignItems:'center',
    justifyContent:'center',
  }
});