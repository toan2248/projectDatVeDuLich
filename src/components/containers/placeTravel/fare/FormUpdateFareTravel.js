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

let FormUpdateFareTravel = ({rowselected, getIdPlaceTravel, isClickBtnUpdate, listTravelHasNotFare}) => {

    const [fareID, setFareID] = useState("")
    const [fareAdult, setFareAdult] = useState("")
    const [fareChild, setFareChild] = useState("")
    const [idPlaceTravel, setIdPlaceTravel] = useState(rowselected.placeTravelID)

    useEffect(() => {
        setFareID(rowselected.fareID)
        setFareAdult(rowselected.fareAdult)
        setFareChild(rowselected.fareChild)
        setIdPlaceTravel(rowselected.placeTravelID)
    }, [rowselected])

    useEffect(() => {
        if(!isClickBtnUpdate){
            setFareID("")
            setFareAdult("")
            setFareChild("")
            setIdPlaceTravel("")
        }
    }, [isClickBtnUpdate])

    let handleClickUpdate = async() => {
        let res = await axios.put("http://localhost:8080/api/place-travel/update-fare-travel", {
            fareID : fareID,
            fareAdult : fareAdult,
            fareChild : fareChild,
            placeTravelID : idPlaceTravel,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Giá Vé Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${fareID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Giá Vé Du Lịch Thất Bại',
            // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>CẬP NHẬT GIÁ VÉ DU LỊCH</span>
            <div className='container-form container-form-update'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã giá vé</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={fareID} onChange = {(event) => setFareID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Mã du lịch</Form.Label>
                        <Form.Select defaultValue={idPlaceTravel} onChange = {(event) => setIdPlaceTravel(event.target.value)}>
                            <option value={rowselected.placeTravelID}>{rowselected.placeTravelID}</option>
                            {listTravelHasNotFare.map((placeTravel) => {
                                if(placeTravel !== rowselected.placeTravelID){
                                    return (
                                        <option key={placeTravel} value={placeTravel}>{placeTravel}</option>
                                    )
                                }
                            })}
                        </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Giá vé người lớn</Form.Label>
                        <Form.Control type="number" placeholder="" value={fareAdult} onChange = {(event) => setFareAdult(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Giá vé trẻ em</Form.Label>
                        <Form.Control type="number" placeholder="" value={fareChild} onChange = {(event) => setFareChild(event.target.value)}/>
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

export default FormUpdateFareTravel