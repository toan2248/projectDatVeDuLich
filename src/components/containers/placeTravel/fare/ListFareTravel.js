import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import "../../../../styles/placeTravel/listPlaceTravel.scss"
import FormInsertFareTravel from './FormInsertFareTravel';
import FormUpdateFareTravel from './FormUpdateFareTravel';
import TableListFareTravel from './TableListFareTravel';

let ListFareTravel = () => {

    const [isClickBtnInsert, setIsClickBtnInsert] = useState(false)
    const [isClickInsert, setIsClickInsert] = useState(false)
    const [isClickBtnUpdate, setIsClickBtnUpdate] = useState(false)
    const [isClickUpdat, setIsClickUpdate] = useState(false)
    const [refreshTablePlaceTravel, setRefreshTablePlaceTravel] = useState("")
    const [rowselected, setRowselected] = useState("")
    const [searchFare, setSearchFare] = useState("")
    const [listSearchFare, setListSearchFare] = useState([])
    const [listTravelHasNotFare, setListTravelHasNotFare] = useState([])

    useEffect(() => {
        let getAPIListFare = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-fare-travel")
            setListSearchFare(res.data.fares)
        }
        getAPIListFare()
    }, [refreshTablePlaceTravel])

    let handleClickBtnInsert = async() => {
        if(isClickBtnInsert){
            setIsClickInsert(false)
            setTimeout(() => {
                setIsClickBtnInsert(false)
            }, 500)
        }
        else{
            let res = await axios.get("http://localhost:8080/api/place-travel/list-place-travel-not-fare")
            setListTravelHasNotFare(res.data.listIDTravelHasNotFare)
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
                title: 'Bạn có chắc muốn xóa giá Vé này không?',
                text: "Chọn 'Yes, delete it!' để xóa hoặc chọn 'Cancel' để hủy",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let res = await axios.post("http://localhost:8080/api/place-travel/delete-fare-travel", {fareID : rowselected.fareID})
                    if(res.data.delete){
                        Swal.fire(
                        'Xóa Giá Vé Thành Công!!!',
                        'You clicked the button!',
                        'success'
                        )

                        getIdPlaceTravel(`delete ${rowselected.fareID}`)
                    }
                    else{
                        Swal.fire({
                        icon: 'error',
                        title: 'Xóa Giá Vé Thất Bại',
                        // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                        })
                    }
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Vui Lòng Chọn Giá Vé Cần Xóa',
                // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                })
        }
    }

    let handleChangeSearchPlaceTravel = async(event) => {
        setSearchFare(event.target.value)
        let res = await axios.post("http://localhost:8080/api/place-travel/list-fare-travel-byID", {
            fareID : event.target.value
        })
        setListSearchFare(res.data.listFareTravel)
    }

    let UpdateFilterPlaceTravel = (listPlaceTravel) => {
        setListSearchFare(listPlaceTravel)
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
                        <Button className='btn' variant="success" onClick={handleClickBtnInsert}>Thêm Giá Vé</Button>{' '}
                        <Button className='btn' variant="primary" onClick={handleClickBtnUPdate}>Cập Nhật Giá Vé</Button>{' '}
                        <Button className='btn' variant="danger" onClick={handleClickDelete}>Xóa Giá Vé</Button>{' '}
                    </div>
                    <div className='search-place-travel'>
                        <input type={"text"} value={searchFare} className="input-search" placeholder='Nhập ID...'
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
                        <FormInsertFareTravel getIdPlaceTravel = {getIdPlaceTravel} listTravelHasNotFare = {listTravelHasNotFare}/>
                        :
                        (
                            isClickBtnUpdate
                            ?
                            <FormUpdateFareTravel 
                                rowselected = {rowselected} 
                                getIdPlaceTravel = {getIdPlaceTravel} 
                                isClickBtnUpdate = {isClickBtnUpdate}
                                listTravelHasNotFare = {listTravelHasNotFare}
                            />
                            :
                            ""
                        )
                    }
                </div>
            </div>
            <div className='table-list-travel'>
                <TableListFareTravel 
                listSearchFare = {listSearchFare} 
                getRowSelected = {getRowSelected} 
                displayFormUpdate = {displayFormUpdate} 
                UpdateFilterPlaceTravel = {UpdateFilterPlaceTravel}
                />
            </div>
        </div>
    );
}

export default ListFareTravel