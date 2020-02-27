import React, {Component} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class NavigationMenu extends Component{
    render(){
        return(

               

       <View style={styles.navButtonsContainer}>
       <View style={styles.navButtonsInner}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Dashboard')}
        >
         <View style={styles.navButton}>
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

         <TouchableOpacity>   
         <View style={styles.navButton}>
         <Image 
             style={styles.navIcon}
             source={require('../../images/budgetIcon.png')}
           />
           <Text style={styles.navIconText}>
             Budget
           </Text>
         </View >
         </TouchableOpacity>

         <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Dashboard')}
         >   
         <View style={styles.navButton}>
             
             <Image 
             style={styles.navIcon}
             source={require('../../images/ActivitiesIcon.png')}
           />
           <Text style={styles.navIconText}>
             Activities
           </Text>
         </View>
         </TouchableOpacity>

         <TouchableOpacity>   
         <View style={styles.navButton}>
             <Image 
             style={styles.navIcon}
             source={require('../../images/SavingsIcon.png')}
           />
           <Text style={styles.navIconText}>
             Savings
           </Text>
         </View>
         </TouchableOpacity>

         <TouchableOpacity> 
            <View style={styles.navButton1}>
                
                
              <Text style={styles.navIconText1}>
                +
              </Text>
               
            </View>
        </TouchableOpacity>

       </View>

     </View>

        );
    }
}

const styles =StyleSheet.create({
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
})