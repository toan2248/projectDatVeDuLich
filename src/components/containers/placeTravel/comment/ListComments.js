import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2'

import "../../../../styles/placeTravel/listPlaceTravel.scss"
import FormInsertComment from './FormInsertComment';
import FormUpdateComment from './FormUpdateComment';
import TableListComments from './TableListComments';

let ListComments = () => {

    const [isClickBtnInsert, setIsClickBtnInsert] = useState(false)
    const [isClickInsert, setIsClickInsert] = useState(false)
    const [isClickBtnUpdate, setIsClickBtnUpdate] = useState(false)
    const [isClickUpdat, setIsClickUpdate] = useState(false)
    const [refreshTablePlaceTravel, setRefreshTablePlaceTravel] = useState("")
    const [rowselected, setRowselected] = useState("")
    const [searchComment, setSearchComment] = useState("")
    const [listSearchComment, setListSearchComment] = useState([])
    const [listIDDetailTravel, setListIDDetailTravel] = useState([])

    useEffect(() => {
        let getAPIListComment = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-comments")
            setListSearchComment(res.data.comments)
        }
        getAPIListComment()
    }, [refreshTablePlaceTravel])

    useEffect(() => {
        let getAPIListIDDetailTravel = async() => {
            let res = await axios.get("http://localhost:8080/api/place-travel/list-ID-detailTravel")
            setListIDDetailTravel(res.data.listIDDetailTravel)
        }
        getAPIListIDDetailTravel()
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
                title: 'Bạn có chắc muốn xóa bình luận này không?',
                text: "Chọn 'Yes, delete it!' để xóa hoặc chọn 'Cancel' để hủy",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
                }).then(async(result) => {
                if (result.isConfirmed) {
                    let res = await axios.post("http://localhost:8080/api/place-travel/delete-comment", {commentID : rowselected.commentID})
                    if(res.data.delete){
                        Swal.fire(
                        'Xóa Bình Luận Thành Công!!!',
                        'You clicked the button!',
                        'success'
                        )

                        getIdPlaceTravel(`delete ${rowselected.commentID}`)
                    }
                    else{
                        Swal.fire({
                        icon: 'error',
                        title: 'Xóa Bình Luận Thất Bại',
                        // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                        })
                    }
                }
            })
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Vui Lòng Chọn Bình Luận Cần Xóa',
                // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
                })
        }
    }

    let handleChangeSearchPlaceTravel = async(event) => {
        setSearchComment(event.target.value)
        let res = await axios.post("http://localhost:8080/api/place-travel/list-comment-byID", {
            commentID : event.target.value
        })
        setListSearchComment(res.data.listComment)
    }

    let UpdateFilterPlaceTravel = (listPlaceTravel) => {
        setListSearchComment(listPlaceTravel)
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
                        <Button className='btn' variant="success" onClick={handleClickBtnInsert}>Thêm Bình Luận</Button>{' '}
                        <Button className='btn' variant="primary" onClick={handleClickBtnUPdate}>Cập Nhật Bình Luận</Button>{' '}
                        <Button className='btn' variant="danger" onClick={handleClickDelete}>Xóa Bình Luận</Button>{' '}
                    </div>
                    <div className='search-place-travel'>
                        <input type={"text"} value={searchComment} className="input-search" placeholder='Nhập ID...'
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
                        <FormInsertComment getIdPlaceTravel = {getIdPlaceTravel} listIDDetailTravel = {listIDDetailTravel}/>
                        :
                        (
                            isClickBtnUpdate
                            ?
                            <FormUpdateComment 
                                rowselected = {rowselected} 
                                getIdPlaceTravel = {getIdPlaceTravel} 
                                isClickBtnUpdate = {isClickBtnUpdate}
                                listIDDetailTravel = {listIDDetailTravel}
                            />
                            :
                            ""
                        )
                    }
                </div>
            </div>
            <div className='table-list-travel'>
                <TableListComments 
                listSearchComment = {listSearchComment} 
                getRowSelected = {getRowSelected} 
                displayFormUpdate = {displayFormUpdate} 
                UpdateFilterPlaceTravel = {UpdateFilterPlaceTravel}
                listIDDetailTravel = {listIDDetailTravel}
                />
            </div>
        </div>
    );
}

export default ListComments