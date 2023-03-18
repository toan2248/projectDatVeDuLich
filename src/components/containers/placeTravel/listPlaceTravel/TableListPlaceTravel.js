import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

import "../../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListPlaceTravel = ({
        listSearchPlaceTravel, 
        getRowSelected , 
        displayFormUpdate, 
        UpdateFilterPlaceTravel,
    }) => {

    const [filter, setFilter] = useState("all")

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/place-travel/get-place-travel", {placeTravelID : id})
        displayFormUpdate()
        window.scroll(0,0)
        getRowSelected(res.data.placeTravel)
    }

    let handleChangeFilter = async(event) => {
        setFilter(event.target.value)

        let res = await axios.post("http://localhost:8080/api/place-travel/list-place-travel-byType", {type : event.target.value})
        UpdateFilterPlaceTravel(res.data.listPlaceTravel)
    }


    return (
        <>
            <div className='filter-title'>
                <div className='filter'>
                    <Form className='form'>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Lọc theo loại du lịch</Form.Label>
                        <Form.Select defaultValue={filter} onChange = {(event) => handleChangeFilter(event)}>
                            <option value={"all"}>Tất Cả</option>
                            <option value={"sea"}>Biển</option>
                            <option value={"camping"}>Cắm Trại</option>
                            <option value={"resort"}>Nghỉ Dưỡng</option>
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <span className='title-table-travel'>DANH SÁCH ĐỊA ĐIỂM DU LỊCH</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Tên Địa Điểm</th>
                            <th>Điểm Xuất phát</th>
                            <th>Điểm Đến</th>
                            <th>Phương Tiện</th>
                            <th>Loại Du Lịch</th>
                            <th>Hình Ảnh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchPlaceTravel.map((placeTravel) => {
                            return (
                                <tr key={placeTravel.id} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(placeTravel.placeTravelID)}>
                                    <td>{placeTravel.placeTravelID}</td>
                                    <td>{placeTravel.touristName}</td>
                                    <td>{placeTravel.pointOfDeparture}</td>
                                    <td>{placeTravel.destination}</td>
                                    <td>{placeTravel.vehicle === "bus" ? "Xe Giường Nằm" : "Máy bay"}</td>
                                    <td>
                                        {
                                            placeTravel.typeOfTourism === "sea" 
                                            ? "Biển" 
                                            : 
                                            (placeTravel.typeOfTourism === "camping" ? "Cắm Trại" : "Nghỉ Dưỡng")
                                        }
                                    </td>
                                    <td className='avatar' style={{
                                        width : "80px",
                                        height : "80px"
                                    }}>
                                        <img src={`/images/${placeTravel.avatarTourist}`} style={{
                                        width : "80px",
                                        height : "80px"
                                    }}/>
                                    </td>    
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListPlaceTravel