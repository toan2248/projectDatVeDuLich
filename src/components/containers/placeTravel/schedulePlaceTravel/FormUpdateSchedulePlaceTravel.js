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

let FormUpdateSchedulePlaceTravel = ({rowselected, getIdPlaceTravel, isClickBtnUpdate, listIdPlaceTravel}) => {

    const [scheduleID, setScheduleID] = useState("")
    const [departureDay, setDepartureDay] = useState("2023-01-02")
    const [departureTime, setDepartureTime] = useState("")
    const [period, setPeriod] = useState("")
    const [placeTravelID, setPlaceTravelID] = useState(rowselected.placeTravelID)

    useEffect(() => {
        let time = new Date(rowselected.departureTime)
        setScheduleID(rowselected.scheduleID)
        setDepartureDay(rowselected.departureDay)
        setDepartureTime(
            (time.getUTCHours() < 10 ? `0${time.getUTCHours()}` : time.getUTCHours())+":"+(time.getUTCMinutes() < 10 ? `0${time.getUTCMinutes()}` : time.getUTCMinutes())
        )
        setPeriod(rowselected.period)
        setPlaceTravelID(rowselected.placeTravelID)
    }, [rowselected])

    useEffect(() => {
        if(!isClickBtnUpdate){
            setScheduleID("")
            setDepartureDay("")
            setDepartureTime("")
            setPeriod("")
            setPlaceTravelID("")
        }
    }, [isClickBtnUpdate])

    let handleClickUpdate = async() => {
        let res = await axios.put("http://localhost:8080/api/place-travel/update-schedule-place-travel", {
            scheduleID : scheduleID ,
            departureDay : departureDay ,
            departureTime : departureTime ,
            period : period,
            placeTravelID : placeTravelID ,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Lịch Trình Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${scheduleID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Lịch Trình Du Lịch Thất Bại',
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
                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Mã lịch trình</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={scheduleID} onChange = {(event) => setScheduleID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Thời gian du lịch</Form.Label>
                        <Form.Control type="text" placeholder="" value={period} onChange = {(event) => setPeriod(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
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
                <div className='btn-update'>
                    <Button variant="primary" className='button' onClick={handleClickUpdate}>
                        <MdSystemUpdateAlt className='icon-update-travel'/> Cập Nhật
                    </Button>{' '}
                </div>
            </div>
        </div>
    );
}

export default FormUpdateSchedulePlaceTravel