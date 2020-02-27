import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput,TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native'
//import { Select, Option } from 'react-native-select-lists';
import RNPickerSelect from 'react-native-picker-select';
import OptionGroup from 'react-native-optiongroup';
import firebase from '../../../firebase.js'

class AddExpense extends Component {
    AddExpense(expenseAmount, expenseType, expenseFrom, expenseNote, expenseDate, expenseAddBy){
        //if(expenseAmount != '' || expenseType != '' || expenseFrom != '' || expenseNote != ''){
           
        
           if(expenseType != ''){
              if(expenseFrom != ''){
                 if(expenseAmount != ''){
                    if(expenseNote != ''){
                        ///
                        var check = false;
                        var message = ''
            
                        var _bank = parseInt(this.state.DATA[0].bank)
                        var _cash = parseInt(this.state.DATA[0].cash)
                        var _other = parseInt(this.state.DATA[0].other) 
                    if(expenseFrom == 'Bank'){
                        if(parseInt(expenseAmount)  <= _bank){
                            check = true;
                        }
                        else{
                            message = 'Bank'
                        }
                    }
                    else if(expenseFrom == 'Cash'){
                        if(parseInt(expenseAmount)  <= _cash){
                            check = true;
                        }
                        else{
                            message = 'Cash'
                        }
                    }
                    else if(expenseFrom == 'Other'){
                        if(parseInt(expenseAmount) <= _other){
                            check = true;
                        }
                        else{
                            message = 'Other'
                        }
                    }
                    ///
                    if(check == true){

                        var str = expenseAddBy.toUpperCase();
            var res = str.replace('.','DOT')

            var expenseID = firebase.database().ref('expense/'+res).push().getKey();

            firebase.database().ref('expense/'+res).child(expenseID).set({
                expenseID,
                expenseAmount,
                expenseType,
                expenseFrom,
                expenseNote,
                expenseDate,
                expenseAddBy
             }).then((data) => {
                 Alert.alert('Added','Expense has been successfully added !')

                 var detailsID = this.state.DATA[0].detailsID
                 var income = parseInt(this.state.DATA[0].income)
                 var expense = (parseInt(this.state.DATA[0].expense) + parseInt(expenseAmount))
                 var bank = parseInt(this.state.DATA[0].bank)
                 var cash = parseInt(this.state.DATA[0].cash)
                 var other = parseInt(this.state.DATA[0].other)   
                    if(expenseFrom == 'Bank'){
                        bank = (parseInt(this.state.DATA[0].bank) - parseInt(expenseAmount))
                    }
                    else if(expenseFrom == 'Cash'){
                        cash = (parseInt(this.state.DATA[0].cash) - parseInt(expenseAmount))
                    }   
                    else if(expenseFrom == 'Other'){
                        other = (parseInt(this.state.DATA[0].other) - parseInt(expenseAmount))
                    }
                    firebase.database().ref('details/'+res).child(detailsID).set({
                        detailsID,
                        income,
                        expense,
                        bank,
                        cash,
                        other
                    }).then((data) => {

                        var expenseCategoryID;
                        var expenseCategoryName;
                        var expenseCategoryAmount;

                        

                        for(let i = 0; i < this.state.DATA2.length; i++){
                            if(expenseType == this.state.DATA2[i].expenseCategoryName){
                                expenseCategoryID = this.state.DATA2[i].expenseCategoryID
                                expenseCategoryAmount = (parseInt(this.state.DATA2[i].expenseCategoryAmount) + parseInt(expenseAmount))
                                expenseCategoryName = this.state.DATA2[i].expenseCategoryName
                                
                            }
                        }
                        
                        
                        firebase.database().ref('Otherdetails/'+res).child(expenseCategoryID).set({
                            expenseCategoryID,
                            expenseCategoryName,
                            expenseCategoryAmount
                        })

                    }).catch((error) => {
                        Alert.alert(error.message)
                    })
             }).catch((error) => {
                 Alert.alert('error',error.message);
             })
            }
            else{
                Alert.alert('Insufficient Balance', 'You have not enough balance in '+message+'!')
            }
                    }
                    else{
                        Alert.alert('Please Insert Additional Note')
                    }  
                 }
                 else{
                     Alert.alert('Please Insert Amount')
                 }
              }
              else{
                Alert.alert('Please Select Expense From')
              }
           }
           else{
               Alert.alert('Please Select Expense Category');
           }
           

        //}
        //else{
        //    Alert.alert('Please provide complete details')
        //}
    }
    static navigationOptions = {
        header: null
      }
      state = {
          expenseAmount:'',
          expenseType:'',
          expenseFrom:'',
          expenseNote:'',
          expenseDate:'',
          expenseAddBy:global.LoginEmail,
          DATA:[],
          DATA2:[],
      }
      componentDidMount(){

        // const { currentUser } = firebase.auth()
        // this.setState({  
        //     expenseAddBy:currentUser.email
        //  })
        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        
        today = dd + '/' + mm + '/' + yyyy;
        this.setState({
            expenseDate:today
        })
        this.getValues(this.state.expenseAddBy);
        this.getOtherValues(this.state.expenseAddBy);
      }
      dateList = () => {

        const dataList = this.state.DATA2.map(x => ({
            label: x.expenseCategoryName,
            value: x.expenseCategoryName
          }))
        return dataList;
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
    getOtherValues(email){
        var str = email.toUpperCase();
        var res = str.replace(".","DOT");
    
        const activityRef = firebase.database().ref('Otherdetails').child(res);
    
        activityRef.on('value', (snapshot) => {
    
          let items = snapshot.val();
          let newState = [];
    
          for(let item in items){
            newState.push({
              expenseCategoryID:items[item].expenseCategoryID,
              expenseCategoryName:items[item].expenseCategoryName,  
              expenseCategoryAmount: items[item].expenseCategoryAmount,
            });
          }
         
          this.setState({
            DATA2: newState
          });
    
        });
    }
   render() {
       let categories = []
       for(let i = 0; i < this.state.DATA2.length; i++){
           categories.push(
            { label: this.state.DATA2.expenseCategoryName, value: this.state.DATA2.expenseCategoryName }
           )
       }
       return (
           <View style={styles.container}>
             
            <ScrollView>
             <View style={[styles.txtView, {height:50, alignItems:'center', justifyContent:'center'}]}>
             <Text style={{fontSize:20, color:'#ff1744', fontWeight:'bold'}}>
                        Add Expense
                    </Text>
             </View>
            <View style={[styles.txtView, {height:80,}]}>
                <Text style={styles.txtViewText}>
                    Expense Category
                </Text>

                    <View style={{marginLeft:10,marginRight:10, flex:1,alignItems:'center', justifyContent:'center'}}>
                
                
                <RNPickerSelect
                    placeholder={{
                        label: 'Select Expense Category...',
                        value: null,
                        color: 'red',
                    }}
                    items={this.dateList()}
                    onValueChange={(value) => this.setState({
                        expenseType:value
                    })}
                    style={styles.dropDown}
                />


                    </View>
              
            </View> 

            <View style={[styles.txtView, {height:100,}]}>
                <Text style={styles.txtViewText}>
                    Expense From
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
                        expenseFrom:value
                    })}
                    style={{backgroundColor:'white', margin:10}}
                />
            </View> 

