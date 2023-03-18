import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'
import { MdSystemUpdateAlt } from "react-icons/md";
import 'sweetalert2/src/sweetalert2.scss'

import "../../../../styles/placeTravel/formInsertPlaceTravel.scss"

let FormUpdateComment = ({rowselected, getIdPlaceTravel, isClickBtnUpdate, listIDDetailTravel}) => {

    const [commentID, setCommentID] = useState("")
    const [evaluate, setEvaluate] = useState(rowselected.evaluate)
    const [commentContent, setCommentContent] = useState("")
    const [date, setDate] = useState("")
    const [customerID, setCustomerID] = useState("")
    const [detailPlaceTravelID, setDetailPlaceTravelID] = useState(rowselected.detailPlaceTravelID)
    const [listStar, setListStar] = useState([])

    let arrayStar = [5,4,3,2,1]

    useEffect(() => {
        setCommentID(rowselected.commentID)
        setEvaluate(rowselected.evaluate)
        setCommentContent(rowselected.commentContent)
        setDate(rowselected.date)
        setCustomerID(rowselected.customerID)
        setDetailPlaceTravelID(rowselected.detailPlaceTravelID)
        setListStar(arrayStar.filter((star, index) => {
            return star !== rowselected.evaluate
        }))
    }, [rowselected])

    let handleClickUpdate = async() => {
        let res = await axios.put("http://localhost:8080/api/place-travel/update-comment", {
            commentID : commentID,
            evaluate : evaluate,
            commentContent : commentContent,
            date : date,
            customerID : customerID,
            detailPlaceTravelID : detailPlaceTravelID,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Bình Luận Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${commentID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Bình Luận Thất Bại',
            // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>CẬP NHẬT ĐỊA ĐIỂM DU LỊCH</span>
            <div className='container-form container-form-update'>
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
                        <Form.Select defaultValue={rowselected.evaluate} onChange = {(event) => setEvaluate(event.target.value)}>
                            <option value={rowselected.evaluate}>{rowselected.evaluate} sao</option>
                            {listStar.map((star, index) => {
                                console.log(star);
                                return <option key={star} value={star}>{star} sao</option>
                            })}
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
                            <option value={rowselected.detailPlaceTravelID}>{rowselected.detailPlaceTravelID}</option>
                            {listIDDetailTravel.map((detailTravel) => {
                                if(detailTravel.detailPlaceTravelID !== rowselected.detailPlaceTravelID){
                                    return (
                                        <option key={detailTravel.detailPlaceTravelID} value={detailTravel.detailPlaceTravelID}>{detailTravel.detailPlaceTravelID}</option>
                                    )
                                }
                            })}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <div className='btn-update'>
                    <Button variant="primary" className='button' onClick={handleClickUpdate}>
                        <MdSystemUpdateAlt className='icon-update-travel'/> Cập Nhật
                    </Button>{' '}
                </div>
            </div>
        </div>
    );
}

export default FormUpdateComment