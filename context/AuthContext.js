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
    // Puse el JWT que me devolvio la version deplyada a Heroku
    return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjEwNzc5NTQxLCJleHAiOjE2MTMzNzE1NDF9.N-1TBoC-NYFl_7xGN8Sy76FZfMcNyKe7cP-wKVCrvNQ"
  }

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, getToken }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext