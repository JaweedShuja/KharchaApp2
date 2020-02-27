import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Linking, Image, Alert } from 'react-native'
import firebase from '../../../firebase.js'
import { StackActions, NavigationActions } from 'react-navigation';


export default class index extends React.Component{
    static  navigationOptions = {
        header:null
    }
    componentDidMount(){
       
        // var t = setInterval(() => {
        //     this.props.navigation.navigate('Login')
        //     clearInterval(t);
        // },3000)

        // firebase.auth().onAuthStateChanged(user => {
        //     this.props.navigation.navigate(user ? 'Dashboard' : 'Login')
        //   })

        firebase.auth().onAuthStateChanged(user => {
            
           if(user){
               
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
              });
              this.props.navigation.dispatch(resetAction);

           }
           else{
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: 'Login' })],
              });
              this.props.navigation.dispatch(resetAction);
           }

          })
        
    }
        
    

    render(){
        return(
            <View style={styles.container}>

       
                {/* <Text>Loading</Text>
                <ActivityIndicator size="large"/> */}
                
                    <View style={{flex:8, alignItems:'center',justifyContent:'center'}}>
                    <Text
                    style={styles.titleText}>
                        خرچا</Text>

         <Text    
            style={styles.titleDesText}>
            Manage your income and expense easily!
          </Text>
                    </View>
                    {/* <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <Text>App Design By</Text>

<View style={{flexDirection:'row'}}>
    <Image
        style={{height:28, width:28,}}
        source={require('../../images/linkedin.png')}
    />
    <View style={{alignItems:'center', justifyContent:'center'}}>
        <Text style={{fontSize:20, textDecorationLine:'underline', color:'blue', marginLeft:10,}} onPress={ ()=> Linking.openURL('https://www.linkedin.com/in/jaweed-shuja-uddin-09482317b/') } >Jaweed Shuja-Uddin</Text>
    </View>


</View>
                    </View> */}
             
             

          

                

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#b3ebf8'
    },
    titleText:{
        fontSize:100,
        alignSelf:'center',
        marginTop:10,
        color:'#304ffe',
      },
      titleDesText:{
        alignSelf:'center',
        backgroundColor:'#00e676',
        color:'white',
        borderRadius:5,
        //padding:5,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        fontSize:15,
      },  
})