import React, { Component } from 'react';
import { StyleSheet, TextInput ,Text, Alert, Button, View,ActivityIndicator } from 'react-native'
import { associePageFetch, getScm ,getCoeffSpe ,jsonldFetch} from './ForsetiApi'
import AsyncStorage from '@react-native-community/async-storage';
import jwt_decode from "jwt-decode"

export default class Login extends Component {
  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {
      username: '',
      password: '',
      isLoading: false
    };
  }

  go = () => {
           const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (reg.test(this.state.email) === true){
               alert('valid');
           }
           else{
               alert();
           }
 
  }
  async onLogin() {
    this.setState({ isLoading: true });
    const { username, password } = this.state;
    await jsonldFetch(this.state).then(token => {
      this.setState({ token })
      
     
      }).then(async () => {
        const { navigate } = this.props.navigation;
        if(this.state.token){
          await AsyncStorage.setItem('token', this.state.token.token)
          let associe = await associePageFetch(this.state.token.token).then(async associe => {
              this.setState({ associe })
              const { navigate } = this.props.navigation; 
              let tokenParsed = jwt_decode(this.state.token.token)
              var userEmail = tokenParsed.username
              for(let i=0; i< this.state.associe['hydra:member'].length;i++){
                if(this.state.associe['hydra:member'][i].email == userEmail){
                  var user = this.state.associe['hydra:member'][i]
                  
                    this.setState({ user:user })
                }
              }    
            })
            this.setState({ isLoading: false });
          await navigate('Home',{ token: this.state.token , user:this.state.user})
        }
        else{
          navigate('Login')
        }         
        let token = await AsyncStorage.getItem('token')
        
      }
    )
  }
  componentDidMount(){
    
  }
  
  render() {
    console.log(this.state.isLoading)
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        
        {this.state.isLoading && <ActivityIndicator color={"#000"} />}
        <Text>gregory.pace@hotmail.fr</Text>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          label='Email'
          style={styles.input}
        />
        <Text>testtest</Text>
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          label='Password'
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Connection'}
          style={styles.input}
          onPress={(this.onLogin.bind(this))}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign:'center',
    fontWeight:'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});