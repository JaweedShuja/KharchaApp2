import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'
//import NavigationMenu from  './navigationMenu';
import ActionButton from 'react-native-action-button';
import firebase from '../../../firebase.js'
let transactions;



export default class Income extends Component{

  getAllActivitiesIncome(){
    // this.setState({
    //   btn1:'white',
    //   btn2:'#a8e8fa',
    // })

    this.props.navigation.navigate('Income')
    

  }

  getAllActivitiesExpense(email){

    this.setState({
      btn1:'#a8e8fa',
      btn2:'white',
    })

    var str = email.toUpperCase();
    var res = str.replace(".","DOT");

    const activityRef = firebase.database().ref('income').child(res);

    activityRef.on('value', (snapshot) => {

      let items = snapshot.val();
      let newState = [];

      for(let item in items){
        newState.push({
          incomeID: items[item].incomeID,
          incomeAddBy: items[item].incomeAddBy,
          incomeAmount: items[item].incomeAmount,
          incomeDate: items[item].incomeDate,
          incomeType: items[item].incomeType,
          
          
          
        });

        this.setState({
          counter:this.state.counter++,
        })
      }
     
      this.setState({
        DATA: newState
      });

    });

    
  }
    static navigationOptions = {
        header: null
    }
    state = {
      DATA:[],
      counter:0,
      btn1:'#a8e8fa',
      btn2:'white',
    }
    componentDidMount(){

      const { currentUser } = firebase.auth()
        

      this.getAllActivitiesExpense(currentUser.email);
    }
  render(){

    transactions =[]


    for(let i = this.state.DATA.length - 1; i >= 0; i--){
      transactions.push(
        <View style={styles.mainTransactionsView} key={i}>
          <View style={styles.transactionContainer}>
             

            <View style={styles.transaction3}>
              <View style={styles.txt3}>
                <Text style={styles.txt31}>
                Rs: {this.state.DATA[i].incomeAmount}
                </Text>
                <Text style={styles.txt32}>
                To {this.state.DATA[i].incomeType}
                </Text> 
              </View>
            </View>  

            <View style={styles.transaction1}>
              {/* <Text style={styles.txt1}>
                // {this.state.DATA[i].expenseNote}
              </Text> */}
              <Text style={styles.txt11}>
              {this.state.DATA[i].incomeDate}
              </Text>  
              {/* <Text style={styles.txt12}>
                {this.state.DATA[i].expenseType}
              </Text> */}
            </View> 

          </View>
        </View>
      )
    }


    return(
      <View style={styles.container}>
        
<View style={{flex:1,}}>
  <View style={{flex:5,}}>

      

  <View style={styles.resentTransView}>

  

<View style={styles.recenTransationContainer}>
  
  <Text style={styles.overViewText}>Recent Transactions</Text>

  <View style={{flexDirection:'row'}}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Activities')}
       
         style={{flex:1, margin:10, height:50, backgroundColor:this.state.btn2,borderRadius:5, alignItems:'center', justifyContent:'center'}}>
           <Text
            style={{
              color:'#00e676',
              fontWeight:'bold',
              fontSize:15,
            }}
           >EXPENSE</Text>
        </TouchableOpacity>

        <TouchableOpacity
        onPress={() => this.props.navigation.navigate('Income')}
        style={{flex:1, margin:10, height:50, backgroundColor:'#00e676',  borderRadius:5,  alignItems:'center', justifyContent:'center'}}>
        <Text
          style={{
            color:'white',
            fontWeight:'bold',
            fontSize:15,
          }}
        >INCOME</Text>
        </TouchableOpacity>
      </View>

  <ScrollView contentContainerStyle={styles.contentContainer}>
    
      {transactions}

  </ScrollView>  
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
         <View style={[styles.navButton,{backgroundColor:'white',}]}>
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
         <View style={[styles.navButton,{backgroundColor:'#a8e8fa',}]}>
             
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
             Savings
           </Text>
         </View>
         </TouchableOpacity>
        </View>
  </View>

</View>




        <ActionButton buttonColor="#3498db">
         
         <ActionButton.Item buttonColor='#00e676' title="Add Income"  onPress={() => this.props.navigation.navigate('AddIncome')}>
           <Text style={{color:'white', fontSize:25}}>
             +
           </Text>
         </ActionButton.Item>
         <ActionButton.Item buttonColor='#ff1744' title="Add Expense"  onPress={() => this.props.navigation.navigate('AddExpense')}>
           <Text style={{color:'white', fontSize:25}}>
             -
           </Text>
         </ActionButton.Item>
       </ActionButton>

      </View>
    );

  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#a8e8fa'
  },
  overViewText:{
    fontSize:15,
    fontWeight:'bold',
    marginLeft:10,
    color:'#3b99af',
    marginTop:5,
  },
  recenTransationContainer:{
    backgroundColor:'#a8e8fa',
    marginLeft:10,
    marginRight:10,
    marginTop:10,
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
    height:80,
    backgroundColor:'white',
    flex:1,
    flexDirection:'row',
    borderRadius:5,
  },
  transaction1:{
    flex:1,
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
    color:'green',
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
    backgroundColor:'#a8e8fa',
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
    //justifyContent:'center'
    
  },
})


  