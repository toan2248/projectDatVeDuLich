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

import "../../../styles/placeTravel/formInsertPlaceTravel.scss"

let FormUpdateTicket = ({rowselected, getIdPlaceTravel, isClickBtnUpdate, listIdPlaceTravel}) => {

    const [ticketID, setTicketID] = useState("")
    const [numberAdult, setNumberAdult] = useState("")
    const [numberChild, setNumberChild] = useState("")
    const [orderDate, setOrderDate] = useState("")
    const [expiry, setExpiry] = useState(true)
    const [scheduleID, setScheduleID] = useState(rowselected.scheduleID)
    const [customerID, setCustomerID] = useState("")
    const [placeTravelID, setPlaceTravelID] = useState(rowselected.placeTravelID)
    const [schedule, setSchedule] = useState([])

    useEffect(() => {
        setTicketID(rowselected.ticketID)
        setNumberAdult(rowselected.numberAdult)
        setNumberChild(rowselected.numberChild)
        setOrderDate(rowselected.orderDate)
        setExpiry(rowselected.expiry)
        setScheduleID(rowselected.scheduleID)
        setCustomerID(rowselected.customerID)
        setPlaceTravelID(rowselected.placeTravelID)
    }, [rowselected])
    let handleClickUpdate = async() => {
        let res = await axios.put("http://localhost:8080/api/customer/update-ticket", {
            ticketID : ticketID,
            numberAdult : numberAdult,
            numberChild : numberChild,
            orderDate : orderDate,
            expiry : expiry,
            scheduleID : scheduleID,
            customerID : customerID,
            placeTravelID : placeTravelID,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Vé Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${ticketID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Vé Du Lịch Thất Bại',
            // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    let handleChangePlaceTravelID = async(event) => {
        setPlaceTravelID(event.target.value)
        let res = await axios.post("http://localhost:8080/api/place-travel/list-schedule-place-travel-byIDTravel", {type : event.target.value})
        setSchedule(res.data.listSchedulePlaceTravel)
    } 

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>CẬP NHẬT VÉ DU LỊCH</span>
            <div className='container-form container-form-update'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã vé</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={ticketID} onChange = {(event) => setTicketID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Số người lớn</Form.Label>
                        <Form.Control type="number" placeholder="" value={numberAdult} onChange = {(event) => setNumberAdult(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Số trẻ em</Form.Label>
                        <Form.Control type="number" placeholder="" value={numberChild} onChange = {(event) => setNumberChild(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Khách hàng</Form.Label>
                        <Form.Control type="text" value={customerID} onChange = {(event) => setCustomerID(event.target.value)}/>
                        </Form.Group>

                    </Row>

                    <Row>

                        <Form.Group as={Col}>
                        <Form.Label>Mã du lịch</Form.Label>
                        <Form.Select defaultValue={rowselected.placeTravelID} onChange = {(event) => handleChangePlaceTravelID(event)}>
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

                        <Form.Group as={Col}>
                        <Form.Label>Mã Lịch Trình</Form.Label>
                        <Form.Select defaultValue={scheduleID} onChange = {(event) => setScheduleID(event.target.value)}>
                            <option value={rowselected.scheduleID}>{rowselected.scheduleID}</option>
                            {schedule.map((schedule) => {
                                return (
                                    <option key={schedule.id} value={schedule.scheduleID}>{schedule.scheduleID}</option>
                                )
                            })}
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Ngày đăng ký</Form.Label>
                        <Form.Control type="date" value={orderDate} onChange = {(event) => setOrderDate(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Hiệu lực</Form.Label>
                        <Form.Select defaultValue={expiry} onChange = {(event) => setExpiry(event.target.value)}>
                            <option value={true}>Hiệu Lực</option>
                            <option value={false}>Hết Hạn</option>
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

export default FormUpdateTicket