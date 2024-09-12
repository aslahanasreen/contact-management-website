import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { dltFav,getFav } from '../services/allApis'
import { toast } from 'react-toastify'

function Favourites({ response,set }) {

    // const [response,setResponse] = useState([])

    const getData = async()=>{
        const result = await getFav()
        console.log(result);
        
        if(result.status==200){
            set(result.data)
        }
    }

    const FavDelete = async (id,data)=>{
        const res = await dltFav(id,data)
        console.log(res);
        
        if(res.status==200){
            toast.success("contact deleted from favourites!!")
            getData()
        }
        else{
            toast.error('deletion failed!!')
        }
    }

    return (
        <>
            <div className='d-flex justify-content-end mt-3 me-5'>
                <Link to={'/'} className='btn btn-dark'>Back to Contacts</Link>
            </div>

            <div className='p-5'>
                {
                    response.length > 0 ?
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">PHONE</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    response.map((item) => (
                                        <tr>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td><button className='btn' onClick={()=>{FavDelete(item.id,item)}}><i className="fa-solid fa-trash" /></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h1>No favourites available!!</h1>
                }
            </div>
        </>
    )
}

export default Favourites