            <View style={[styles.txtView, {height:90,}]}>
                <Text style={styles.txtViewText}>
                    Amount
                </Text>

                <TextInput
                keyboardType={"numeric"}
                onChangeText={
                    (amount) => this.setState({
                        expenseAmount:amount,
                    })
                }
                    style={styles.txtTextBox}
                />
            </View>

            <View style={[styles.txtView, {height:140,}]}>
                <Text style={styles.txtViewText}>
                    Additional Note
                </Text>

                <TextInput
                     onChangeText={
                         (value) => this.setState({
                             expenseNote:value
                         })
                     }
                    style={[styles.txtTextBox, {height:100,}]}
                />
            </View>

                    <View style={{flexDirection:'row', margin:10, alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity
            onPress={
                () => this.AddExpense(this.state.expenseAmount, this.state.expenseType,this.state.expenseFrom, this.state.expenseNote, this.state.expenseDate, this.state.expenseAddBy)
            }
             style={ [styles.txtButton, {backgroundColor:'#00e676'}]}>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>
                        ADD
                    </Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Dashboard')}
             style={ [styles.txtButton, {backgroundColor:'#ff1744'}]}>
            <Text style={{fontSize:20, color:'white', fontWeight:'bold'}}>
                        BACK
                    </Text>
            </TouchableOpacity>
            </View>

            </ScrollView>

           </View>
        )
    }
}

export default AddExpense

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ace9f7',
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
        color:'#ff1744'
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
    dropDown:{
        backgroundColor:'#0e131e',
        padding:20,
        paddingLeft:15,
        paddingRight:15,
        fontSize:25,
      },  
});