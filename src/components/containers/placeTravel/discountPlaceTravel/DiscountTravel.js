import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import "../../../../styles/placeTravel/listPlaceTravel.scss"
import FormInsertDiscountTravel from './FormInsertDiscountTravel';
import FormInsertPlaceTravel from './FormInsertDiscountTravel';
import FormUpdateDiscountTravel from './FormUpdateDiscountTravel';
import FormUpdatePlaceTravel from './FormUpdateDiscountTravel';
import TableListDiscountTravel from './TableListDiscountTravel';
import TableListPlaceTravel from "./TableListDiscountTravel";

let DiscountTravel = () => {

    const [isClickBtnInsert, setIsClickBtnInsert] = useState(false)
    const [isClickInsert, setIsClickInsert] = useState(false)
    const [isClickBtnUpdate, setIsClickBtnUpdate] = useState(false)
    const [isClickUpdat, setIsClickUpdate] = useState(false)
    const [refreshTablePlaceTravel, setRefreshTablePlaceTravel] = useState("")
    const [rowselected, setRowselected] = useState("")
    const [searchPlaceTravel, setSearchPlaceTravel] = useState("")
    const [listSearchDiscountTravel, setListSearchDiscountTravel] = useState([])
    const [listIdPlaceTravel, setListIdPlaceTravel] = useState([])

    useEffect(() => {
        let getAPIListPlaceTravel = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-discount-travel")
            setListSearchDiscountTravel(res.data.discountTravels)
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
                title: 'Bạn có chắc muốn xóa chiết khấu này không?',
                text: "Chọn 'Yes, delete it!' để xóa hoặc chọn 'Cancel' để hủy",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let res = await axios.post("http://localhost:8080/api/place-travel/delete-discount-travel", {discountID : rowselected.discountID})
                    if(res.data.delete){
                        Swal.fire(
                        'Xóa Chiết Khấu Thành Công!!!',
                        'You clicked the button!',
                        'success'
                        )

                        getIdPlaceTravel(`delete ${rowselected.discountID}`)
                    }
                    else{
                        Swal.fire({
                        icon: 'error',
                        title: 'Xóa Chiết Khấu Thất Bại',
                        // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                        })
                    }
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Vui Lòng Chọn Chiết Khấu Cần Xóa',
                // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                })
        }
    }

    let handleChangeSearchPlaceTravel = async(event) => {
        setSearchPlaceTravel(event.target.value)
        let res = await axios.post("http://localhost:8080/api/place-travel/list-discount-travel-byID", {
            discountID : event.target.value
        })
        setListSearchDiscountTravel(res.data.listDiscountTravel)
    }

    let UpdateFilterPlaceTravel = (listPlaceTravel) => {
        setListSearchDiscountTravel(listPlaceTravel)
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

    let getRowSelected = (discountTravel) => {
        setRowselected(discountTravel)
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
                        <Button className='btn' variant="success" onClick={handleClickBtnInsert}>Thêm Giảm Giá</Button>{' '}
                        <Button className='btn' variant="primary" onClick={handleClickBtnUPdate}>Cập Nhật Giảm Giá</Button>{' '}
                        <Button className='btn' variant="danger" onClick={handleClickDelete}>Xóa Giảm Giá</Button>{' '}
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
                        <FormInsertDiscountTravel getIdPlaceTravel = {getIdPlaceTravel} listIdPlaceTravel = {listIdPlaceTravel}/>
                        :
                        (
                            isClickBtnUpdate
                            ?
                            <FormUpdateDiscountTravel 
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
                <TableListDiscountTravel 
                listSearchDiscountTravel = {listSearchDiscountTravel} 
                getRowSelected = {getRowSelected} 
                displayFormUpdate = {displayFormUpdate} 
                UpdateFilterPlaceTravel = {UpdateFilterPlaceTravel}
                listIdPlaceTravel = {listIdPlaceTravel}
                />
            </div>
        </div>
    );
}

export default DiscountTravel