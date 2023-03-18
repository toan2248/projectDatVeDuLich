import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

import "../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListCustomer = ({
        listSearchCustomer, 
        getRowSelected , 
        displayFormUpdate, 
        UpdateFilterPlaceTravel,
    }) => {

    const [filter, setFilter] = useState("all")

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/customer/get-customer", {customerID : id})
        displayFormUpdate()
        window.scroll(0,0)
        getRowSelected(res.data.customer)
    }

    let handleChangeFilter = async(event) => {
        setFilter(event.target.value)

        let res = await axios.post("http://localhost:8080/api/customer/list-customer-byGender", {type : event.target.value})
        UpdateFilterPlaceTravel(res.data.listCustomer)
    }


    return (
        <>
            <div className='filter-title'>
                <div className='filter'>
                    <Form className='form'>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Lọc theo giới tính</Form.Label>
                        <Form.Select defaultValue={filter} onChange = {(event) => handleChangeFilter(event)}>
                            <option value={"all"}>Tất Cả</option>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </Form.Select>
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <span className='title-table-travel'>DANH SÁCH KHÁCH HÀNG</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Họ Tên</th>
                            <th>Giới Tính</th>
                            <th>Ngày Sinh</th>
                            <th>Số Điện Thoại</th>
                            <th>Căn Cước(CMND)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchCustomer.map((customer) => {
                            return (
                                <tr key={customer.id} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(customer.customerID)}>
                                    <td>{customer.customerID}</td>
                                    <td>{customer.email}</td>
                                    <td style={{wordBreak : "break-word", maxWidth : "200px"}}>{customer.password}</td>
                                    <td>{customer.fullName}</td>
                                    <td>{customer.gender === true ? "Nam" : "Nữ"}</td>
                                    <td>{customer.birthday}</td>
                                    <td>{customer.phoneNumber}</td>
                                    <td>{customer.passport}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListCustomer