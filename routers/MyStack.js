import { createStackNavigator } from "@react-navigation/stack";
import Login from "../compoment/Login";
import Register from "../compoment/Register";
import ForgotPassword from "../compoment/ForgotPassword";
import Home from "../compoment/Home";
import ToDoApp from "../compoment/TodosApp";
const Stack = createStackNavigator()
const MyStack =()=>{
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login}
            options={{
                headerShown:false
                
            }}/>
            <Stack.Screen name="Register" component={Register}/>
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
            <Stack.Screen name="Home" component={Home}/>
        </Stack.Navigator>
    )
}
export default MyStack;