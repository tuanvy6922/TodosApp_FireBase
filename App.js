import { NavigationContainer } from "@react-navigation/native";
import Login from "./compoment/Login";
import Register from "./compoment/Register";
import MyStack from "./routers/MyStack";
import ToDoApp from "./compoment/TodosApp";
const App =()=>{
  return(
      // <Register/>
      // <Login/>
      // <NavigationContainer>
      //   <MyStack/>
      // </NavigationContainer>
      <ToDoApp/>
  )
}
export default App
