import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
//import NavigationMenu from  './navigationMenu';
import ActionButton from 'react-native-action-button';

export default class Savings extends Component{
    static navigationOptions = {
        header: null
    }
  render(){



    return(
      <View style={styles.container}>
        
<View style={{flex:1,}}>
  <View style={{flex:5,}}>

  <View style={styles.resentTransView}>

<View style={styles.recenTransationContainer}>
  
  <Text style={styles.overViewText}>Savings</Text>

  <TouchableOpacity>
      <View style={styles.addSavingBtn}>
            <Text style={{fontSize:20, color:'#18839a', fontWeight:'bold',}}>
                Add Saving
            </Text>
          </View>
  </TouchableOpacity> 
    <ScrollView style={{marginBottom:5,}}>
        <View style={styles.savingItemView}>

            <View style={{flex:3,}}>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center', backgroundColor:'#b0eafb', borderRadius:10,margin:5,}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#278ea6'}}>
                            Naya Mobile Lena hai 
                        </Text>
                    </View>
                    <View style={{flex:2,}}>
                        <View style={{flex:1, flexDirection:'row', }}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#3b99af'}}>
                                    Total
                                </Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#ff2f00'}}>
                                    Rs 12000
                                </Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', }}>
                            <View style={{flex:1,  alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#3b99af'}}>
                                    Saved
                                </Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#00ff00'}}>
                                    Rs 1550
                                </Text>
                            </View>
                        </View>
                    </View>    

            </View>
            <View style={{flex:1,}}>

            <View style={{flex:2,}}>
                    <View style={{flex:3,  alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:30, fontWeight:'bold', color:'#00ff00'}}>
                            35 %
                        </Text>
                    </View>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#9700ff'}}>
                            COMPLETED
                        </Text>
                        </View>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity>
                <View style={{height:40, width:80, backgroundColor:'#08768f', borderRadius:10,  alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:30, fontWeight:'bold', color:'white'}}>
                        +
                    </Text>
                </View>
                </TouchableOpacity>
            </View> 

            </View>

        </View>

        <View style={styles.savingItemView}>

            <View style={{flex:3,}}>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center', backgroundColor:'#b0eafb', borderRadius:10,margin:5,}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#278ea6'}}>
                            Naya Mobile Lena hai 
                        </Text>
                    </View>
                    <View style={{flex:2,}}>
                        <View style={{flex:1, flexDirection:'row', }}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#3b99af'}}>
                                    Total
                                </Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#ff2f00'}}>
                                    Rs 12000
                                </Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', }}>
                            <View style={{flex:1,  alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#3b99af'}}>
                                    Saved
                                </Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#00ff00'}}>
                                    Rs 1550
                                </Text>
                            </View>
                        </View>
                    </View>    

            </View>
            <View style={{flex:1,}}>

            <View style={{flex:2,}}>
                    <View style={{flex:3,  alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:30, fontWeight:'bold', color:'#00ff00'}}>
                            35 %
                        </Text>
                    </View>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#9700ff'}}>
                            COMPLETED
                        </Text>
                        </View>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity>
                <View style={{height:40, width:80, backgroundColor:'#08768f', borderRadius:10,  alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:30, fontWeight:'bold', color:'white'}}>
                        +
                    </Text>
                </View>
                </TouchableOpacity>
            </View> 

            </View>

        </View>

        <View style={styles.savingItemView}>

            <View style={{flex:3,}}>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center', backgroundColor:'#b0eafb', borderRadius:10,margin:5,}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#278ea6'}}>
                            Naya Mobile Lena hai 
                        </Text>
                    </View>
                    <View style={{flex:2,}}>
                        <View style={{flex:1, flexDirection:'row', }}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#3b99af'}}>
                                    Total
                                </Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#ff2f00'}}>
                                    Rs 12000
                                </Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', }}>
                            <View style={{flex:1,  alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#3b99af'}}>
                                    Saved
                                </Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#00ff00'}}>
                                    Rs 1550
                                </Text>
                            </View>
                        </View>
                    </View>    

            </View>
            <View style={{flex:1,}}>

            <View style={{flex:2,}}>
                    <View style={{flex:3,  alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:30, fontWeight:'bold', color:'#00ff00'}}>
                            35 %
                        </Text>
                    </View>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#9700ff'}}>
                            COMPLETED
                        </Text>
                        </View>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity>
                <View style={{height:40, width:80, backgroundColor:'#08768f', borderRadius:10,  alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:30, fontWeight:'bold', color:'white'}}>
                        +
                    </Text>
                </View>
                </TouchableOpacity>
            </View> 

            </View>

        </View>

        <View style={styles.savingItemView}>

            <View style={{flex:3,}}>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center', backgroundColor:'#b0eafb', borderRadius:10,margin:5,}}>
                        <Text style={{fontSize:18, fontWeight:'bold', color:'#278ea6'}}>
                            Naya Mobile Lena hai 
                        </Text>
                    </View>
                    <View style={{flex:2,}}>
                        <View style={{flex:1, flexDirection:'row', }}>
                            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#3b99af'}}>
                                    Total
                                </Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#ff2f00'}}>
                                    Rs 12000
                                </Text>
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', }}>
                            <View style={{flex:1,  alignItems:'center', justifyContent:'center'}}>
                                <Text style={{fontWeight:'bold', color:'#3b99af'}}>
                                    Saved
                                </Text>
                            </View>
                            <View style={{flex:2, justifyContent:'center'}}>
                            <Text style={{fontWeight:'bold', color:'#00ff00'}}>
                                    Rs 1550
                                </Text>
                            </View>
                        </View>
                    </View>    

            </View>
            <View style={{flex:1,}}>

            <View style={{flex:2,}}>
                    <View style={{flex:3,  alignItems:'center', justifyContent:'center'}}>
                        <Text style={{fontSize:30, fontWeight:'bold', color:'#00ff00'}}>
                            35 %
                        </Text>
                    </View>

                    <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#9700ff'}}>
                            COMPLETED
                        </Text>
                        </View>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity>
                <View style={{height:40, width:80, backgroundColor:'#08768f', borderRadius:10,  alignItems:'center', justifyContent:'center'}}>
                    <Text style={{fontSize:30, fontWeight:'bold', color:'white'}}>
                        +
                    </Text>
                </View>
                </TouchableOpacity>
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
         <View style={[styles.navButton,{backgroundColor:'#a8e8fa',}]}>
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
    color:'#a8cbd7',
    marginTop:5,
  },
  addSavingBtn:{
    //flex:1,
    height:50,
    backgroundColor:'white',
    //width:100,
    margin:10,
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
  },
  savingItemView:{
    height:150,
    backgroundColor:'white',
    marginLeft:10,
    marginRight:10,
    marginTop:5,
    borderRadius:10,
    flex:1,
    flexDirection:'row',
  },
  recenTransationContainer:{
    backgroundColor:'#268ea6',
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
    margin:5,
    backgroundColor:'white',
    height:60,
    width:65,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:10,

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
})


  