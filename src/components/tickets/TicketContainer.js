import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction = {setSearchTerms}/>
        <TicketList searchTermsState = {searchTerms}/>
    </>
}

// How do we get ticketSearch and ticketList to get access to the same state?
// by using props
// ticketSearch is the input
//the parent contain the state of searchTerms itself and the function to change the state of searchTerms
// so it is the search component that needs the setter function

// to get access to this function in ticketSearch I am going to be access this key of setterFunction
// which is on an object
// and it's value will be setSearchTerms
// going to use object decontrustion