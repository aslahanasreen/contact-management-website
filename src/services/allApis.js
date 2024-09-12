import axios from "axios";

const baseUrl = "https://contact-server-uink.onrender.com"

export const addContact = async(data) =>{
    return await axios.post(`${baseUrl}/contacts`,data)
}

export const getContact = async() =>{
    return await axios.get(`${baseUrl}/contacts`)
}

export const dltContact = async(id,data) =>{
    return await axios.delete(`${baseUrl}/contacts/${id}`,data)
}

export const checkFav = async(id,nm) =>{
    return await axios.get(`${baseUrl}/favourites?id=${id}&name=${nm}`)
}

export const addFav = async(data) =>{
    return await axios.post(`${baseUrl}/favourites`,data)
}

export const getFav = async() =>{
    return await axios.get(`${baseUrl}/favourites`)
}

export const dltFav = async(id,data) =>{
    return await axios.delete(`${baseUrl}/favourites/${id}`,data)
}

export const editContact = async(id,data) =>{
    return await axios.put(`${baseUrl}/contacts/${id}`,data)
}