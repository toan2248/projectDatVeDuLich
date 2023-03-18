import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'
import { TextArea } from '@react-ui-org/react-ui';
import { MdSystemUpdateAlt } from "react-icons/md";
import 'sweetalert2/src/sweetalert2.scss'

import "../../../../styles/placeTravel/formInsertPlaceTravel.scss"

let FormUpdateDetailPlaceTravel = ({rowselected, getIdPlaceTravel, isClickBtnUpdate, listTravelHasNotDetail}) => {

    const [idDetailTravel, setIdDetailTravel] = useState("")
    const [idPlaceTravel, setIdPlaceTravel] = useState("")
    const [infoPlaceTravel, setInfoPlaceTravel] = useState("")
    const [schedulePlaceTravel, setSchedulePlaceTravel] = useState("")

    useEffect(() => {
        setIdDetailTravel(rowselected.detailPlaceTravelID)
        setIdPlaceTravel(rowselected.placeTravelID)
        setInfoPlaceTravel(rowselected.reasonContent)
        setSchedulePlaceTravel(rowselected.scheduleContent)
    }, [rowselected])

    useEffect(() => {
        if(!isClickBtnUpdate){
            setIdDetailTravel("")
            setIdPlaceTravel("")
            setInfoPlaceTravel("")
            setSchedulePlaceTravel("")
        }
    }, [isClickBtnUpdate])

    let handleClickUpdate = async() => {
        let res = await axios.put("http://localhost:8080/api/place-travel/update-detail-place-travel", {
            idDetailTravel : idDetailTravel,
            idPlaceTravel : idPlaceTravel,
            infoPlaceTravel : infoPlaceTravel,
            schedulePlaceTravel : schedulePlaceTravel,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Thông Tin Địa Điểm Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${idDetailTravel}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Thông Tin Địa Điểm Du Lịch Thất Bại',
            // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>CẬP NHẬT THÔNG TIN ĐỊA ĐIỂM DU LỊCH</span>
            <div className='container-form container-form-update'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã thông tin</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={idDetailTravel} onChange = {(event) => setIdDetailTravel(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Mã du lịch</Form.Label>
                        <Form.Select defaultValue={idPlaceTravel} onChange = {(event) => setIdPlaceTravel(event.target.value)}>
                            <option value={idPlaceTravel}>{idPlaceTravel}</option>
                            {listTravelHasNotDetail.map((placeTravel) => {
                                return (
                                    <option value={placeTravel}>{placeTravel}</option>
                                )
                            })}
                        </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} className = "form-group-area">
                            <div className='title-text-area'>Thông tin địa điểm du lịch</div>
                            <div className='input-text-area'>
                                <TextArea value={infoPlaceTravel} className="input-text-area" fullWidth
                                onChange = {(event) => setInfoPlaceTravel(event.target.value)}
                                />
                            </div>
                        </Form.Group>

                        <Form.Group as={Col} className = "form-group-area">
                            <div className='title-text-area'>Lịch trình du lịch</div>
                            <div className='input-text-area'>
                                <TextArea value = {schedulePlaceTravel} className="input-text-area" fullWidth
                                onChange = {(event) => setSchedulePlaceTravel(event.target.value)}
                                />
                            </div>
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

export default FormUpdateDetailPlaceTravel