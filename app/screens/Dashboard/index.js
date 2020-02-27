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
    income:0,
    expense:0,
    bank:0,
    cash:0,
    other:0,
    pieincome:1,
    pieexpense:1,
    currentUser:null
  }
  handleLogout = async () => {
      // try{
      //   await firebasea.auth().signOut();
      // }
      // catch (e){
      //   Alert.alert("sign out", "error")
      // }
      this.props.navigation.navigate('Login')
  }
  
  componentDidMount(){

    const { currentUser } = firebase.auth()
    //this.setState({ currentUser })

    global.LoginEmail = currentUser.email;


    this.getValues(currentUser.email);

    //Alert.alert(global.LoginEmail)
  }
  getValues(email){
    var str = email.toUpperCase();
    var res = str.replace(".","DOT");

    const activityRef = firebase.database().ref('details').child(res);

    activityRef.on('value', (snapshot) => {

      let items = snapshot.val();

      for(let item in items){

        
        this.setState({
          income:(items[item].income - items[item].expense),
          expense:items[item].expense,
          bank:items[item].bank,
          cash:items[item].cash,
          other:items[item].other,
          pieincome:(items[item].income - items[item].expense),
          pieexpense:items[item].expense,
        })
            
      }
     
    });
}
     render() {

      //const { currentUser } = this.state

      // <Text>
      //     Hi {currentUser && currentUser.email}!
      //   </Text>
      
      const chart_wh = 210
      var series;
      if(parseInt(this.state.pieincome) == 0 && parseInt(this.state.pieexpense) == 0){
        series = [1,1]
      }
      else{
        series = [this.state.pieincome,this.state.pieexpense]
      }
      
      //const sliceColor = ['#F44336','#2196F3','#FFEB3B', '#4CAF50', '#FF9800']
      const sliceColor = ['#76ff03', '#ff1744']


    let transactions =[]

    for(let i = 0; i < 5; i++){
      transactions.push(
        <View style={styles.mainTransactionsView} key={i}>
          <View style={styles.transactionContainer}>
            <View style={styles.transaction1}>
              <Text style={styles.txt1}>
              120
              </Text>
              <Text style={styles.txt11}>
              120
              </Text>  

              <Text style={styles.txt12}>
              120
              </Text>

            </View>  

           

            <View style={styles.transaction3}>
            <View style={styles.txt3}>
              <Text style={styles.txt31}>
              Rs: 200
              </Text>
              <Text style={styles.txt32}>
              From 200
              </Text> 
            </View>
            </View>  
          </View>

         
        </View>
      )
    }


       return (
         
        <View style={{flex:1, backgroundColor: '#ace9f7'}}>

 <View style={styles.overViewContainer}>
          <Text style={styles.overViewText}>
              Overview
          </Text>


          <View style={styles.insideOverViewContainer}>
            <View style={styles.overViewHalf1}>
              <Text style={[styles.overViewText1, {color:'#3b99af',}]}>
                Remaining Amount
              </Text>
              <Text style={[styles.overViewText2, styles.txtGreen]}>
                Rs. {this.state.income}
              </Text>


            </View>
            <View style={styles.overViewHalf2}>
              <Text style={[styles.overViewText1, {color:'#3b99af',}]}>
                Total Expense
              </Text>
              <Text style={[styles.overViewText2, styles.txtRed]}>
                Rs. {this.state.expense}
              </Text>

            </View>
          </View>

          

        </View> 

        <View style={styles.accountsContainer}>

<Text style={styles.overViewText}>Accounts</Text>

<View style={styles.indsideAccountContainer}>
  <View style={styles.accountsContainer1}>
    <Text style={[styles.overViewText11]}>
      Bank
    </Text>
    <Text style={[styles.overViewText3, styles.txtWhite]}>
      Rs. {this.state.bank}
    </Text>
  </View>

  <View style={styles.accountsContainer2}>
    <Text style={[styles.overViewText11]}>
      Cash
    </Text>
    <Text style={[styles.overViewText3, styles.txtWhite]}>
      Rs. {this.state.cash}
    </Text>
  </View>

  <View style={styles.accountsContainer3}>
   
  <Text style={[styles.overViewText11]}>
      Other
    </Text>
    <Text style={[styles.overViewText3, styles.txtWhite]}>
      Rs. {this.state.other}
    </Text>
  </View>


</View>
</View> 

<View style={{flex:1,}}>
  
  <View style={{flex:3,}}>

  <View style={styles.resentTransView}>

  <View style={styles.recenTransationContainer}>


  <Text style={styles.overViewText}>
              Chart
  </Text>
  
 

  <ScrollView contentContainerStyle={styles.contentContainer}>
    
      {/* {transactions} */}
      <View style={{flexDirection:'row', marginTop:20}}>
        <View  style={{flex:2, alignItems:'center', justifyContent:'center'}}>
          
        <PieChart
            
            chart_wh={chart_wh}
            series={series}
            sliceColor={sliceColor}
            doughnut={true}
            coverRadius={0.45}
            coverFill={'#FFF'}
          />
          
        </View>
        <View style={{flex:1,  justifyContent:'center', }}>
            <View style={{flexDirection:'row', marginLeft:20}}>
                <View style={{backgroundColor:'#ff1744', height:20, width:20,}}></View>
                <View style={{alignItems:'center', justifyContent:'center', marginLeft:10}}><Text>EXPENSE</Text></View>
            </View>
            <View style={{flexDirection:'row', marginLeft:20, marginTop:10,}}>
                <View style={{backgroundColor:'#76ff03', height:20, width:20,}}></View>
                <View style={{alignItems:'center', justifyContent:'center', marginLeft:10}}><Text>INCOME</Text></View>
            </View>
        </View>
        </View>
      



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



        {/* Rest of the app comes ABOVE the action button component !*/}
        <ActionButton buttonColor="#3498db">
         
          <ActionButton.Item buttonColor='#00e676' title="Add Income"  onPress={() => this.props.navigation.navigate('AddIncome')}>
            <Text style={{color:'white', fontSize:25}}>
              +
            </Text>

            {/* <Image
            style={{
              height:25,
              width:20,
            }}
            source={require('../../images/addincome.png')}
            /> */}
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#ff1744' title="Add Expense"  onPress={() => this.props.navigation.navigate('AddExpense')}>
            <Text style={{color:'white', fontSize:25}}>
              -
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
    marginLeft:5,
    marginTop:5,
    marginBottom:5,
    height:60,
    width:62,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:5,

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
    backgroundColor:'white',
    height:100,
    borderRadius:5,
  },
  accountsContainer:{
    marginTop:10,
    marginLeft:10,
    marginRight:10,
    backgroundColor:'white',
    height:120,
    backgroundColor:'#ffffff',
    borderRadius:5,

  },
  overViewText:{
    fontSize:15,
    fontWeight:'bold',
    marginLeft:10,
    color:'#3b99af',
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
    marginTop:5,
    fontSize:15,
    marginLeft:10,
  },
  overViewText11:{
    fontSize:22,
    color:'#ffffff',
    //fontWeight:'bold',
    marginLeft:5,
  },
  overViewText2:{
    fontSize:25,
    marginLeft:10,
    marginTop:5,
    fontWeight:'bold'
  },
  overViewText3:{
    fontSize:18,
    marginLeft:5,
    marginTop:15,
  },
  accountsContainer1:{
    flex:1,
    backgroundColor:'#ff9100',
    marginRight:10,
    borderRadius:2,
    // justifyContent:'center',
    // alignItems:'center',

  },
  accountsContainer2:{
    flex:1,
    backgroundColor:'#00e676',
    marginRight:10,
    borderRadius:2,
    // justifyContent:'center',
    // alignItems:'center',
  },
  accountsContainer3:{
    flex:1,
    backgroundColor:'#00b0ff',
    borderRadius:2,
    // justifyContent:'center',
    // alignItems:'center',
    
  },  
  recenTransationContainer:{
    backgroundColor:'white',
    marginLeft:10,
    marginRight:10,
    marginTop:10,
    flex:4,
    borderRadius:5,
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
    borderRadius:5,
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
    color:'#00e676'
  },
  txtRed:{
    color:'#ff1744'

  },
  txtWhite:{
    color:'white'
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