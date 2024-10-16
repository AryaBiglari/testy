import '../styles/globals.css'
import { EmployeeProvider } from "../components/employees/EmployeeContext";

function MyApp({ Component, pageProps }) {
  return <EmployeeProvider>
    <Component {...pageProps} />
  </EmployeeProvider>

}

export default MyApp
