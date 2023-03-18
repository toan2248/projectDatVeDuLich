import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import "../../../../styles/placeTravel/listPlaceTravel.scss"
import FormInsertSchedulePlaceTravel from './FormInsertSchedulePlaceTravel';
import FormUpdateSchedulePlaceTravel from './FormUpdateSchedulePlaceTravel';
import TableListSchedulePlaceTravel from './TableListSchedulePlaceTravel';

let SchedulePlaceTravel = () => {

    const [isClickBtnInsert, setIsClickBtnInsert] = useState(false)
    const [isClickInsert, setIsClickInsert] = useState(false)
    const [isClickBtnUpdate, setIsClickBtnUpdate] = useState(false)
    const [isClickUpdat, setIsClickUpdate] = useState(false)
    const [refreshTablePlaceTravel, setRefreshTablePlaceTravel] = useState("")
    const [rowselected, setRowselected] = useState("")
    const [searchSchedulePlaceTravel, setSearchSchedulePlaceTravel] = useState("")
    const [listSearchSchedulePlaceTravel, setListSearchSchedulePlaceTravel] = useState([])
    const [listIdPlaceTravel, setListIdPlaceTravel] = useState([])

    useEffect(() => {
        let getAPIListPlaceTravel = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-schedule-place-travel")
            setListSearchSchedulePlaceTravel(res.data.schedulePlaceTravel)
        }
        getAPIListPlaceTravel()
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
                title: 'Bạn có chắc muốn xóa lịch trình này không?',
                text: "Chọn 'Yes, delete it!' để xóa hoặc chọn 'Cancel' để hủy",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let res = await axios.post("http://localhost:8080/api/place-travel/delete-schedule-place-travel", {scheduleID : rowselected.scheduleID})
                    if(res.data.delete){
                        Swal.fire(
                        'Xóa Lịch Trình Thành Công!!!',
                        'You clicked the button!',
                        'success'
                        )

                        getIdPlaceTravel(`delete ${rowselected.scheduleID}`)
                    }
                    else{
                        Swal.fire({
                        icon: 'error',
                        title: 'Xóa Lịch Trình Thất Bại',
                        // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                        })
                    }
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Vui Lòng Chọn Lịch Trình Cần Xóa',
                // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                })
        }
    }

    let handleChangeSearchPlaceTravel = async(event) => {
        setSearchSchedulePlaceTravel(event.target.value)
        let res = await axios.post("http://localhost:8080/api/place-travel/list-schedule-place-travel-byID", {
            scheduleID : event.target.value
        })
        setListSearchSchedulePlaceTravel(res.data.listSchedulePlaceTravel)
    }

    let UpdateFilterPlaceTravel = (listPlaceTravel) => {
        setListSearchSchedulePlaceTravel(listPlaceTravel)
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
                        <Button className='btn' variant="success" onClick={handleClickBtnInsert}>Thêm Lịch Trình</Button>{' '}
                        <Button className='btn' variant="primary" onClick={handleClickBtnUPdate}>Cập Nhật Lịch Trình</Button>{' '}
                        <Button className='btn' variant="danger" onClick={handleClickDelete}>Xóa Lịch Trình</Button>{' '}
                    </div>
                    <div className='search-place-travel'>
                        <input type={"text"} value={searchSchedulePlaceTravel} className="input-search" placeholder='Nhập ID...'
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
                        <FormInsertSchedulePlaceTravel getIdPlaceTravel = {getIdPlaceTravel} listIdPlaceTravel = {listIdPlaceTravel}/>
                        :
                        (
                            isClickBtnUpdate
                            ?
                            <FormUpdateSchedulePlaceTravel 
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
                <TableListSchedulePlaceTravel 
                listSearchSchedulePlaceTravel = {listSearchSchedulePlaceTravel} 
                getRowSelected = {getRowSelected} 
                displayFormUpdate = {displayFormUpdate} 
                UpdateFilterPlaceTravel = {UpdateFilterPlaceTravel}
                listIdPlaceTravel = {listIdPlaceTravel}
                />
            </div>
        </div>
    );
}

export default SchedulePlaceTravel