import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

import "../../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListSchedulePlaceTravel = ({
        listSearchSchedulePlaceTravel, 
        getRowSelected , 
        displayFormUpdate, 
        UpdateFilterPlaceTravel,
        listIdPlaceTravel,
    }) => {

    const [filter, setFilter] = useState("all")

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/place-travel/get-schedule-place-travel", {schedulePlaceTravelID : id})
        console.log(res.data.schedulePlaceTravel);
        displayFormUpdate()
        window.scroll(0,0)
        getRowSelected(res.data.schedulePlaceTravel)
    }

    let handleChangeFilter = async(event) => {
        setFilter(event.target.value)

        let res = await axios.post("http://localhost:8080/api/place-travel/list-schedule-place-travel-byIDTravel", {type : event.target.value})
        UpdateFilterPlaceTravel(res.data.listSchedulePlaceTravel)
    }


    return (
        <>
            <div className='filter-title'>
                <div className='filter'>
                    <Form className='form'>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Lọc theo mã du lịch</Form.Label>
                        <Form.Select defaultValue={filter} onChange = {(event) => handleChangeFilter(event)}>
                            <option value={"all"}>Tất Cả</option>
                            {listIdPlaceTravel.map((placeTravel) => {
                                return (
                                    <option key={placeTravel.placeTravelID} value={placeTravel.placeTravelID}>{placeTravel.placeTravelID}</option>
                                )
                            })}
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <span className='title-table-travel'>DANH SÁCH LỊCH TRÌNH DU LỊCH</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Ngày Khởi Hành</th>
                            <th>Giờ Khởi Hành</th>
                            <th>Thời Gian Du Lịch</th>
                            <th>Mã Du Lịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchSchedulePlaceTravel.map((schedulePlaceTravel) => {
                            let date = new Date(schedulePlaceTravel.departureDay)
                            let time = new Date(schedulePlaceTravel.departureTime)
                            return (
                                <tr key={schedulePlaceTravel.id} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(schedulePlaceTravel.scheduleID)}>
                                    <td>{schedulePlaceTravel.scheduleID}</td>
                                    <td>{date.toLocaleDateString("en-GB")}</td>
                                    <td>{time.toLocaleTimeString("en-US", { timeZone: "UTC", timeZoneName: "short" }).slice(0,10)}</td>
                                    <td>{schedulePlaceTravel.period}</td>
                                    <td>{schedulePlaceTravel.placeTravelID}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListSchedulePlaceTravel