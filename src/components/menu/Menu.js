import { NavLink } from "react-router-dom"
import "../../styles/menu/menu.scss"
import {FaHome, FaUsers, FaHistory} from "react-icons/fa";
import { MdTravelExplore } from "react-icons/md";
import { VscChevronDown, VscChevronLeft } from "react-icons/vsc";
import { BsFillJournalBookmarkFill } from "react-icons/bs";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { AiOutlineSchedule, AiOutlineComment } from "react-icons/ai";
import { TbDiscount2, TbShoppingCartDiscount } from "react-icons/tb";
import { FiUsers } from "react-icons/fi";
import { useState } from "react";

let Menu = () => {
    const [clickMenuHome, setClickMenuHome] = useState(true)
    const [clickMenuPlaceTravel, setClickMenuPlaceTravel] = useState(true)
    const [clickMenuCustomer, setClickMenuCustomer] = useState(true)

    let handleClickMenuHome = () => {
        if(clickMenuHome) {
            setClickMenuPlaceTravel(true)
            setClickMenuCustomer(true)
        }
    }

    let handleClickMenuPlaceTravel = () => {
        if(clickMenuPlaceTravel) {
            setClickMenuPlaceTravel(false)
            setClickMenuCustomer(true)
        }
        else{
            setClickMenuPlaceTravel(true)
        }
    }

    let handleClickMenuCustomer = () => {
        if(clickMenuCustomer) {
            setClickMenuCustomer(false)
            setClickMenuPlaceTravel(true)
        }
        else{
            setClickMenuCustomer(true)
        }
    }

    return (
        <div className="menu">
            <div className="avatar-user">
                <div className="avatar">
                    <img src="/images/avatarUser.jpg"/>
                </div>
                <span className="name-user">Thanh Toan</span>
                <span className="position-user">Quan Lys</span>
            </div>
            <div className="list-menu">
                <div className="block-temp"></div>
                <NavLink to = {"/"} className="row-menu" onClick={handleClickMenuHome}>
                    <div className="menu-parents">
                        <div className="title-menu">
                            <FaHome className="icon"/>
                            <span className="home-page">Trang Chủ</span>
                        </div>
                    </div>
                </NavLink>
                <div className="row-menu">
                    <div className="menu-parents" onClick={handleClickMenuPlaceTravel}>
                        <div className="title-menu">
                            <MdTravelExplore className="icon"/>
                            <span className="place-travel">Địa Điểm</span>
                        </div>
                        {clickMenuPlaceTravel 
                            ?
                            <VscChevronLeft className="icon-down-left"/>
                            :
                            <VscChevronDown className="icon-down-left"/>
                        }
                    </div>
                    <div className="menu-children" style={
                            {
                                height : clickMenuPlaceTravel ? "0px" : "350px",
                                zIndex : clickMenuPlaceTravel ? "0" : "5",
                            }
                        }>
                        <NavLink to={"/place-travel/list"} className="row-menu-child">
                            <BsFillJournalBookmarkFill className={clickMenuPlaceTravel ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuPlaceTravel ? "color-transparent" : "color-white"}>Danh Sách Địa Điểm</span>
                        </NavLink>
                        <NavLink to={"/place-travel/information"} className="row-menu-child">
                            <HiOutlineInformationCircle className={clickMenuPlaceTravel ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuPlaceTravel ? "color-transparent" : "color-white"}>Thông Tin Địa Điểm</span>
                        </NavLink>
                        <NavLink to={"/place-travel/comments"} className="row-menu-child">
                            <AiOutlineComment className={clickMenuPlaceTravel ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuPlaceTravel ? "color-transparent" : "color-white"}>Bình Luận</span>
                        </NavLink>
                        <NavLink to={"/place-travel/schedule"} className="row-menu-child">
                            <AiOutlineSchedule className={clickMenuPlaceTravel ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuPlaceTravel ? "color-transparent" : "color-white"}>Lịch Trình</span>
                        </NavLink>
                        <NavLink to={"/place-travel/discount"} className="row-menu-child">
                            <TbShoppingCartDiscount className={clickMenuPlaceTravel ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuPlaceTravel ? "color-transparent" : "color-white"}>Chiết Khấu</span>
                        </NavLink>
                        <NavLink to={"/place-travel/sale"} className="row-menu-child">
                            <TbDiscount2 className={clickMenuPlaceTravel ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuPlaceTravel ? "color-transparent" : "color-white"}>Mã Giảm Giá</span>
                        </NavLink>
                        <NavLink to={"/place-travel/fare"} className="row-menu-child">
                            <TbDiscount2 className={clickMenuPlaceTravel ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuPlaceTravel ? "color-transparent" : "color-white"}>Giá Vé</span>
                        </NavLink>
                    </div>
                </div>
                <div className="row-menu">
                    <div className="menu-parents" onClick={handleClickMenuCustomer}>
                        <div className="title-menu">
                            <FaUsers className="icon"/>
                            <span className="home-page">Khách Hàng</span>
                        </div>
                        {clickMenuCustomer 
                            ?
                            <VscChevronLeft className="icon-down-left"/>
                            :
                            <VscChevronDown className="icon-down-left"/>
                        }
                    </div>
                    <div className="menu-children" style={
                            {
                                height : clickMenuCustomer ? "0px" : "100px",
                                zIndex : clickMenuCustomer ? "0" : "5",
                            }
                        }>
                        <NavLink to={"/customer/list"} className="row-menu-child">
                            <FiUsers className={clickMenuCustomer ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuCustomer ? "color-transparent" : "color-white"}>Danh Sách Khách Hàng</span>
                        </NavLink>
                        <NavLink to={"/customer/history"} className="row-menu-child">
                            <FaHistory className={clickMenuCustomer ? "color-transparent icon-list" : "color-white icon-list"}/>
                            <span className={clickMenuCustomer ? "color-transparent" : "color-white"}>Lịch Sử Đặt Vé</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Menu