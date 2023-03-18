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

let FormInsertPlaceTravel = ({ getIdPlaceTravel}) => {

    const [idTravel, setIdTravel] = useState("")
    const [nameTravel, setNameTravel] = useState("")
    const [pointOfDeparture, setPointOfDeparture] = useState("")
    const [destination, setDestination] = useState("")
    const [vehicle, setVehicle] = useState("bus")
    const [typeOfTourism, setTypeOfTourism] = useState("sea")
    const [avatarTourist, setAvatarTourist] = useState("")


    let handleClickInsert = async() => {
        let res = await axios.post("http://localhost:8080/api/place-travel/insert-place-travel", {
            idTravel : idTravel,
            nameTravel : nameTravel,
            pointOfDeparture : pointOfDeparture,
            destination : destination,
            vehicle : vehicle,
            typeOfTourism : typeOfTourism,
            avatarTourist : avatarTourist,
        })
        if(res.data.insert){
            Swal.fire(
            'Thêm Địa Điểm Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`insert ${idTravel}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Thêm Địa Điểm Du Lịch Thất Bại',
            text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
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
                        <Form.Label>Mã du lịch</Form.Label>
                        <Form.Control type="text" placeholder="" value={idTravel} onChange = {(event) => setIdTravel(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Tên chuyến du lịch</Form.Label>
                        <Form.Control type="text" placeholder="" value={nameTravel} onChange = {(event) => setNameTravel(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Điểm xuất phát</Form.Label>
                        <Form.Control type="text" placeholder="" value={pointOfDeparture} onChange = {(event) => setPointOfDeparture(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Điểm đến</Form.Label>
                        <Form.Control type="text" placeholder="" value={destination} onChange = {(event) => setDestination(event.target.value)}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Phương tiện</Form.Label>
                        <Form.Select defaultValue={vehicle} onChange = {(event) => setVehicle(event.target.value)}>
                            <option value={"airPlane"}>Máy bay</option>
                            <option value={"bus"}>Xe giường nằm</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Loại du lịch</Form.Label>
                        <Form.Select defaultValue={typeOfTourism} onChange = {(event) => setTypeOfTourism(event.target.value)}>
                            <option value={"sea"}>Biển</option>
                            <option value={"camping"}>Cắm trại</option>
                            <option value={"resort"}>Nghỉ dưỡng</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formFile" className="mb-3">
                            <Form.Label>Hình ảnh</Form.Label>
                            <Form.Control type="file" onChange={(event) => setAvatarTourist(event.target.files[0].name)}/>
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

export default FormInsertPlaceTravel