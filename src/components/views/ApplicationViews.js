import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeViews } from "./EmployeeViews"
import { CustomerViews } from "./CustomerViews"

export const ApplicationViews = () => {

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    if (honeyUserObject.staff) {
        // return employee view
        return <EmployeeViews />
    }
    else {
        //return customer views
        return <CustomerViews />
    }

	
}

// right now on line 20 and 21 we displaying two components that are siblings meaning they are right next to each other
// one is not contained inside of the other, I had to put them both inside of a react fragment 
// next I want to create yet another component whose job is to contain these two things so they can share a state
// right now ticketSearch and ticketList cannot communicate with each other, they have to go through a parent
// now that parent is going to contain the state for searching through tickets