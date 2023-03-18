import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

import "../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListTicket = ({
        listSearchTicket, 
        getRowSelected , 
        displayFormUpdate, 
        UpdateFilterPlaceTravel,
        listIdPlaceTravel,
    }) => {

    const [filter, setFilter] = useState("all")

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/customer/get-ticket", {ticketID : id})
        displayFormUpdate()
        window.scroll(0,0)
        getRowSelected(res.data.ticket)
    }

    let handleChangeFilter = async(event) => {
        setFilter(event.target.value)

        let res = await axios.post("http://localhost:8080/api/customer/list-ticket-byIDTravel", {type : event.target.value})
        UpdateFilterPlaceTravel(res.data.listTicket)
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
                <span className='title-table-travel'>DANH SÁCH VÉ DU LỊCH</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Số Người Lớn</th>
                            <th>Số Trẻ Em</th>
                            <th>Ngày Đặt Vé</th>
                            <th>Hiệu Lực Vé</th>
                            <th>Mã Lịch Trình</th>
                            <th>Mã Du Lịch</th>
                            <th>Mã Khách Hàng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchTicket.map((ticket) => {
                            let orderDate = new Date(ticket.orderDate)
                            return (
                                <tr key={ticket.ticketID} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(ticket.ticketID)}>
                                    <td>{ticket.ticketID}</td>
                                    <td>{ticket.numberAdult}</td>
                                    <td>{ticket.numberChild}</td>
                                    <td>{orderDate.toLocaleDateString("en-GB")}</td>
                                    <td>{ticket.expiry === true ? "Hiệu Lực" : "Hết Hạn"}</td>
                                    <td>{ticket.scheduleID}</td>
                                    <td>{ticket.placeTravelID}</td>
                                    <td>{ticket.customerID}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListTicket