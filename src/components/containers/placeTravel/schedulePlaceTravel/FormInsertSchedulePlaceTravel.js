import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'
import { MdPostAdd } from "react-icons/md";
import 'sweetalert2/src/sweetalert2.scss'

import "../../../../styles/placeTravel/formInsertPlaceTravel.scss"

let FormInsertSchedulePlaceTravel = ({ getIdPlaceTravel, listIdPlaceTravel}) => {

    const [scheduleID, setScheduleID] = useState("")
    const [departureDay, setDepartureDay] = useState("")
    const [departureTime, setDepartureTime] = useState("")
    const [period, setPeriod] = useState("")
    const [placeTravelID, setPlaceTravelID] = useState(listIdPlaceTravel[0].placeTravelID)


    let handleClickInsert = async() => {
        let res = await axios.post("http://localhost:8080/api/place-travel/insert-schedule-place-travel", {
            scheduleID : scheduleID,
            departureDay : departureDay,
            departureTime : departureTime,
            period : period,
            placeTravelID : placeTravelID,
        })
        if(res.data.insert){
            Swal.fire(
            'Thêm Lịch Trình Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`insert ${scheduleID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Thêm Lịch Trình Du Lịch Thất Bại',
            text: 'Lịch Trình Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>THÊM ĐỊA ĐIỂM DU LỊCH</span>
            <div className='container-form'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Mã lịch trình</Form.Label>
                        <Form.Control type="text" placeholder="" value={scheduleID} onChange = {(event) => setScheduleID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Thời gian du lịch</Form.Label>
                        <Form.Control type="text" placeholder="" value={period} onChange = {(event) => setPeriod(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Mã du lịch</Form.Label>
                        <Form.Select defaultValue={placeTravelID} onChange = {(event) => setPlaceTravelID(event.target.value)}>
                            
                            {listIdPlaceTravel.map((placeTravel) => {
                                return (
                                    <option key={placeTravel.placeTravelID} value={placeTravel.placeTravelID}>{placeTravel.placeTravelID}</option>
                                )
                            })}
                        </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Ngày khởi hành</Form.Label>
                        <Form.Control type="date" value={departureDay} onChange = {(event) => setDepartureDay(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Giờ khởi hành</Form.Label>
                        <Form.Control type="time" value={departureTime} onChange = {(event) => setDepartureTime(event.target.value)}/>
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

export default FormInsertSchedulePlaceTravel