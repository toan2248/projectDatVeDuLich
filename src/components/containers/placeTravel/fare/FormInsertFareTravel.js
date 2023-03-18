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

let FormInsertFareTravel = ({ getIdPlaceTravel, listTravelHasNotFare}) => {

    const [fareID, setFareID] = useState("")
    const [fareAdult, setFareAdult] = useState("")
    const [fareChild, setFareChild] = useState("")
    const [idPlaceTravel, setIdPlaceTravel] = useState(listTravelHasNotFare[0])


    let handleClickInsert = async() => {
        let res = await axios.post("http://localhost:8080/api/place-travel/insert-fare-travel", {
            fareID : fareID,
            fareAdult : fareAdult,
            fareChild : fareChild,
            placeTravelID : idPlaceTravel,
        })
        if(res.data.insert){
            Swal.fire(
            'Thêm Giá Vé Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`insert ${fareID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Thêm Giá Vé Du Lịch Thất Bại',
            text: 'Giá Vé Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>THÊM GIÁ VÉ DU LỊCH</span>
            <div className='container-form'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã giá vé</Form.Label>
                        <Form.Control type="text" placeholder="" value={fareID} onChange = {(event) => setFareID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Mã du lịch</Form.Label>
                        <Form.Select defaultValue={idPlaceTravel} onChange = {(event) => setIdPlaceTravel(event.target.value)}>
                            {listTravelHasNotFare.map((placeTravel) => {
                                return (
                                    <option key={placeTravel} value={placeTravel}>{placeTravel}</option>
                                )
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
                <div className='btn-insert'>
                    <Button variant="success" className='button' onClick={handleClickInsert}>
                        <MdPostAdd className='icon-post-travel'/> Thêm
                    </Button>{' '}
                </div>
            </div>
        </div>
    );
}

export default FormInsertFareTravel