import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"
// using link to go from one page to another page on the nav bar
export const NavBar = () => {
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    if (honeyUserObject.staff) {
        // return employee view
        return <EmployeeNav />
    }
    else {
        //return customer views
        return <CustomerNav/>
    }

}

