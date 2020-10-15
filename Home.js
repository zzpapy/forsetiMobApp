import React, { Component } from 'react';

import { View,FlatList,TouchableHighlight,Text,SafeAreaView, ActivityIndicator } from 'react-native'
import { associePageFetch, getScm ,getCoeffSpe} from './ForsetiApi'
import jwt_decode from "jwt-decode"
import AsyncStorage from '@react-native-community/async-storage';
// import { Table, Row } from 'react-native-table-component'




export default class App extends Component {
    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        // const { user } = this.props.user;
        this.state = {
            user: this.props.route.params.user,
            scm: '',
            coeff:'',
            isLoading: false,
            totalChargePerMonth: '',
            tabCalc: '',
            moisTab : ["Janvier","Février","Mars","Avril","Mai","Juin","juillet","Août","septembre","Octobre","Novembre","Décembre"]
          };
    }
     async componentDidMount(){
      this.setState({ isLoading: true });
        let token = await AsyncStorage.getItem('token')
        let scm = this.state.user.scm
        console.log(this.state.user)
        let coeff = await getCoeffSpe(token,this.state.user.id,scm.id).then((coeff) => {
          this.setState({ coeff:coeff })
          this.setState({ isLoading: false });
        }) 
        .then(() => {
          console.log(this.state.coeff,this.state.user.coefficient_general)
          var dataCharge = this.state.coeff.totalCharge
            let tabCalc = []
            if(dataCharge){   
              dataCharge.map(
                function(key, index) {
                  console.log(key,index)
                  tabCalc[key.mois] = key.total
                }
                
              )
            }  
            this.setState({ tabCalc:tabCalc })
            console.log(this.state.tabCalc[7])    
        })
      }
     
        
        render() {
          let token = AsyncStorage.getItem('token')
          let dataCoeff = this.state.coeff.coeffUser
          let data = this.state.user.coefficient_general
          var dataCharge = this.state.coeff.totalCharge
          
         
          
        return (
          <SafeAreaView >
            {this.state.isLoading ? <ActivityIndicator color={"#000"}/> :
             <SafeAreaView >
            <Text>Bonjour {this.state.user.firstname} </Text>
            {/* <SafeAreaView >
              <table>
                <tbody>
                <tr>
                {this.state.moisTab.map((mois,index) => (
                  <td key={index}>
                    <Text>{mois}</Text>
                  </td>
                ))}
                </tr>
                <tr>
                {data.map((coeff) => (
                  <td key={coeff.id}>
                    <Text>{coeff.coefficient}</Text>
                  </td>
                ))}
                </tr>
                <tr>
                  {data.map((coeff,index) => (
                    <td key={coeff.id}>
                      <Text>{this.state.tabCalc[index+1]?this.state.tabCalc[index+1]+" €":""}</Text>
                    </td>
                  ))}
                </tr>
                <tr>
                  {data.map((coeff,index) => (
                    <td key={coeff.id}>
                      <Text>{(this.state.tabCalc[index+1]*coeff.coefficient)/100 ?(this.state.tabCalc[index+1]*coeff.coefficient)/100 + " €":""}</Text>
                    </td>
                  ))} 
                </tr>
            </tbody>
            </table>
            </SafeAreaView > */}
            <FlatList              
              data={data}
              keyExtractor={(item) => {
                return item.id.toString()}
              }
              renderItem={({ item,index }) => (
                <View>
                  <Text > {this.state.moisTab[index]} {item.coefficient} % {this.state.tabCalc[index+1]?this.state.tabCalc[index+1] + " €":""}  
                  {(this.state.tabCalc[index+1]*item.coefficient)/100 ?(this.state.tabCalc[index+1]*item.coefficient)/100 + " €":""} 
                  </Text>
                </View>
              )}
              />
            <FlatList
              
              data={dataCoeff}
              keyExtractor={(item) => {
                return item.charge_id.toString()}
              }
              renderItem={({ item }) => (
                <View>
                  <Text >{item.label} {item.total} {item.total_calc} </Text>
                </View>
              )}
              />
               </SafeAreaView>    
        }
        </SafeAreaView>
        );
    }
    
}


