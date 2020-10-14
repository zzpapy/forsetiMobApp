import React, { Component } from 'react';
import { StyleSheet, TextInput ,Text, Alert, Button, View } from 'react-native'
import { jsonldFetch } from './ForsetiApi'
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    const { navigate } = this.props.navigation;
    this.state = {
      username: '',
      password: '',
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
    const { username, password } = this.state;
    await jsonldFetch(this.state).then(token => {
      this.setState({ token })
      
     
      }).then(async () => {
        const { navigate } = this.props.navigation;
        if(this.state.token){
          await AsyncStorage.setItem('token', this.state.token.token)
          await navigate('Home',{ token: this.state.token })
        }
        else{
          navigate('Login')
        }         
      }
    )
  }
  componentDidMount(){
    
  }
  
  render() {
    
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
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