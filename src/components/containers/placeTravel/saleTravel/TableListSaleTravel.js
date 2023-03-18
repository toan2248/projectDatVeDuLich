import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

import "../../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListSaleTravel = ({
        listSearchSaleTravel, 
        getRowSelected , 
        displayFormUpdate, 
        UpdateFilterPlaceTravel,
        listIdPlaceTravel,
    }) => {

    const [filter, setFilter] = useState("all")

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/place-travel/get-sale-travel", {saleID : id})
        displayFormUpdate()
        window.scroll(0,0)
        getRowSelected(res.data.saleTravel)
    }

    let handleChangeFilter = async(event) => {
        setFilter(event.target.value)

        let res = await axios.post("http://localhost:8080/api/place-travel/list-sale-travel-byIDTravel", {type : event.target.value})
        UpdateFilterPlaceTravel(res.data.listSaleTravel)
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
                <span className='title-table-travel'>DANH SÁCH MÃ GIẢM GIÁ DU LỊCH</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Phần Trăm Giảm giá</th>
                            <th>Ngày Áp Dụng</th>
                            <th>Ngày Kết Thúc</th>
                            <th>Mã Du Lịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchSaleTravel.map((saleTravel) => {
                            let dateStart = new Date(saleTravel.dateStartSale)
                            let dateEnd = new Date(saleTravel.dateEndSale)
                            return (
                                <tr key={saleTravel.id} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(saleTravel.saleID)}>
                                    <td>{saleTravel.saleID}</td>
                                    <td>{`${saleTravel.percent}%`}</td>
                                    <td>{dateStart.toLocaleDateString("en-GB")}</td>
                                    <td>{dateEnd.toLocaleDateString("en-GB")}</td>
                                    <td>{saleTravel.placeTravelID}</td>  
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListSaleTravel