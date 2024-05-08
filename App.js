import { NavigationContainer } from "@react-navigation/native";
import Login from "./compoment/Login";
import Register from "./compoment/Register";
import MyStack from "./routers/MyStack";
import ToDoApp from "./compoment/TodosApp";
import HOME from "./compoment/Home";
import { MyContextControllerProvider } from "./store";
import Home from "./compoment/Home";

const App =()=>{
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
        <MyStack/>
      </NavigationContainer>
      </MyContextControllerProvider>
  )
}
export default App
