import { createContext, useState } from 'react'
import { useRouter } from 'next/router'

// VER DOCS CONTEXT API

const AuthContext = createContext()

export const AuthProvider = (props) => {

  const [user, setUser] = useState(null);
  const router = useRouter();

  const loginUser = async email => {
    setUser({ email });
    router.push("/")
  }

  const logoutUser = async email => {
    setUser(null);
    router.push("/")
  }

  // Esta funcion deberia sacar el token haciendo una llamada al backend (haciendo el POST a /auth/local quizas, para lo cual necesitaria agregar una password), pero la hardcodeo para simplificar las cosas
  const getToken = () => {
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEwNjg3OTM0LCJleHAiOjE2MTMyNzk5MzR9.DNiyRfJyPiRbSrT8D83HuOWuygV7asGrLbiwAZQy-aE"
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext