import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import "../../../styles/placeTravel/listPlaceTravel.scss"
import FormInsertTicket from './FormInsertTicket';
import FormUpdateTicket from './FormUpdateTicket';
import TableListTicket from './TableListTicket';

let ListTicket = () => {

    const [isClickBtnInsert, setIsClickBtnInsert] = useState(false)
    const [isClickInsert, setIsClickInsert] = useState(false)
    const [isClickBtnUpdate, setIsClickBtnUpdate] = useState(false)
    const [isClickUpdat, setIsClickUpdate] = useState(false)
    const [refreshTablePlaceTravel, setRefreshTablePlaceTravel] = useState("")
    const [rowselected, setRowselected] = useState("")
    const [searchTicket, setSearchTicket] = useState("")
    const [listSearchTicket, setListSearchTicket] = useState([])
    const [listIdPlaceTravel, setListIdPlaceTravel] = useState([])

    useEffect(() => {
        let getAPIListTicket = async() => {
            let res = await axios.get("http://localhost:8080/api/customer/list-ticket")
            setListSearchTicket(res.data.ticket)
        }
        getAPIListTicket()
    }, [refreshTablePlaceTravel])

    useEffect(() => {
        let getAPIListIDPlaceTravel = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-id-place-travel")
            setListIdPlaceTravel(res.data.placeTravels)
        }
        getAPIListIDPlaceTravel()
    }, [])

    let handleClickBtnInsert = () => {
        if(isClickBtnInsert){
            setIsClickInsert(false)
            setTimeout(() => {
                setIsClickBtnInsert(false)
            }, 500)
        }
        else{
            setIsClickBtnInsert(true)
            setIsClickInsert(true)
            setIsClickUpdate(false)
            setTimeout(() => {
                setIsClickBtnUpdate(false)
            }, 500)
        }
    }

    let handleClickBtnUPdate = () => {
        if(isClickBtnUpdate){
            setIsClickUpdate(false)
            setTimeout(() => {
                setIsClickBtnUpdate(false)
            }, 500)
        }
        else{
            setIsClickBtnUpdate(true)
            setIsClickUpdate(true)
            setIsClickInsert(false)
            setTimeout(() => {
                setIsClickBtnInsert(false)
            }, 500)
        }
    }

    let handleClickDelete = async() => {
        if(isClickBtnUpdate){
            Swal.fire({
                title: 'Bạn có chắc muốn xóa vé du lịch này không?',
                text: "Chọn 'Yes, delete it!' để xóa hoặc chọn 'Cancel' để hủy",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let res = await axios.post("http://localhost:8080/api/customer/delete-ticket", {ticketID : rowselected.ticketID})
                    if(res.data.delete){
                        Swal.fire(
                        'Xóa vé du lịch Thành Công!!!',
                        'You clicked the button!',
                        'success'
                        )

                        getIdPlaceTravel(`delete ${rowselected.ticketID}`)
                    }
                    else{
                        Swal.fire({
                        icon: 'error',
                        title: 'Xóa vé du lịch Thất Bại',
                        // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                        })
                    }
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Vui Lòng Chọn vé du lịch Cần Xóa',
                // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                })
        }
    }

    let handleChangeSearchPlaceTravel = async(event) => {
        setSearchTicket(event.target.value)
        let res = await axios.post("http://localhost:8080/api/customer/list-ticket-byID", {
            ticketID : event.target.value
        })
        setListSearchTicket(res.data.listTicket)
    }

    let UpdateFilterPlaceTravel = (listPlaceTravel) => {
        setListSearchTicket(listPlaceTravel)
    }

    let displayFormUpdate = () => {
        setIsClickBtnUpdate(true)
        setIsClickUpdate(true)
        setIsClickInsert(false)
        setTimeout(() => {
            setIsClickBtnInsert(false)
        }, 500)
    }

    let getIdPlaceTravel = (state) => {
        console.log(refreshTablePlaceTravel === state);
        if(refreshTablePlaceTravel === state){
            setRefreshTablePlaceTravel(state + "1")
        }
        else{
            setRefreshTablePlaceTravel(state)
        }
    }

    let getRowSelected = (placeTravel) => {
        setRowselected(placeTravel)
        setIsClickInsert(false)
        setTimeout(() => {
            setIsClickBtnInsert(false)
        }, 500)
        setIsClickBtnUpdate(true)
    }

    return (
        <div className='list-place-travel'>
            <div className=' form-travel'>
                <div className='CRUD-place-travel'>
                    <div className='btn-IUD'>
                        <Button className='btn' variant="success" onClick={handleClickBtnInsert}>Thêm Vé</Button>{' '}
                        <Button className='btn' variant="primary" onClick={handleClickBtnUPdate}>Cập Nhật Vé</Button>{' '}
                        <Button className='btn' variant="danger" onClick={handleClickDelete}>Xóa Vé</Button>{' '}
                    </div>
                    <div className='search-place-travel'>
                        <input type={"text"} value={searchTicket} className="input-search" placeholder='Nhập ID...'
                        onChange={(event) => handleChangeSearchPlaceTravel(event)}
                        />
                    </div>
                </div>

                <div className='form' style={isClickInsert ? {
                    height : isClickInsert ? "270px" : "0px",
                    zIndex : isClickInsert ? "10" : "-1",
                } : {
                    height : isClickUpdat ? "270px" : "0px",
                    zIndex : isClickUpdat ? "10" : "-1",
                }}>
                    {
                        isClickBtnInsert
                        ?
                        <FormInsertTicket getIdPlaceTravel = {getIdPlaceTravel} listIdPlaceTravel = {listIdPlaceTravel}/>
                        :
                        (
                            isClickBtnUpdate
                            ?
                            <FormUpdateTicket 
                                rowselected = {rowselected} 
                                getIdPlaceTravel = {getIdPlaceTravel} 
                                isClickBtnUpdate = {isClickBtnUpdate}
                                listIdPlaceTravel = {listIdPlaceTravel}
                            />
                            :
                            ""
                        )
                    }
                </div>
            </div>
            <div className='table-list-travel'>
                <TableListTicket 
                listSearchTicket = {listSearchTicket} 
                getRowSelected = {getRowSelected} 
                displayFormUpdate = {displayFormUpdate} 
                UpdateFilterPlaceTravel = {UpdateFilterPlaceTravel}
                listIdPlaceTravel = {listIdPlaceTravel}
                />
            </div>
        </div>
    );
}

export default ListTicket