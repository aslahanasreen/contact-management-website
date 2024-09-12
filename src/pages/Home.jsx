import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { getContact, dltContact, addContact, addFav, checkFav, getFav, editContact } from '../services/allApis';


function Home({ set, Response }) {

    const [show, setShow] = useState(false);

    const [modalShow, setModalShow] = useState(false);

    const [editC,setEditC] = useState({
        id:"", name:"",phone:"",email:""
    })

    const [addC, setAddC] = useState({
        name: "", phone: "", email: ""
    })

    const [contacts, setContacts] = useState([])

    useEffect(() => {
        getData()

    }, [Response])

    const getFavv = async () => {
        const favv = await getFav()
        console.log(favv);

        if (favv.status == 200) {
            set(favv.data)
        }
    }

    const getData = async () => {
        const result = await getContact()
        console.log(result);
        if (result.status == 200) {
            setContacts(result.data)
        }
    }

    const handleContact = async () => {
        const { name, phone, email } = addC

        if (!name || !phone || !email) {
            toast.warning("Enter valid input")
        }
        else {
            const res = await addContact(addC)
            console.log(res);

            if (res.status == 201) {
                toast.success("Contact added")
                handleClose()
                getData()
                setAddC({
                    name: "", phone: "", email: ""
                })
            }
            else {
                toast.error("Adding failed")
            }
        }
    }

    const handleDelete = async (id, data) => {
        const del = await dltContact(id, data)
        console.log(del);
        if (del.status == 200) {
            toast.success('Contact deleted')
            getData()
        }
        else {
            toast.error('deletion failed')
        }

    }

    const handleFav = async (data) => {
        const check = await checkFav(data.id, data.name)
        console.log(check);
        if (check.data.length > 0) {
            toast.success('Already added to favourites!!')
        }
        else {
            const fav = await addFav(data)
            console.log(fav);

            if (fav.status == 201) {
                toast.success('Added to favourites')
            }
            else {
                toast.error('Addition failed!!')
            }
        }

    }

    const handleEdit = async(id,data) =>{
        const resultt = await editContact(id,data)
        console.log(resultt);
        
        if(resultt.status==200){
            toast.success('Contact edited!!')
            mClose()
            setEditC({
                id:"", name:"",phone:"",email:""
            })
            getData()
        }

        else{
            toast.error('Editing failed!')
        }
    }

    const mShow = (data) =>{ 
        setModalShow(true)
        setEditC({
            id: data.id, name: data.name, phone: data.phone, email: data.email
        })
    };
    const mClose = () => setModalShow(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='d-flex justify-content-end mt-5'>
                <button className='btn btn-dark me-3' onClick={handleShow}><i className="fa-solid fa-plus" /> Add new contact</button>
                <Link to={'/fav'} className='btn btn-dark me-5' onClick={getFavv}><i className="fa-solid fa-star" />Favourites</Link>
            </div>

            {/* modal */}

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className='form-control mb-3' placeholder='Enter name' onChange={(e) => { setAddC({ ...addC, name: e.target.value }) }} />
                    <input type="text" className='form-control mb-3' placeholder='Enter phone number' onChange={(e) => { setAddC({ ...addC, phone: e.target.value }) }} />
                    <input type="text" className='form-control mb-3' placeholder='Enter Email address' onChange={(e) => { setAddC({ ...addC, email: e.target.value }) }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleContact}>Add</Button>
                </Modal.Footer>
            </Modal>

            {/* edit modal */}

            <Modal
                show={modalShow}
                onHide={mClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Contact</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="text" className='form-control mb-3' placeholder='Enter name'  value={editC.name} onChange={(e)=>{setEditC({...editC,name:e.target.value})}}/>
                    <input type="text" className='form-control mb-3' placeholder='Enter phone number'  value={editC.phone} onChange={(e)=>{setEditC({...editC,phone:e.target.value})}}/>
                    <input type="text" className='form-control mb-3' placeholder='Enter Email address'  value={editC.email} onChange={(e)=>{setEditC({...editC,email:e.target.value})}}/>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={mClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={()=>{handleEdit(editC.id,editC)}}>Edit</Button>
                </Modal.Footer>
            </Modal>

            <div className='p-5' style={{height:'50vh'}}>
                {
                    contacts.length > 0 ?
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">PHONE</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contacts.map((item) => (
                                        <tr>
                                            <th scope="row">{item.id}</th>
                                            <td>{item.name}</td>
                                            <td>{item.phone}</td>
                                            <td>{item.email}</td>
                                            <td><button className='btn' onClick={()=>{mShow(item)}}><i className="fa-solid fa-pen-to-square" /></button></td>
                                            <td><button className='btn' onClick={() => { handleDelete(item.id, item) }}><i className="fa-solid fa-trash" /></button></td>
                                            <td><button className='btn' onClick={() => { handleFav(item) }}><i className="fa-solid fa-star" /></button></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        :
                        <h1>No contacts available!!</h1>
                }
            </div>
        </>
    )
}

export default Home