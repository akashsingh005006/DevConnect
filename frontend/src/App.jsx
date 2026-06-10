import ChatPage from "./pages/ChatPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const token = localStorage.getItem("token");

  return token ? <ChatPage /> : <LoginPage />;
}

export default App;