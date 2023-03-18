import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import "../../../../styles/placeTravel/listPlaceTravel.scss"
import FormInsertDetailPlaceTravel from './FormInsertDetailPlaceTravel';
import FormUpdateDetailPlaceTravel from './FormUpdateDetailPlaceTravel';
import TableListDetailPlaceTravel from "./TableListDetailPlaceTravel"

let InformationPlaceTravel = () => {

    const [isClickBtnInsert, setIsClickBtnInsert] = useState(false)
    const [isClickInsert, setIsClickInsert] = useState(false)
    const [isClickBtnUpdate, setIsClickBtnUpdate] = useState(false)
    const [isClickUpdat, setIsClickUpdate] = useState(false)
    const [refreshTableDetailPlaceTravel, setRefreshTableDetailPlaceTravel] = useState("")
    const [rowselected, setRowselected] = useState("")
    const [searchDetailPlaceTravel, setSearchDetailPlaceTravel] = useState("")
    const [listSearchDetailPlaceTravel, setListSearchDetailPlaceTravel] = useState([])
    const [listTravelHasNotDetail, setListTravelHasNotDetail] = useState([])

    useEffect(() => {
        let getAPIListPlaceTravel = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-detail-place-travel")
            setListSearchDetailPlaceTravel(res.data.listDetail)
        }
        getAPIListPlaceTravel()
    }, [refreshTableDetailPlaceTravel])

    let handleClickBtnInsert = async() => {
        if(isClickBtnInsert){
            setIsClickInsert(false)
            setTimeout(() => {
                setIsClickBtnInsert(false)
            }, 500)
        }
        else{
            let res = await axios.get("http://localhost:8080/api/place-travel/list-place-travel-not-detail")
            setListTravelHasNotDetail(res.data.listIDTravelHasNotDetail)
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
                title: 'Bạn có chắc muốn xóa Thông Tin này không?',
                text: "Chọn 'Yes, delete it!' để xóa hoặc chọn 'Cancel' để hủy",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let res = await axios.post("http://localhost:8080/api/place-travel/delete-detail-place-travel", {detailPlaceTravelID : rowselected.detailPlaceTravelID})
                    if(res.data.delete){
                        Swal.fire(
                        'Xóa Thông Tin Thành Công!!!',
                        'You clicked the button!',
                        'success'
                        )

                        getIdPlaceTravel(`delete ${rowselected.detailPlaceTravelID}`)
                    }
                    else{
                        Swal.fire({
                        icon: 'error',
                        title: 'Xóa Thông Tin Thất Bại',
                        // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                        })
                    }
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Vui Lòng Chọn Thông Tin Cần Xóa',
                // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                })
        }
    }

    let handleChangeSearchDetailPlaceTravel = async(event) => {
        setSearchDetailPlaceTravel(event.target.value)
        let res = await axios.post("http://localhost:8080/api/place-travel/list-detail-place-travel-byID", {
            detailPlaceTravelID : event.target.value
        })
        setListSearchDetailPlaceTravel(res.data.listDetailPlaceTravel)
    }

    let UpdateFilterPlaceTravel = (listPlaceTravel) => {
        setListSearchDetailPlaceTravel(listPlaceTravel)
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
        console.log(refreshTableDetailPlaceTravel === state);
        if(refreshTableDetailPlaceTravel === state){
            setRefreshTableDetailPlaceTravel(state + "1")
        }
        else{
            setRefreshTableDetailPlaceTravel(state)
        }
    }

    let getRowSelected = (DetailplaceTravel) => {
        setRowselected(DetailplaceTravel)
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
                        <Button className='btn' variant="success" onClick={handleClickBtnInsert}>Thêm Thông Tin</Button>{' '}
                        <Button className='btn' variant="primary" onClick={handleClickBtnUPdate}>Cập Nhật Thông Tin</Button>{' '}
                        <Button className='btn' variant="danger" onClick={handleClickDelete}>Xóa Thông Tin</Button>{' '}
                    </div>
                    <div className='search-place-travel'>
                        <input type={"text"} value={searchDetailPlaceTravel} className="input-search" placeholder='Nhập ID...'
                        onChange={(event) => handleChangeSearchDetailPlaceTravel(event)}
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
                        <FormInsertDetailPlaceTravel getIdPlaceTravel = {getIdPlaceTravel} listTravelHasNotDetail = {listTravelHasNotDetail}/>
                        :
                        (
                            isClickBtnUpdate
                            ?
                            <FormUpdateDetailPlaceTravel
                                rowselected = {rowselected} 
                                getIdPlaceTravel = {getIdPlaceTravel} 
                                isClickBtnUpdate = {isClickBtnUpdate}
                                listTravelHasNotDetail = {listTravelHasNotDetail}
                            />
                            :
                            ""
                        )
                    }
                </div>
            </div>
            <div className='table-list-travel'>
                <TableListDetailPlaceTravel
                listSearchDetailPlaceTravel = {listSearchDetailPlaceTravel} 
                getRowSelected = {getRowSelected} 
                displayFormUpdate = {displayFormUpdate} 
                UpdateFilterPlaceTravel = {UpdateFilterPlaceTravel}
                />
            </div>
        </div>
    );
}

export default InformationPlaceTravel