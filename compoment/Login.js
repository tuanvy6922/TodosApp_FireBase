import { useEffect,useState } from "react";
import { Alert, View, StyleSheet } from "react-native";
import { Button, IconButton, Text, TextInput } from "react-native-paper";
import auth from "@react-native-firebase/auth"
import { Image } from "react-native";
import { login,useMyContextProvider } from "../store"; 
import { TouchableOpacity } from 'react-native-gesture-handler';

const Login =({navigation})=>{
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [showPassword, setShowPassword] = useState(false);
    const [controller, dispatch] = useMyContextProvider();
    const { userLogin } = controller;

    const handleLogin = () => {
         login(dispatch, email, password);
    };

    useEffect(() => {
        if (userLogin !== null) navigation.navigate('Home');
      }, [userLogin]);
      
    // const handleLogin=()=>{
    //     auth().signInWithEmailAndPassword(email,password)
    //     .then(()=> navigation.navigate('Home',{Home}))
    //     .catch(e => Alert.alert(e.message))
    // }

    return(
        <View style ={{flex:1, justifyContent:"center",backgroundColor:'white'}}>
            <Image
              style ={{width: 150, height: 150, alignSelf:"center",marginBottom:50}}
              source={require('./assets/logo.png')}
              resize
            ></Image>
            <TextInput
                style={styles.passwordContainer2}
                label={"Email"}
                value={email}
                onChangeText={setEmail}
            />
            {/* <TextInput
                label={"Password"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            /> */}
            <View style={styles.passwordContainer}>
                <TextInput
                style={styles.passwordContainer1}
                    label={"Password"}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry ={showPassword}
                    right={
                        <TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'} onPress={() => setShowPassword(!showPassword)}/>
                    }
                />
                 {/* <IconButton        
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                /> */}
            </View>
            <Button
            style={styles.passwordContainer3}
             mode="contained" 
             onPress={handleLogin}>
                Login
            </Button>
            <View style={{flexDirection: "row"}}>
                <Text style={{paddingTop:10,paddingLeft:100}}>Don't have an account ? </Text>
                <Button style={{paddingRight:70}} onPress={()=> navigation.navigate("Register")}> Sign up </Button>
                <Button style={{paddingLeft:20}}onPress={()=> navigation.navigate("ForgotPassword")}> Forgot Password </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    passwordContainer: {
    flexDirection:'row',
    margin:10
    },
    passwordContainer1: {
        flex:1
        },
    passwordContainer2: {
        margin:10
        },
    passwordContainer3: {
        margin:10
        },
});

export default Login