import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

import "../../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListDiscountTravel = ({
        listSearchDiscountTravel, 
        getRowSelected , 
        displayFormUpdate, 
        UpdateFilterPlaceTravel,
        listIdPlaceTravel,
    }) => {

    const [filter, setFilter] = useState("all")

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/place-travel/get-discount-travel", {discountTravelID : id})
        displayFormUpdate()
        window.scroll(0,0)
        console.log(res.data.discountTravel);
        getRowSelected(res.data.discountTravel)
    }

    let handleChangeFilter = async(event) => {
        setFilter(event.target.value)

        let res = await axios.post("http://localhost:8080/api/place-travel/list-discount-travel-byIDTravel", {type : event.target.value})
        UpdateFilterPlaceTravel(res.data.listDiscountTravel)
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
                <span className='title-table-travel'>DANH SÁCH CHIẾT KHẤU DU LỊCH</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Phần Trăm Chiết Khấu</th>
                            <th>Ngày Áp Dụng</th>
                            <th>Ngày Kết Thúc</th>
                            <th>Mã Du Lịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchDiscountTravel.map((discountTravel) => {
                            let dateStart = new Date(discountTravel.dateStartDiscount)
                            let dateEnd = new Date(discountTravel.dateEndDiscount)
                            return (
                                <tr key={discountTravel.id} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(discountTravel.discountID)}>
                                    <td>{discountTravel.discountID}</td>
                                    <td>{`${discountTravel.percent}%`}</td>
                                    <td>{dateStart.toLocaleDateString("en-GB")}</td>
                                    <td>{dateEnd.toLocaleDateString("en-GB")}</td>
                                    <td>{discountTravel.placeTravelID}</td>  
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListDiscountTravel