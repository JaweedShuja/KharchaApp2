import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import firebase from '../../../firebase.js'
import PieChart from 'react-native-pie-chart';


class Dashboard extends Component {
  
  static navigationOptions = {
    header: null
  }
  state ={
    DATA:[],
    DATA2:[],

    income:1, 
    expense:1,

    total:0,

    expenseSum:0,
    incomeSum:0,

    bankSumTotal:0,
    CashSumTotal:0,
    OtherSumTotal:0,

    bankSumSpent:0,
    CashSumSpent:0,
    OtherSumSpent:0,
  }
  handleLogout = async () => {
      try{
        await firebasea.auth().signOut();
      }
      catch (e){
        Alert.alert("sign out", "error")
      }
  }
  getAllActivitiesIncome(email){

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
        if(items[item].incomeType == 'Bank'){
          this.setState({
            bankSumTotal:this.state.bankSumTotal += parseInt(items[item].incomeAmount)
          })
          //bankSumTotal += parseInt(items[item].incomeAmount);
        }
        else if(items[item].incomeType == 'Cash'){
          this.setState({
            CashSumTotal:this.state.CashSumTotal += parseInt(items[item].incomeAmount)
          })
          //CashSumTotal += parseInt(items[item].incomeAmount);
        }
        else if(items[item].incomeType == 'Other'){
          this.setState({
            OtherSumTotal:this.state.OtherSumTotal += parseInt(items[item].incomeAmount)
          })
          //OtherSumTotal += parseInt(items[item].incomeAmount);
        }
        this.setState({
          incomeSum:this.state.incomeSum += parseInt(items[item].incomeAmount),
        })

        //incomeSum += parseInt(items[item].incomeAmount);

        this.setState({
          counter:this.state.counter++,
        })
      }

      this.setState({
        income:this.state.incomeSum,
      })

      //income = this.state.incomeSum;
     
