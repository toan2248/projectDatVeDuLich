import { MdTravelExplore } from "react-icons/md";
import { FaTicketAlt } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import React, { useState } from 'react';
import Calendar from 'react-calendar';

import "../../../styles/statistical/header.scss"
import 'react-calendar/dist/Calendar.css';

let Statistical = () => {

    const [value, onChange] = useState(new Date());

    return (
        <div className="header">
            <div className="announce">
                <span className="heading">Thống kê ngày 06 Tháng 01 Năm 2023</span>
                <div className="revenue-month">
                    <div className="block">
                        <div className="title-icon">
                            <MdTravelExplore className="ion-announce"/>
                            <span className="title">TỔNG ĐỊA ĐIỂM DU LỊCH</span>
                        </div>
                        <span className="value">300</span>
                    </div>
                    <div className="block">
                        <div className="title-icon">
                            <FaTicketAlt className="ion-announce"/>
                            <span className="title">TỔNG SỐ VÉ</span>
                        </div>
                        <span className="value">300</span>
                    </div>
                    <div className="block">
                        <div className="title-icon">
                            <AiFillDollarCircle className="ion-announce"/>
                            <span className="title">TỔNG DOANH THU</span>
                        </div>
                        <span className="value">300</span>
                    </div>
                </div>
            </div>
            <div className="date-announce">
                <Calendar onChange={onChange} value={value} />
            </div>
        </div>
    )
}

export default Statistical