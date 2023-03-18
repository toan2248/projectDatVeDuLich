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

let FormInsertSaleTravel = ({ getIdPlaceTravel, listIdPlaceTravel}) => {

    const [saleID, setSaleID] = useState("")
    const [percent, setPercent] = useState(0)
    const [dateStartSale, setDateStartSale] = useState("")
    const [dateEndSale, setDateEndSale] = useState("")
    const [placeTravelID, setPlaceTravelID] = useState(listIdPlaceTravel[0].placeTravelID)


    let handleClickInsert = async() => {
        let res = await axios.post("http://localhost:8080/api/place-travel/insert-sale-travel", {
            saleID : saleID,
            percent : percent,
            dateStartSale : dateStartSale,
            dateEndSale : dateEndSale,
            placeTravelID : placeTravelID,
        })
        if(res.data.insert){
            Swal.fire(
            'Thêm Mã Giảm Giá Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`insert ${saleID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Thêm Mã Giảm Giá Du Lịch Thất Bại',
            text: 'Mã Giảm Giá Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>THÊM MÃ GIẢM GIÁ DU LỊCH</span>
            <div className='container-form'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã giảm giá</Form.Label>
                        <Form.Control type="text" placeholder="" value={saleID} onChange = {(event) => setSaleID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Phần trăm giảm giá</Form.Label>
                        <Form.Control type="number" min={"0"} max={"100"} placeholder="" value={percent} onChange = {(event) => setPercent(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
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

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Ngày áp dụng</Form.Label>
                        <Form.Control type="date" placeholder="" value={dateStartSale} onChange = {(event) => setDateStartSale(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control type="date" placeholder="" value={dateEndSale} onChange = {(event) => setDateEndSale(event.target.value)}/>
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

export default FormInsertSaleTravel