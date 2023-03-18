import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'
import { BsFillFileEarmarkImageFill } from "react-icons/bs";
import { MdSystemUpdateAlt } from "react-icons/md";
import 'sweetalert2/src/sweetalert2.scss'

import "../../../../styles/placeTravel/formInsertPlaceTravel.scss"

let FormUpdateDiscountTravel = ({rowselected, getIdPlaceTravel, isClickBtnUpdate, listIdPlaceTravel}) => {

    const [discountID, setDiscountID] = useState("")
    const [percent, setPercent] = useState(0)
    const [dateStartDiscount, setDateStartDiscount] = useState("")
    const [dateEndDiscount, setDateEndDiscount] = useState("")
    const [placeTravelID, setPlaceTravelID] = useState(rowselected.placeTravelID)

    useEffect(() => {
        setDiscountID(rowselected.discountID)
        setPercent(rowselected.percent)
        setDateStartDiscount(rowselected.dateStartDiscount)
        setDateEndDiscount(rowselected.dateEndDiscount)
        setPlaceTravelID(rowselected.placeTravelID)
    }, [rowselected])

    useEffect(() => {
        if(!isClickBtnUpdate){
            setDiscountID("")
            setPercent("")
            setDateStartDiscount("")
            setDateEndDiscount("")
            setPlaceTravelID("")
        }
    }, [isClickBtnUpdate])

    let handleClickUpdate = async() => {
        let res = await axios.put("http://localhost:8080/api/place-travel/update-discount-travel", {
            discountID : discountID,
            percent : percent,
            dateStartDiscount : dateStartDiscount,
            dateEndDiscount : dateEndDiscount,
            placeTravelID : placeTravelID,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Chiết Khấu Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${discountID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Chiết Khấu Du Lịch Thất Bại',
            // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>CẬP NHẬT CHIẾT KHẤU DU LỊCH</span>
            <div className='container-form container-form-update'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã giảm giá</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={discountID} onChange = {(event) => setDiscountID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Phần trăm giảm giá</Form.Label>
                        <Form.Control type="number" min={"0"} max={"100"} placeholder="" value={percent} onChange = {(event) => setPercent(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Mã du lịch</Form.Label>
                        <Form.Select defaultValue={placeTravelID} onChange = {(event) => setPlaceTravelID(event.target.value)}>
                            <option value={rowselected.placeTravelID}>{rowselected.placeTravelID}</option>
                            {listIdPlaceTravel.map((placeTravel) => {
                                if(placeTravel.placeTravelID !== rowselected.placeTravelID){
                                    return (
                                        <option key={placeTravel.placeTravelID} value={placeTravel.placeTravelID}>{placeTravel.placeTravelID}</option>
                                    )
                                }
                            })}
                            
                        </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Ngày áp dụng</Form.Label>
                        <Form.Control type="date" placeholder="" value={dateStartDiscount} onChange = {(event) => setDateStartDiscount(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control type="date" placeholder="" value={dateEndDiscount} onChange = {(event) => setDateEndDiscount(event.target.value)}/>
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

export default FormUpdateDiscountTravel