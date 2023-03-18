import axios from 'axios';
import Table from 'react-bootstrap/Table';

import "../../../../styles/placeTravel/tableListPlaceTravel.scss"

let TableListDetailPlaceTravel = ({
        listSearchDetailPlaceTravel, 
        getRowSelected , 
        displayFormUpdate,
    }) => {

    let handleClickRowSelected = async(id) => {
        let res = await axios.post("http://localhost:8080/api/place-travel/get-detail-place-travel", {detailPlaceTravelID : id})
        displayFormUpdate()
        window.scroll(0,0)
        getRowSelected(res.data.detailPlaceTravel)
    }


    return (
        <>
            <div className='filter-title'>
                <span className='title-table-travel' style={{width : "100%", textAlign : "center"}}>DANH SÁCH THÔNG TIN ĐỊA ĐIỂM DU LỊCH</span>
            </div>
            <div className='table'>
                <Table striped>
                    <thead>
                        <tr style={{backgroundColor : "#797878", color : "white", textAlign : "center"}}>
                            <th>ID</th>
                            <th>Thông Tin Địa Điểm Du Lịch</th>
                            <th>Lịch Trình</th>
                            <th>Mã Du Lịch</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listSearchDetailPlaceTravel.map((detail) => {
                            return (
                                <tr key={detail.id} style={{cursor : 'pointer', textAlign : "center"}} onClick={() => handleClickRowSelected(detail.detailPlaceTravelID)}>
                                    <td>{detail.detailPlaceTravelID}</td>
                                    <td style={{wordBreak : "break-all"}}>{detail.reasonContent}</td>
                                    <td style={{wordBreak : "break-all"}}>{detail.scheduleContent}</td>
                                    <td style={{minWidth : "120px"}}>{detail.placeTravelID}</td>  
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default TableListDetailPlaceTravel