import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useFetch } from '../Service/useFetch';


const Users = () => {

  const { data } = useFetch("users");

  return (
    <div className='container'>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>First Surname</th>
            <th>Second Surname</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, id) => (
            <tr key={id}>
              <td>{item.name}</td>
              <td>{item.firstSurname}</td>
              <td>{item.secondSurname}</td>
              <td>{item.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href='/' className="btn btn-primary">Publications</a>
      <a href='/login' className="btn btn-primary">Login</a>
      <a href='/register' className="btn btn-primary">Register</a>
    </div>
  )
}

export default Users