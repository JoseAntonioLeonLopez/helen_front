import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useFetch } from '../Service/useFetch';


const Users = () => {

  const { data } = useFetch("users");

  return (
    <div className='App'>
      <table>
        {data.map( (data, id)=>(
          <tr key={id}>
            <td>{(data.name)}</td>
            <td>{(data.firstSurname)}</td>
            <td>{(data.secondSurname)}</td>
            <td>{(data.email)}</td>
          </tr>
        ))}
      </table>
      <a href='/publications'>Publications</a>
    </div>
  )
}

export default Users