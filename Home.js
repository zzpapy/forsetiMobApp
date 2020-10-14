import React, { Component } from 'react';

import { View,FlatList,TouchableHighlight,Text,SafeAreaView } from 'react-native'
import { associePageFetch, getScm } from './ForsetiApi'
import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-community/async-storage';



export default class App extends Component {
    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        this.state = {
            user: '',
            scm: '',
          };
    }
     async componentDidMount(){
        let token = await AsyncStorage.getItem('token')
        console.log(await AsyncStorage.getItem('token'))
        let associe =  associePageFetch(token).then(async associe => {
            this.setState({ associe })
            const { navigate } = this.props.navigation; 
            let tokenParsed = jwt_decode(token)
            var userEmail = tokenParsed.username
            console.log(this.state.associe['hydra:member'],tokenParsed)
            for(let i=0; i< this.state.associe['hydra:member'].length;i++){
              if(this.state.associe['hydra:member'][i].email == userEmail){
                var user = this.state.associe['hydra:member'][i]
                this.setState({ user }) 
              }
            }
            
        })
    }
    
    render() {
        let token = this.props.route.params.token.token
        let data = this.state.user.coefficient_general
        return (
          <SafeAreaView >
            <Text>toto</Text>
            <FlatList
              
              data={data}
              keyExtractor={(item) => {
                return item.id.toString()}
              }
              renderItem={({ item }) => (
                <View>
                  <Text >{item.coefficient}</Text>
                </View>
              )}
            />    
        </SafeAreaView>
        );
    }
    
}


