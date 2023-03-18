import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'
import { MdPostAdd } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";
import 'sweetalert2/src/sweetalert2.scss'

import "../../../../styles/placeTravel/formInsertPlaceTravel.scss"

let FormInsertComment = ({ getIdPlaceTravel, listIDDetailTravel}) => {

    const [commentID, setCommentID] = useState("")
    const [evaluate, setEvaluate] = useState(5)
    const [commentContent, setCommentContent] = useState("")
    const [date, setDate] = useState("")
    const [customerID, setCustomerID] = useState("")
    const [detailPlaceTravelID, setDetailPlaceTravelID] = useState("")


    let handleClickInsert = async() => {
        let res = await axios.post("http://localhost:8080/api/place-travel/insert-comment", {
            commentID : commentID,
            evaluate : evaluate,
            commentContent : commentContent,
            date : date,
            customerID : customerID,
            detailPlaceTravelID : detailPlaceTravelID,
        })
        if(res.data.insert){
            Swal.fire(
            'Thêm Bình Luận Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`insert ${commentID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Thêm Bình Luận Thất Bại',
            text: 'Bình Luận Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>THÊM BÌNH LUẬN</span>
            <div className='container-form'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã bình luận</Form.Label>
                        <Form.Control type="text" placeholder="" value={commentID} onChange = {(event) => setCommentID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Nội dung bình luận</Form.Label>
                        <Form.Control type="text" placeholder="" value={commentContent} onChange = {(event) => setCommentContent(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Sao đánh giá</Form.Label>
                        <Form.Select defaultValue={evaluate} onChange = {(event) => setEvaluate(event.target.value)}>
                            <option value={5}>5 sao</option>
                            <option value={4}>4 Sao</option>
                            <option value={3}>3 Sao</option>
                            <option value={2}>2 Sao</option>
                            <option value={1}>1 Sao</option>
                        </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Ngày bình luận</Form.Label>
                        <Form.Control type="date" placeholder="" value={date} onChange = {(event) => setDate(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Mã khách hàng</Form.Label>
                        <Form.Control type="text" placeholder="" value={customerID} onChange = {(event) => setCustomerID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Mã thông tin du lịch</Form.Label>
                        <Form.Select defaultValue={detailPlaceTravelID} onChange = {(event) => setDetailPlaceTravelID(event.target.value)}>
                            {listIDDetailTravel.map((detailTravel) => {
                                return (
                                    <option key={detailTravel.detailPlaceTravelID} value={detailTravel.detailPlaceTravelID}>{detailTravel.detailPlaceTravelID}</option>
                                )
                            })}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <div className='btn-insert'>
                    <Button variant="success" className='button' onClick={handleClickInsert}>
                        <MdPostAdd className='icon-post-travel'/> Thêm
                    </Button>{' '}
                </div>
            </div>
        </div>
    );
}

export default FormInsertComment