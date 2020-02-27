import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert} from 'react-native'
import ActionButton from 'react-native-action-button'; 
import firebase from '../../../firebase.js'
let transactions;


class Statistics extends Component {
    static navigationOptions = {
        header: null
    }
    state = {
      DATA:[],
      // EatingOut:0,
      // Education:0,
      // Grocery:0,
      // Medical:0,
      // Other:0,
      // Personal:0,
    }
    componentDidMount(){

      const { currentUser } = firebase.auth()

      this.getValues(currentUser.email);
    }
    gotoDetails(route, type){
       global.exType = type;
       this.props.navigation.navigate(route)
    }
    getValues(email){
      var str = email.toUpperCase();
      var res = str.replace(".","DOT");
  
      const activityRef = firebase.database().ref('Otherdetails').child(res);
  
      activityRef.on('value', (snapshot) => {
  
        let items = snapshot.val();
        let newState = [];
  
        for(let item in items){
          newState.push({
            expenseCategoryName: items[item].expenseCategoryName,
            expenseCategoryAmount: items[item].expenseCategoryAmount
          });
        }

        this.setState({
          DATA: newState
        });
       
  
      });
  }
   render() {

    transactions =[]
    for(let i = 0; i<this.state.DATA.length; i++){

      transactions.push(
        <TouchableOpacity
            onPress={
              () => {
                this.gotoDetails('ExpenseTypeView',this.state.DATA[i].expenseCategoryName);
              }
            }
            //onPress={() => this.props.navigation.navigate('ExpenseTypeView')}
             style={[styles.contentTab, {backgroundColor:'white',}]}>
              {/* <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Image
                  style={{height:35, width:37}}
                  source={require('../../images/food.png')}
                />
              </View> */}
              
              <View style={styles.contentTxt}>
                  <Text style={{fontSize:20, fontWeight:'bold',color:'#3b99af', marginLeft:20,}}>
                  {this.state.DATA[i].expenseCategoryName}
                  </Text>  
              </View>

              <View style={{flex:2,}}>
                <View style={{marginTop:10,}}>
              <Text style={{fontSize:15, fontWeight:'bold', color:'#a6c8d8'}}>
                    Spent
                  </Text>
              <Text style={{fontSize:20, fontWeight:'bold',color:'#ff2f00'}}>
                    Rs {this.state.DATA[i].expenseCategoryAmount}
                  </Text>
                  </View>
              </View>  
              
            </TouchableOpacity>
      );
      
    }

       return (
           <View style={styles.container}>
               
                      
<View style={{flex:1,}}>
  <View style={{flex:5,}}>

  <View style={styles.resentTransView}>

    <TouchableOpacity
    onPress={() => this.props.navigation.navigate('AddNewCategory')}

     style={{flex:1, backgroundColor:'#00e676', margin:10, borderRadius:5, alignItems:'center', justifyContent:'center'}}>
        <Text
        style={{
          color:'white',
          fontWeight:'bold',
          fontSize:20,
        }}
        >
          ADD NEW CATEGORY
        </Text>
    </TouchableOpacity>

    <View style={styles.recenTransationContainer}>
        
            <View style={styles.content}>
              <ScrollView>

                {transactions}
              
              </ScrollView>
            </View>
      
    </View> 


 
</View> 


  </View>
  <View style={{
      flex:1, 
      marginLeft:10,
      marginRight:10,
      justifyContent:'center'
    }}>
        <View style={styles.navView1}>
        
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Dashboard')}
        >
         <View style={[styles.navButton,{backgroundColor:'white',}]}>
           <Image 
             style={styles.navIcon}
             //source={require('./components/src/dashbaordIcon.png')}
             source={require('../../images/dashbaordIcon.png')}

           />
           <Text style={styles.navIconText}>
             Dashboard
           </Text>
         </View>
         </TouchableOpacity>

         <TouchableOpacity  
         onPress={() => this.props.navigation.navigate('Statistics')}
         >
         <View style={[styles.navButton,{backgroundColor:'#a8e8fa',}]}>
         <Image 
             style={styles.navIcon}
             source={require('../../images/statistic.png')}
           />
           <Text style={styles.navIconText}>
             Statistics
           </Text>
         </View >
         </TouchableOpacity>

         <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Activities')}
         >   
         <View style={[styles.navButton,{backgroundColor:'white',}]}>
             
             <Image 
             style={styles.navIcon}
             source={require('../../images/ActivitiesIcon.png')}
           />
           <Text style={styles.navIconText}>
             Activities
           </Text>
         </View>
         </TouchableOpacity>

         <TouchableOpacity
          //onPress={() => this.props.navigation.navigate('Login')}
          onPress={
            handleLogout = () => {

              firebase
              
              .auth()
              
              .signOut()
              
              .then(() => this.props.navigation.navigate('Loading'))
              
              //.catch(error => this.setState({ errorMessage: error.message }));
              
              }
          }
         >   
         <View style={[styles.navButton,{backgroundColor:'white',}]}>
             
             <Image 
             style={styles.navIcon}
             source={require('../../images/logout.png')}
           />
           <Text style={styles.navIconText}>
             Logout
           </Text>
         </View>
         </TouchableOpacity>
        </View>
  </View>

</View>





               <ActionButton buttonColor="#3498db">

                   <ActionButton.Item buttonColor='#00e676' title="Add Income" onPress={() => this.props.navigation.navigate('AddIncome')}>
                       <Text style={{ color: 'white', fontSize: 25 }}>
                           +
                        </Text>
                   </ActionButton.Item>
                   <ActionButton.Item buttonColor='#ff1744' title="Add Expense" onPress={() => this.props.navigation.navigate('AddExpense')}>
                       <Text style={{ color: 'white', fontSize: 25 }}>
                           -
                        </Text>
                   </ActionButton.Item>
               </ActionButton>
           </View>
        )
    }
}

