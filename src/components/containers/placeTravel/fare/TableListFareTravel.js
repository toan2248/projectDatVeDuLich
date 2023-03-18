import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

import "../../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListFareTravel = ({
        listSearchFare, 
        getRowSelected , 
        displayFormUpdate,
    }) => {

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/place-travel/get-fare-travel", {fareID : id})
        displayFormUpdate()
        window.scroll(0,0)
        getRowSelected(res.data.fare)
    }



    return (
        <>
            <div className='filter-title'>
                <span className='title-table-travel' style={{width : "100%", textAlign : "center"}}>DANH SÁCH GIÁ VÉ DU LỊCH</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Giá Vé Người Lớn</th>
                            <th>Giá Vé Trẻ Em</th>
                            <th>Mã Du Lịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchFare.map((fare) => {
                            return (
                                <tr key={fare.id} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(fare.fareID)}>
                                    <td>{fare.fareID}</td>
                                    <td>{fare.fareAdult.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{fare.fareChild.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</td>
                                    <td>{fare.placeTravelID}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListFareTravel