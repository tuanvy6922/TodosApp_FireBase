import { createStackNavigator } from "@react-navigation/stack";
import Login from "../compoment/Login";
import Register from "../compoment/Register";
import ForgotPassword from "../compoment/ForgotPassword";
const Stack = createStackNavigator()
const MyStack =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
        </Stack.Navigator>
    )
}
export default MyStack;