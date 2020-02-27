import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput,TouchableOpacity, Alert } from 'react-native'
import firebase from '../../../firebase.js'

import OptionGroup from 'react-native-optiongroup';
 
class AddIncome extends Component {
    AddIncome(incomeType,incomeAmount, incomeAddBy, incomeDate){
        if(incomeType != ''){
            if(incomeAmount != ''){
                var str = incomeAddBy.toUpperCase();
                var res = str.replace('.','DOT')

                var incomeID = firebase.database().ref('income/'+res).push().getKey();
                
                firebase.database().ref('income/'+res).child(incomeID).set({
                   incomeID,
                   incomeAmount,
                   incomeType,
                   incomeDate,
                   incomeAddBy,
                    
                }).then((data) => {
                    Alert.alert('Added','Income has been successfully added !')

                    var detailsID = this.state.DATA[0].detailsID
                    var income = (parseInt(this.state.DATA[0].income) + parseInt(incomeAmount))
                    var expense = parseInt(this.state.DATA[0].expense)
                    var bank = parseInt(this.state.DATA[0].bank)
                    var cash = parseInt(this.state.DATA[0].cash)
                    var other = parseInt(this.state.DATA[0].other)   

                    var bank;
                    var cash;
                    var other;  
                    if(incomeType == 'Bank'){
                        bank = (parseInt(this.state.DATA[0].bank) + parseInt(incomeAmount))
                    }
                    else if(incomeType == 'Cash'){
                        cash = (parseInt(this.state.DATA[0].cash) + parseInt(incomeAmount))
                    }   
                    else if(incomeType == 'Other'){
                        other = (parseInt(this.state.DATA[0].other) + parseInt(incomeAmount))
                    }
                    

                    firebase.database().ref('details/'+res).child(detailsID).set({
                        detailsID,
                        income,
                        expense,
                        bank,
                        cash,
                        other
                    })
                }).catch((error) => {
                    Alert.alert('error',error.message);
                })

                //Alert.alert('income', incomeAmount + "+" + incomeType + "+" + res + "+" +incomeDate);
            }
            else{
                Alert.alert('Alert','Please Insert Amount');
            }
        }
        else{

            Alert.alert('Alert','Please Select Income Type');
        }
    }
    
    static navigationOptions = {
        header: null
      }
      state = {
          incomeType:'',
          incomeAmount:'',
          incomeAddBy:global.LoginEmail,
          incomeDate:Date,
          DATA:[],
      }
      componentDidMount(){

        // const { currentUser } = firebase.auth()
        // this.setState({  
        //     incomeAddBy:currentUser.email
        //  })

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = dd + '/' + mm + '/' + yyyy;
        this.setState({
            incomeDate:today
        })

        this.getValues(this.state.incomeAddBy);
      }
      getValues(email){
        var str = email.toUpperCase();
        var res = str.replace(".","DOT");
    
        const activityRef = firebase.database().ref('details').child(res);
    
        activityRef.on('value', (snapshot) => {
    
          let items = snapshot.val();
          let newState = [];
    
          for(let item in items){
            newState.push({
              detailsID: items[item].detailsID,
              income: items[item].income,
              expense: items[item].expense,
              bank: items[item].bank,
              cash: items[item].cash,
              other: items[item].other,
              
              
              
            });
          }
         
          this.setState({
            DATA: newState
          });
    
        });
    }
   render() {
       return (
           <View style={styles.container}>
             

             <View style={[styles.txtView, {height:50, alignItems:'center', justifyContent:'center'}]}>
             <Text style={{fontSize:20, color:'#00e676', fontWeight:'bold'}}>
                        Add Income
                    </Text>
             </View>
            <View style={[styles.txtView, {height:100,}]}>
                <Text style={styles.txtViewText}>
                    Add Income to
                </Text>

                <OptionGroup
                    options={[
                        {
                            'answerResult': 'Bank',
                            'label': 'Bank'
                        },
                        {
                            'answerResult': 'Cash',
                            'label': 'Cash'
                        },
                        {
                            'answerResult': 'Other',
                            'label': 'Other'
                        },
                    ]}
                    useLabelValue={'label'}
                    useKeyValue={'answerResult'}
                    //onChange={(value) => Alert.alert(value.toString())}
                    onChange={(value) => this.setState({
                        incomeType:value
                    })}
                    style={{backgroundColor:'white', margin:10}}
                />
            </View> 

            <View style={[styles.txtView, {height:90,}]}>
                <Text style={styles.txtViewText}>
                    Amount
                </Text>

                <TextInput
                    onChangeText={
                        (amount) => this.setState({
                            incomeAmount:amount,
                        })
                    }
                    style={styles.txtTextBox}
                    keyboardType={"numeric"}
                />
            </View>

                    <View style={{flexDirection:'row', margin:10, alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity
            onPress={
                () => this.AddIncome(this.state.incomeType,this.state.incomeAmount, this.state.incomeAddBy, this.state.incomeDate)
            }
             style={ [styles.txtButton, {backgroundColor:'#00e676'}]}>
            <Text style={{fontSize:20, color:'white'}}>
                        ADD
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Dashboard')}
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

export default AddIncome

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#a8e8fa',
        flex:1,
    },
    txtView:{
        
        backgroundColor:'white',
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        borderRadius:5,
    },
    txtViewText:{
        fontSize:15,
        fontWeight:'bold',
        marginLeft:10,
        color:'#3b99af',
        marginTop:5,
    },
    txtTextBox:{
        backgroundColor:'whitesmoke',
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        fontSize:25,
        color:'#00e676',
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
});