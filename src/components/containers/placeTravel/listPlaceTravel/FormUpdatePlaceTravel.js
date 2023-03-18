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

let FormUpdatePlaceTravel = ({rowselected, getIdPlaceTravel, isClickBtnUpdate}) => {

    const [idTravel, setIdTravel] = useState("")
    const [nameTravel, setNameTravel] = useState("")
    const [pointOfDeparture, setPointOfDeparture] = useState("")
    const [destination, setDestination] = useState("")
    const [vehicle, setVehicle] = useState(rowselected.vehicle)
    const [typeOfTourism, setTypeOfTourism] = useState(rowselected.typeOfTourism)
    const [avatarTourist, setAvatarTourist] = useState("")

    useEffect(() => {
        setIdTravel(rowselected.placeTravelID)
        setNameTravel(rowselected.touristName)
        setPointOfDeparture(rowselected.pointOfDeparture)
        setDestination(rowselected.destination)
        setVehicle(rowselected.vehicle)
        setTypeOfTourism(rowselected.typeOfTourism)
        setAvatarTourist(rowselected.avatarTourist)
    }, [rowselected])

    useEffect(() => {
        if(!isClickBtnUpdate){
            setIdTravel("")
            setNameTravel("")
            setPointOfDeparture("")
            setDestination("")
            setVehicle("")
            setTypeOfTourism("")
            setAvatarTourist("")
        }
    }, [isClickBtnUpdate])

    let handleClickUpdate = async() => {
        let res = await axios.put("http://localhost:8080/api/place-travel/update-place-travel", {
            idTravel : idTravel,
            nameTravel : nameTravel,
            pointOfDeparture : pointOfDeparture,
            destination : destination,
            vehicle : vehicle,
            typeOfTourism : typeOfTourism,
            avatarTourist : avatarTourist,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Địa Điểm Du Lịch Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${idTravel}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Địa Điểm Du Lịch Thất Bại',
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
                        <Form.Group as={Col}>
                        <Form.Label>Mã du lịch</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={idTravel} onChange = {(event) => setIdTravel(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Tên chuyến du lịch</Form.Label>
                        <Form.Control type="text" placeholder="" value={nameTravel} onChange = {(event) => setNameTravel(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Điểm xuất phát</Form.Label>
                        <Form.Control type="text" placeholder="" value={pointOfDeparture} onChange = {(event) => setPointOfDeparture(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Điểm đến</Form.Label>
                        <Form.Control type="text" placeholder="" value={destination} onChange = {(event) => setDestination(event.target.value)}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Phương tiện</Form.Label>
                        <Form.Select defaultValue={rowselected.vehicle} onChange = {(event) => setVehicle(event.target.value)}>
                            <option value={rowselected.vehicle}>{rowselected.vehicle === "bus" ? "Xe giường nằm" : "Máy bay"}</option>
                            {
                                rowselected.vehicle === "bus"
                                ?
                                <option value={"airPlane"}>Máy bay</option>
                                :
                                <option value={"bus"}>Xe giường nằm</option>
                            }
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Loại du lịch</Form.Label>
                        <Form.Select defaultValue={rowselected.typeOfTourism} onChange = {(event) => setTypeOfTourism(event.target.value)}>
                            <option value={rowselected.typeOfTourism}>
                                {rowselected.typeOfTourism === "sea" ? "Biển" : (rowselected.typeOfTourism === "camping" ? "Cắm Trại" : "Nghỉ Dưỡng")}
                            </option>
                            {
                                rowselected.typeOfTourism === "sea"
                                ?
                                <>
                                    <option value={"camping"}>Cắm Trại</option>
                                    <option value={"resort"}>Nghỉ Dưỡng</option>
                                </>
                                :
                                (
                                    rowselected.typeOfTourism === "camping"
                                    ?
                                    <>
                                        <option value={"sea"}>Biển</option>
                                        <option value={"resort"}>Nghỉ Dưỡng</option>
                                    </>
                                    :
                                    <>
                                        <option value={"sea"}>Biển</option>
                                        <option value={"camping"}>Cắm Trại</option>
                                    </>
                                )
                            }
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3 files">
                            <Form.Label>Hình ảnh</Form.Label>
                            <div className='fileChoose'>
                                <div className='decor-choose-file'>
                                    <label htmlFor='file' className='icon-chooseFile'>
                                        <BsFillFileEarmarkImageFill className='icon'/>
                                    </label>
                                    <Form.Label className='path'>{avatarTourist}</Form.Label>
                                </div>
                                <Form.Control id='file' hidden type="file" onChange={(event) => setAvatarTourist(event.target.files[0].name)}/>
                            </div>
                        </Form.Group>

                        <Form.Group as={Col} className="mb-3">
                            <img className='avatar-update' src={`/images/${avatarTourist}`}/>
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

export default FormUpdatePlaceTravel