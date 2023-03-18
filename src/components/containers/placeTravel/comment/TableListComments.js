import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';
import { AiFillStar } from "react-icons/ai";


import "../../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListComments = ({
        listSearchComment, 
        getRowSelected , 
        displayFormUpdate, 
        UpdateFilterPlaceTravel,
        listIDDetailTravel,
    }) => {

    const [filter, setFilter] = useState("all")

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/place-travel/get-comment", {commentID : id})
        displayFormUpdate()
        window.scroll(0,0)
        getRowSelected(res.data.comment)
    }

    let handleChangeFilter = async(event) => {
        setFilter(event.target.value)

        let res = await axios.post("http://localhost:8080/api/place-travel/list-comment-byType", {type : event.target.value})
        UpdateFilterPlaceTravel(res.data.listComment)
    }


    return (
        <>
            <div className='filter-title'>
                <div className='filter'>
                    <Form className='form'>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Lọc theo thông tin du lịch</Form.Label>
                        <Form.Select defaultValue={filter} onChange = {(event) => handleChangeFilter(event)}>
                            <option value={"all"}>Tất Cả</option>
                            {listIDDetailTravel.map((detailPlaceTravel) => {
                                return (
                                    <option key={detailPlaceTravel.detailPlaceTravelID} value={detailPlaceTravel.detailPlaceTravelID}>
                                        {detailPlaceTravel.detailPlaceTravelID}
                                    </option>
                                )
                            })}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <span className='title-table-travel'>DANH SÁCH BÌNH LUẬN CỦA KHÁCH HÀNG</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Sao Đánh Giá</th>
                            <th>Nội Dung Bình Luận</th>
                            <th>Ngày Bình Luận</th>
                            <th>Mã Khách Hàng Đánh Giá</th>
                            <th>Mã Thông Tin Du Lịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchComment.map((comment) => {
                            let date = new Date(comment.date)
                            let arrayStart = []
                            for(let i = 0; i < comment.evaluate; i++){
                                arrayStart.push("star")
                            }
                            return (
                                <tr key={comment.id} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(comment.commentID)}>
                                    <td>{comment.commentID}</td>
                                    <td>{
                                        arrayStart.map((star) => {
                                            return (<AiFillStar/>)
                                        })
                                    }{`(${comment.evaluate})`}</td>
                                    <td style={{wordBreak : "break-word", maxWidth : "400px"}}>{comment.commentContent}</td>
                                    <td>{date.toLocaleDateString("en-GB")}</td>
                                    <td>{comment.customerID}</td>
                                    <td>{comment.detailPlaceTravelID}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListComments