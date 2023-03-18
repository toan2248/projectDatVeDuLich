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

let FormUpdateSaleTravel = ({rowselected, getIdPlaceTravel, isClickBtnUpdate, listIdPlaceTravel}) => {

    const [saleID, setSaleID] = useState("")
    const [percent, setPercent] = useState(0)
    const [dateStartSale, setDateStartSale] = useState("")
    const [dateEndSale, setDateEndSale] = useState("")
    const [placeTravelID, setPlaceTravelID] = useState(rowselected.placeTravelID)

    useEffect(() => {
        setSaleID(rowselected.saleID)
        setPercent(rowselected.percent)
        setDateStartSale(rowselected.dateStartSale)
        setDateEndSale(rowselected.dateEndSale)
        setPlaceTravelID(rowselected.placeTravelID)
    }, [rowselected])

    useEffect(() => {
        if(!isClickBtnUpdate){
            setSaleID("")
            setPercent("")
            setDateStartSale("")
            setDateEndSale("")
            setPlaceTravelID("")
        }
    }, [isClickBtnUpdate])

    let handleClickUpdate = async() => {
        let res = await axios.put("http://localhost:8080/api/place-travel/update-sale-travel", {
            saleID : saleID,
            percent : percent,
            dateStartSale : dateStartSale,
            dateEndSale : dateEndSale,
            placeTravelID : placeTravelID,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Mã Giảm Giá Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${saleID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Mã Giảm Giá Du Lịch Thất Bại',
            // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>CẬP NHẬT MÃ GIẢM GIÁ DU LỊCH</span>
            <div className='container-form container-form-update'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã giảm giá</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={saleID} onChange = {(event) => setSaleID(event.target.value)}/>
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
                        <Form.Control type="date" placeholder="" value={dateStartSale} onChange = {(event) => setDateStartSale(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Ngày kết thúc</Form.Label>
                        <Form.Control type="date" placeholder="" value={dateEndSale} onChange = {(event) => setDateEndSale(event.target.value)}/>
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

export default FormUpdateSaleTravel