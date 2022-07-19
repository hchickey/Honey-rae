import { Link } from "react-router-dom"

export const Customer = ({ id, fullName, address, phoneNumber }) => {
    return <section className="employee">
        <div>
            <Link to={`/customers/${id}`}>Name: {fullName} </Link>
        </div>
        <div>Address: {address}</div>
        <div>phoneNumber: {phoneNumber}</div>
    </section>
}

// Create a Customer module that contains a component function that accepts a single
// customer object as a prop. It should display the customer name, address, and phoneNumber.

// Link is to connect the url parameter to find the customer id when you click on their name
