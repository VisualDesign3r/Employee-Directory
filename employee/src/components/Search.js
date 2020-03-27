import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default () => {
    const [users, setUsers] = useState([]);
    const [filteredUser, setFilteredUsers] = useState([]);
    useEffect(() => {
        axios.get('https://randomuser.me/api/?results=200&nat=us')
        .then(res => {setFilteredUsers(res.data.results);setUsers(res.data.results)})
    }, [])

    const handleFilter =(val)=>{
        const filtered = users.filter(user=> user.name.first.toLowerCase().includes(val)
        || user.name.last.toLowerCase().includes(val) || user.email.toLowerCase().includes(val));
        setFilteredUsers(filtered)
    }

    return (
        <div className='justify-content-center'>
            <input onChange={(e)=> handleFilter(e.target.value.toLowerCase())} placeholder='search' />

            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Picture</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Gender</th>
                        <th scope='col'>Email</th>
                    </tr>
                </thead>
                <tbody>
                        {filteredUser.map(user=>
                        <tr key={user.id.value}>
                        <td><img src={user.picture.thumbnail}/></td>
                        <td>{user.name.first}</td>
                        <td>{user.name.last}</td>
                        <td>{user.gender}</td>
                        <td>{user.email}</td>
                        </tr>)
                        }
                </tbody>
            </table>
        </div>

    )
}