export default Statistics

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#ace9f7'
    },
    periodView:{
        flex:1,
        //backgroundColor:'white',
        margin:5,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        flexDirection:'row',
    },
    periodViewBtn:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        
    },
    content:{
        flex:7,
        //backgroundColor:'blue'
    },
    contentTxt:{
      flex:2,
      justifyContent:'center',
      marginLeft:10,
    },
    contentTab:{
        height:80,
        //marginLeft:5,
        //marginRight:5,
        marginBottom:5,
        borderRadius:5,
        
        flexDirection:'row'
    },
    contentImage:{
      height:40,
      width:40,
      
    },
    overViewText:{
        fontSize:15,
        fontWeight:'bold',
        marginLeft:10,
        color:'#a8cbd7',
        marginTop:5,
      },
      recenTransationContainer:{
        backgroundColor:'#ace9f7',
        marginLeft:10,
        marginRight:10,
        flex:7,
        borderRadius:10,
      },
      navView:{
        flex:1,
      },  
      contentContainer: {
      },
      transactionContainer:{
        marginLeft:10,
        marginRight:10,
        marginBottom:5,
        height:90,
        backgroundColor:'white',
        flex:1,
        flexDirection:'row',
        borderRadius:10,
      },
      transaction1:{
        flex:2,
        justifyContent:'center',
      },
      transaction3:{
        flex:1,
        justifyContent:'center',
      },
      txt1:{
        fontSize:20,
        fontWeight:'bold',
        color:'#258ea6',
        marginLeft:10,
      },
      txt11:{
        marginLeft:10,
        color:'#89afb9',
      },
      txt12:{
        marginLeft:10,
      },
      txt3:{
        marginLeft:20,
      },  
      txt31:{
        fontSize:18,
        color:'#4ffd1c',
        fontWeight:'bold',
      },
      txt32:{
        fontSize:15,
        color:'#7200ff'
      },
      mainTransactionsView:{
       
      },
      resentTransView:{
        flex:1,
      },
      navButtonsContainer: {
        backgroundColor:'#278ea6',
        height:70,
        marginLeft:10,
        marginRight:10,
        marginTop:5,
        borderRadius:10,
        
      },
      navButtonsInner:{
        flex:1,
        flexDirection:'row',
        alignContent:'center',
        justifyContent:'center'
      },
      navButton:{
        marginLeft:5,
        marginTop:5,
        marginBottom:5,
        height:60,
        width:62,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
    
      },
      navIcon:{
        height:30,
        width:30,
      },
      navIconText:{
        fontSize:12,
        color:'#1e1e1e',
        fontWeight:'bold',
      },
      navButton1:{
        margin:5,
        backgroundColor:'white',
        height:60,
        width:65,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:30,
      },
      navIconText1:{
        fontSize:40,
        color:'#1e1e1e',
        fontWeight:'bold',
      },
      navView1:{
        backgroundColor:'white',
        //width:50,
        flex:1,
        //marginLeft:10,
        //marginRight:100,
        marginTop:10,
        marginBottom:20,
        borderRadius:5,
        flexDirection:'row',
        alignItems:'center',
        //justifyContent:'center',
        
        
      },  
})