import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import "../../../../styles/placeTravel/listPlaceTravel.scss"
import FormInsertSaleTravel from './FormInsertSaleTravel';
import FormUpdateSaleTravel from './FormUpdateSaleTravel';
import TableListSaleTravel from './TableListSaleTravel';

let SaleTravel = () => {

    const [isClickBtnInsert, setIsClickBtnInsert] = useState(false)
    const [isClickInsert, setIsClickInsert] = useState(false)
    const [isClickBtnUpdate, setIsClickBtnUpdate] = useState(false)
    const [isClickUpdat, setIsClickUpdate] = useState(false)
    const [refreshTablePlaceTravel, setRefreshTablePlaceTravel] = useState("")
    const [rowselected, setRowselected] = useState("")
    const [searchPlaceTravel, setSearchPlaceTravel] = useState("")
    const [listSearchSaleTravel, setListSearchSaleTravel] = useState([])
    const [listIdPlaceTravel, setListIdPlaceTravel] = useState([])

    useEffect(() => {
        let getAPIListSaleTravel = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-sale-travel")
            setListSearchSaleTravel(res.data.saleTravels)
        }
        getAPIListSaleTravel()
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
                title: 'Bạn có chắc muốn xóa mã giảm giá này không?',
                text: "Chọn 'Yes, delete it!' để xóa hoặc chọn 'Cancel' để hủy",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let res = await axios.post("http://localhost:8080/api/place-travel/delete-sale-travel", {saleID : rowselected.saleID})
                    if(res.data.delete){
                        Swal.fire(
                        'Xóa Mã Giảm Giá Thành Công!!!',
                        'You clicked the button!',
                        'success'
                        )

                        getIdPlaceTravel(`delete ${rowselected.saleID}`)
                    }
                    else{
                        Swal.fire({
                        icon: 'error',
                        title: 'Xóa Mã Giảm Giá Thất Bại',
                        // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                        })
                    }
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Vui Lòng Chọn Mã Giảm Giá Cần Xóa',
                // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                })
        }
    }

    let handleChangeSearchPlaceTravel = async(event) => {
        setSearchPlaceTravel(event.target.value)
        let res = await axios.post("http://localhost:8080/api/place-travel/list-sale-travel-byID", {
            saleID : event.target.value
        })
        setListSearchSaleTravel(res.data.listSaleTravel)
    }

    let UpdateFilterPlaceTravel = (listPlaceTravel) => {
        setListSearchSaleTravel(listPlaceTravel)
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
        if(refreshTablePlaceTravel === state){
            setRefreshTablePlaceTravel(state + "1")
        }
        else{
            setRefreshTablePlaceTravel(state)
        }
    }

    let getRowSelected = (saleTravel) => {
        setRowselected(saleTravel)
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
                        <Button className='btn' variant="success" onClick={handleClickBtnInsert}>Thêm Mã Giảm Giá</Button>{' '}
                        <Button className='btn' variant="primary" onClick={handleClickBtnUPdate}>Cập Nhật Mã Giảm Giá</Button>{' '}
                        <Button className='btn' variant="danger" onClick={handleClickDelete}>Xóa Mã Giảm Giá</Button>{' '}
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
                        <FormInsertSaleTravel getIdPlaceTravel = {getIdPlaceTravel} listIdPlaceTravel = {listIdPlaceTravel}/>
                        :
                        (
                            isClickBtnUpdate
                            ?
                            < FormUpdateSaleTravel
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
                <TableListSaleTravel 
                listSearchSaleTravel = {listSearchSaleTravel} 
                getRowSelected = {getRowSelected} 
                displayFormUpdate = {displayFormUpdate} 
                UpdateFilterPlaceTravel = {UpdateFilterPlaceTravel}
                listIdPlaceTravel = {listIdPlaceTravel}
                />
            </div>
        </div>
    );
}

export default SaleTravel