      this.setState({
        DATA2: newState
      });

    });

    
  }
  getAllActivitiesExpense(email){

    

    var str = email.toUpperCase();
    var res = str.replace(".","DOT");

    const activityRef = firebase.database().ref('expense').child(res);

    activityRef.on('value', (snapshot) => {

      let items = snapshot.val();
      let newState = [];

      for(let item in items){
        newState.push({
          expenseID: items[item].expenseID,
          expenseAmount: items[item].expenseAmount,
          expenseType: items[item].expenseType,
          expenseFrom: items[item].expenseFrom,
          expenseNote: items[item].expenseNote,
          expenseDate: items[item].expenseDate,
          expenseAddBy: items[item].expenseAddBy,

          
          
        });



        if(items[item].expenseFrom == 'Bank'){
          this.setState({
            bankSumSpent:this.state.bankSumSpent += parseInt(items[item].expenseAmount)
          })
          //bankSumSpent += parseInt(items[item].expenseAmount)
        } 
        else if(items[item].expenseFrom == 'Cash'){
          this.setState({
            CashSumSpent:this.state.CashSumSpent += parseInt(items[item].expenseAmount)
          })
          //CashSumSpent += parseInt(items[item].expenseAmount)
        }
        else if(items[item].expenseFrom == 'Other'){
          this.setState({
            OtherSumSpent:this.state.OtherSumSpent += parseInt(items[item].expenseAmount)
          })
          //OtherSumSpent += parseInt(items[item].expenseAmount)
        }

        this.setState({
          expenseSum:this.state.expenseSum += parseInt(items[item].expenseAmount),
        })
        //expenseSum += parseInt(items[item].expenseAmount);

        this.setState({
          counter:this.state.counter++,
        })
      }
     
      
      this.setState({
        expense:this.state.expenseSum,
      })

      //expense = expenseSum;
      this.setState({
        DATA: newState
      });

    });

    
  }
  componentDidMount(){

    
    this.getAllActivitiesExpense(global.LoginEmail);
    this.getAllActivitiesIncome(global.LoginEmail);

    total = this.state.incomeSum + this.state.expenseSum;

  
  }
     render() {
      
      const chart_wh = 250
      
      const series = [parseInt(this.state.expense), parseInt(this.state.income)]
      //const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
      const sliceColor = ['#ff1919', '#00e600']


    let transactions =[]

    for(let i = 0; i < this.state.DATA.length; i++){
      transactions.push(
        <View style={styles.mainTransactionsView} key={i}>
          <View style={styles.transactionContainer}>
            <View style={styles.transaction1}>
              <Text style={styles.txt1}>
              {this.state.DATA[i].expenseNote}
              </Text>
              <Text style={styles.txt11}>
              {this.state.DATA[i].expenseDate}
              </Text>  

              <Text style={styles.txt12}>
              {this.state.DATA[i].expenseType}
              </Text>

            </View>  

           

            <View style={styles.transaction3}>
            <View style={styles.txt3}>
              <Text style={styles.txt31}>
              Rs: {this.state.DATA[i].expenseAmount}
              </Text>
              <Text style={styles.txt32}>
              From {this.state.DATA[i].expenseFrom}
              </Text> 
            </View>
            </View>  
          </View>

         
        </View>
      )
    }


       return (
        <View style={{flex:1, backgroundColor: '#a8e8fa'}}>

 <View style={styles.overViewContainer}>
          <Text style={styles.overViewText}>
              Overview
          </Text>


          <View style={styles.insideOverViewContainer}>
            <View style={styles.overViewHalf1}>
              <Text style={styles.overViewText1}>
                Income
              </Text>
              <Text style={[styles.overViewText2, styles.txtGreen]}>
                Rs. {this.state.incomeSum}
              </Text>


            </View>
            <View style={styles.overViewHalf2}>
              <Text style={styles.overViewText1}>
                Expanse
              </Text>
              <Text style={[styles.overViewText2, styles.txtRed]}>
                Rs. {this.state.expenseSum}
              </Text>

            </View>
          </View>

          

        </View> 

        <View style={styles.accountsContainer}>

<Text style={styles.overViewText}>Accounts</Text>

<View style={styles.indsideAccountContainer}>
  <View style={styles.accountsContainer1}>
    <Text style={[styles.overViewText11, styles.txtWhite1]}>
      Bank
    </Text>
    <Text style={[styles.overViewText3, styles.txtWhite]}>
      Rs. {this.state.bankSumTotal - this.state.bankSumSpent}
    </Text>
  </View>

  <View style={styles.accountsContainer2}>
    <Text style={[styles.overViewText11, styles.txtWhite1]}>
      Cash
    </Text>
    <Text style={[styles.overViewText3, styles.txtWhite]}>
      Rs. {this.state.CashSumTotal - this.state.CashSumSpent}
    </Text>
  </View>

  <View style={styles.accountsContainer3}>
   
  <Text style={[styles.overViewText11, styles.txtWhite1]}>
      Other
    </Text>
    <Text style={[styles.overViewText3, styles.txtWhite]}>
      Rs. {this.state.OtherSumTotal - this.state.OtherSumSpent}
    </Text>
  </View>


</View>
</View> 

<View style={{flex:1,}}>
  <View style={{flex:3,}}>

  <View style={styles.resentTransView}>

<View style={styles.recenTransationContainer}>
  
 

  <ScrollView contentContainerStyle={styles.contentContainer}>
    
      {/* {transactions} */}
      <View style={{flexDirection:'row', marginTop:30,}}>
        <View  style={{flex:2, alignItems:'center', justifyContent:'center'}}>
        {/* <PieChart
            
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
          /> */}
        </View>
        <View style={{flex:1,  justifyContent:'center', }}>
            <View style={{flexDirection:'row', marginLeft:20}}>
                <View style={{backgroundColor:'#ff1919', height:20, width:20,}}></View>
                <View style={{alignItems:'center', justifyContent:'center', marginLeft:10}}><Text>EXPENSE</Text></View>
            </View>
            <View style={{flexDirection:'row', marginLeft:20, marginTop:10,}}>
                <View style={{backgroundColor:'#00e600', height:20, width:20,}}></View>
                <View style={{alignItems:'center', justifyContent:'center', marginLeft:10}}><Text>INCOME</Text></View>
            </View>
        </View>
        </View>
      



  </ScrollView>  
</View> 


 
</View> 


  </View>
  <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <View style={styles.navView1}>
        
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Dashboard')}
        >
         <View style={[styles.navButton,{backgroundColor:'#a8e8fa',}]}>
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
          onPress={() => this.props.navigation.navigate('Savings')}
         >   
         <View style={[styles.navButton,{backgroundColor:'white',}]}>
             <Image 
             style={styles.navIcon}
             source={require('../../images/SavingsIcon.png')}
           />
           <Text style={styles.navIconText}>
             Savings
           </Text>
         </View>
         </TouchableOpacity>
        </View>
  </View>

</View>



        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="#3498db">
         
          <ActionButton.Item buttonColor='#1abc9c' title="Add Income"  onPress={() => this.props.navigation.navigate('AddIncome')}>
            <Text style={{color:'white', fontSize:25}}>
              +
            </Text>
          </ActionButton.Item>
          <ActionButton.Item buttonColor='rgba(231,76,60,1)' title="Add Expense"  onPress={() => this.props.navigation.navigate('AddExpense')}>
            <Text style={{color:'white', fontSize:25}}>
              -
            </Text>
          </ActionButton.Item>
          
          <ActionButton.Item buttonColor='rgba(231,76,60,1)' title="Logout"  onPress={() => this.handleLogout()}>
            <Text style={{color:'white', fontSize:25}}>
              O
            </Text>
          </ActionButton.Item>

        </ActionButton>
      </View>
        )
    }
}

