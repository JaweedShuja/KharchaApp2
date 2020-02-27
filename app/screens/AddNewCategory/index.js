import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import firebase from '../../../firebase.js'
 
class AddNewCategory extends Component {
    static navigationOptions = {
        header:null,
    }
    state = {
        email:'',
    }
    componentDidMount(){
        const { currentUser } = firebase.auth()
    
        this.setState({
          email:currentUser.email  
        })
      }
    AddIncome(name){

        
        // Firebase.auth().sendPasswordResetEmail(email)
        // .then(function (user) {
        //     Alert.alert('Please check your email...')
        // }).catch(function (e) {
        //     Alert.alert(e.message)
        // })
        
        var str = this.state.email.toUpperCase();
                        var res = str.replace('.','DOT')

        var expenseCategoryID = firebase.database().ref('Otherdetails/'+res).push().getKey();
                                
                          firebase.database().ref('Otherdetails/'+res).child(expenseCategoryID).set({
                              expenseCategoryID,
                              expenseCategoryName:name,
                              expenseCategoryAmount:0
                              
                          }).then((data) => {
                              Alert.alert('Added','New Category Has Been Added !')
                          }).catch((error) => {
                            Alert.alert('Error','There is Some Error')
                        })

    }
    
    state = {
        name:'',   
    }
   render() {
       return (
           <View style={styles.container}>

            <View style={[styles.txtView, {height:50, alignItems:'center', justifyContent:'center'}]}>
                <Text style={{fontSize:20, color:'#00e676', fontWeight:'bold'}}>
                    New Category
                </Text>
             </View>

             <Text style={styles.overViewText}>
              Category Name
          </Text>

              <View style={styles.textInputView}>

                {/* <View style={styles.imageView}>
                    <Image 
                        style={styles.textInputImg}
                        source={require('../../images/email.png')}
                    />

                </View> */}

                <View style={styles.fieldView}>
                    <TextInput
                        style={styles.textInputField}
                        
                        placeholder='Category Name'
                        onChangeText={name => this.setState({
                            name:name
                        })}
                    /> 
                </View>
            </View>
            <View style={styles.line}>

            </View>


            <View style={{flexDirection:'row', margin:10, alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity
            onPress={
                () => this.AddIncome(this.state.name)
            }
             style={ [styles.txtButton, {backgroundColor:'#00e676'}]}>
            <Text style={{fontSize:20, color:'white'}}>
                        ADD
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Statistics')}
             style={ [styles.txtButton, {backgroundColor:'#ff1744'}]}>
            <Text style={{fontSize:20, color:'white'}}>
                        BACK
                    </Text>
</TouchableOpacity>
            </View>
        </View>
        )
    }
}

export default AddNewCategory

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ace9f7',
    },
    textInputView:{
        backgroundColor:'white',
        marginTop:10,
        borderRadius:5,
        marginLeft:20,
        marginRight:20,
        height:50,
        alignSelf:'center',
        flexDirection:'row',
    },
    imageView:{
        flex:1,
        //backgroundColor:'blue',
        alignItems:'center',
        justifyContent:'center',
    },
    textInputImg:{
        height:25,
        width:25,
    },
    fieldView:{
        flex:4,
        //alignItems:'center',
        //marginLeft:10,
        justifyContent:'center',
        //backgroundColor:'red'
    },
    textInputField:{
        color:'#52aec2',
        fontSize:18,
        marginLeft:10,
    },
    txtView:{
        backgroundColor:'white',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        borderRadius:5,
    },
    txtButton:{
        height:50,
        width:150,
        //backgroundColor:'white',
        margin:10,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    },
    overViewText:{
        fontSize:15,
        fontWeight:'bold',
        marginLeft:20,
        marginRight:20,
        color:'#3b99af',
        marginTop:30,
      },
      line:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginLeft:20,
        marginRight:20,
      },  
})