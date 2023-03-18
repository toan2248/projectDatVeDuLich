import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import "../../../../styles/placeTravel/listPlaceTravel.scss"
import FormInsertPlaceTravel from './FormInsertPlaceTravel';
import FormUpdatePlaceTravel from './FormUpdatePlaceTravel';
import TableListPlaceTravel from "./TableListPlaceTravel";

let ListPlaceTravel = () => {

    const [isClickBtnInsert, setIsClickBtnInsert] = useState(false)
    const [isClickInsert, setIsClickInsert] = useState(false)
    const [isClickBtnUpdate, setIsClickBtnUpdate] = useState(false)
    const [isClickUpdat, setIsClickUpdate] = useState(false)
    const [refreshTablePlaceTravel, setRefreshTablePlaceTravel] = useState("")
    const [rowselected, setRowselected] = useState("")
    const [searchPlaceTravel, setSearchPlaceTravel] = useState("")
    const [listSearchPlaceTravel, setListSearchPlaceTravel] = useState([])

    let number = Number(10)
    console.log();

    useEffect(() => {
        let getAPIListPlaceTravel = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-place-travel")
            setListSearchPlaceTravel(res.data.placeTravels)
        }
        getAPIListPlaceTravel()
    }, [refreshTablePlaceTravel])

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
                title: 'Bạn có chắc muốn xóa địa điểm du lịch này không?',
                text: "Chọn 'Yes, delete it!' để xóa hoặc chọn 'Cancel' để hủy",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let res = await axios.post("http://localhost:8080/api/place-travel/delete-place-travel", {placeTravelID : rowselected.placeTravelID})
                    if(res.data.delete){
                        Swal.fire(
                        'Xóa Địa Điểm Du Lịch Thành Công!!!',
                        'You clicked the button!',
                        'success'
                        )

                        getIdPlaceTravel(`delete ${rowselected.placeTravelID}`)
                    }
                    else{
                        Swal.fire({
                        icon: 'error',
                        title: 'Xóa Địa Điểm Du Lịch Thất Bại',
                        // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                        })
                    }
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Vui Lòng Chọn Địa Điểm Du Lịch Cần Xóa',
                // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                })
        }
    }

    let handleChangeSearchPlaceTravel = async(event) => {
        setSearchPlaceTravel(event.target.value)
        let res = await axios.post("http://localhost:8080/api/place-travel/list-place-travel-byID", {
            placeTravelID : event.target.value
        })
        setListSearchPlaceTravel(res.data.listPlaceTravel)
    }

    let UpdateFilterPlaceTravel = (listPlaceTravel) => {
        setListSearchPlaceTravel(listPlaceTravel)
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
                        <Button className='btn' variant="success" onClick={handleClickBtnInsert}>Thêm Địa Điểm</Button>{' '}
                        <Button className='btn' variant="primary" onClick={handleClickBtnUPdate}>Cập Nhật Địa Điểm</Button>{' '}
                        <Button className='btn' variant="danger" onClick={handleClickDelete}>Xóa Địa Điểm</Button>{' '}
                    </div>
                    <div className='search-place-travel'>
                        <input type={"text"} value={searchPlaceTravel} className="input-search" placeholder='Nhập ID...'
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
                        <FormInsertPlaceTravel getIdPlaceTravel = {getIdPlaceTravel}/>
                        :
                        (
                            isClickBtnUpdate
                            ?
                            <FormUpdatePlaceTravel 
                                rowselected = {rowselected} 
                                getIdPlaceTravel = {getIdPlaceTravel} 
                                isClickBtnUpdate = {isClickBtnUpdate}
                            />
                            :
                            ""
                        )
                    }
                </div>
            </div>
            <div className='table-list-travel'>
                <TableListPlaceTravel 
                listSearchPlaceTravel = {listSearchPlaceTravel} 
                getRowSelected = {getRowSelected} 
                displayFormUpdate = {displayFormUpdate} 
                UpdateFilterPlaceTravel = {UpdateFilterPlaceTravel}
                />
            </div>
        </div>
    );
}

export default ListPlaceTravel