export default Dashboard

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  navView1:{
    backgroundColor:'#268ea6',
    //width:50,
    flex:1,
    marginLeft:10,
    marginRight:100,
    marginTop:10,
    marginBottom:20,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    
  },
  addIncomeIcon:{
    height:25,
    width:25,
  },
  btn:{
    position:'absolute',
    width:50,height:50,
    borderRadius:30,
    bottom:10,
    right:10,
    alignItems:'center',
    justifyContent:'center',
  },
  pay:{
    backgroundColor:'green',
  },
  button:{
    width:60,
    height:60,
    alignItems:'center',
    justifyContent:'center',
    shadowColor:'#333',
    shadowOpacity:.1,
    shadowOffset:{x:2,  y:0},
    shadowRadius:2,
    borderRadius:30,
     //position:'absolute',
     bottom:0,
    //  right:100,
    
    

  },
  sty:{
    position:'absolute',
    flex:1,
    flexDirection:'row',

  },  
  // pay:{
  //   backgroundColor:'#00B15E'
  // },
  other:{
    backgroundColor:'blue',
    // transform:[{
    //   translateY: -70
    // }]
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
    margin:5,
    
    height:60,
    width:65,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,

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
  overViewContainer:{
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'#268ea6',
    height:100,
    borderRadius:10,
  },
  accountsContainer:{
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'white',
    height:120,
    backgroundColor:'#268ea6',
    borderRadius:10,

  },
  overViewText:{
    fontSize:15,
    fontWeight:'bold',
    marginLeft:10,
    color:'#a8cbd7',
    marginTop:5,
  },
  insideOverViewContainer:{
    flex:1,
    flexDirection:'row'
  },
  indsideAccountContainer:{
    flex:1,
    flexDirection:'row',
    margin:10
  },
  overViewHalf1:{
    flex:1,
  },
  overViewHalf2:{
    flex:1, 
  },
  overViewText1:{
    fontSize:22,
    marginLeft:10,
    color:'#ffffff',
  },
  overViewText11:{
    fontSize:23,
    color:'#ffffff',
    fontWeight:'bold',
  },
  overViewText2:{
    fontSize:25,
    marginLeft:10,
    marginTop:5,
    fontWeight:'bold'
  },
  overViewText3:{
    fontSize:15,
    fontWeight:'bold'
  },
  accountsContainer1:{
    flex:1,
    backgroundColor:'white',
    marginRight:10,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',

  },
  accountsContainer2:{
    flex:1,
    backgroundColor:'white',
    marginRight:10,
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
  },
  accountsContainer3:{
    flex:1,
    backgroundColor:'white',
    borderRadius:10,
    justifyContent:'center',
    alignItems:'center',
    
  },  
  recenTransationContainer:{
    backgroundColor:'#268ea6',
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    flex:4,
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
  txtGreen:{
    color:'#4ffd1c'
  },
  txtRed:{
    color:'#ff4922'
  },
  txtWhite:{
    color:'#4ffd1c'
  },
  txtWhite1:{
    color:'#258ea6',
  },  
  navIcon:{
    height:25,
    width:25,
  },
  navIconText:{
    fontSize:12,
    color:'#1e1e1e',
    fontWeight:'bold',
  },
  navIconText1:{
    fontSize:40,
    color:'#1e1e1e',
    fontWeight:'bold',
  },
  addAccount:{
    fontSize:50,
    color:'#258ea6',

  },
  resentTransView:{
    flex:1,
  }
});