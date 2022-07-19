// import libraries from react to get the function to work properly

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./tickets.css"

export const TicketList = ({ searchTermsState }) => {
    // use state to iterate through all the tickets in the database
    const [tickets, setTickets] = useState([])
    // filtered tickets show all tickets for employees and only one or two tickets for customers
    const [filteredTickets, setFiltered] = useState([])
    // emergency shows the tickets with emergencies
    const [emergency, setEmergency] = useState(false)
    // openOnly shows the tickets that haven't been completed
    const [openOnly, updateOpenOnly] = useState(false)
    // navigate helps navigate between staff and customer
    const navigate = useNavigate()

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    useEffect(
        () => {
            const searchedTickets = tickets.filter(ticket => {
                return ticket.description.toLowerCase().startsWith(searchTermsState.toLowerCase())})
            setFiltered(searchedTickets)
        },
        [ searchTermsState ]
    )


    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            }
            else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )

    useEffect(
        () => {
            fetch('http://localhost:8088/serviceTickets')
                .then(response => response.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
        },
        [] // When this array is empty, you are observing initial component state
    )


    useEffect(
        () => {
            if (honeyUserObject.staff) {
                // For employees
                setFiltered(tickets)
            }
            else {
                // For customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    useEffect(
        () => {
            if (openOnly) {
            const openTicketArray = tickets.filter(ticket => {
                return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
            })
            setFiltered(openTicketArray)
        }
            else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [ openOnly ]
    )


    return <>
    {
        honeyUserObject.staff
        ? <>
        <button onClick={ () => { setEmergency(true) } } >Emergency Only</button>
        <button onClick={ () => { setEmergency(false) } } >Show All</button>
        </>
        : <> 
        <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
        <button onClick={() => updateOpenOnly(true)}>Open Ticket</button>
        <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
        </>
    }
        
    <h2>List of Tickets</h2>

    <article className="tickets">
        {
            filteredTickets.map(
                (ticket) => {
                    return <section className="ticket" key={'ticket--${ticket.id}'}>
                        <header>{ticket.description}</header>
                        <footer>Emergency: {ticket.emergency ? "🧨" : "no"}</footer>
                    </section>
                }
            )
        }
        
        </article>    
        </>
}
