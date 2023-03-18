import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'
import { BsFillFileEarmarkImageFill } from "react-icons/bs";
import { MdSystemUpdateAlt } from "react-icons/md";
import bcrypt from 'bcryptjs';
import 'sweetalert2/src/sweetalert2.scss'

import "../../../styles/placeTravel/formInsertPlaceTravel.scss"

let FormUpdateCustomer = ({rowselected, getIdPlaceTravel, isClickBtnUpdate}) => {

    const [customerID, setCustomerID] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [gender, setGender] = useState(rowselected.gender)
    const [birthday, setBirthday] = useState(rowselected.birthday)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [passport, setPassport] = useState("")

    useEffect(() => {
        setCustomerID(rowselected.customerID)
        setEmail(rowselected.email)
        setPassword(rowselected.password)
        setFullName(rowselected.fullName)
        setGender(rowselected.gender)
        setBirthday(rowselected.birthday)
        setPhoneNumber(rowselected.phoneNumber)
        setPassport(rowselected.passport)
    }, [rowselected])

    useEffect(() => {
        if(!isClickBtnUpdate){
            setCustomerID("")
            setEmail("")
            setPassword("")
            setFullName("")
            setGender("")
            setBirthday("")
            setPhoneNumber("")
            setPassport("")
        }
    }, [isClickBtnUpdate])

    let handleClickUpdate = async() => {
        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(password, salt);
        let res = await axios.put("http://localhost:8080/api/customer/update-customer", {
            customerID : customerID,
            email : email,
            password : hashPassword,
            fullName : fullName,
            gender : gender,
            birthday : birthday,
            phoneNumber : phoneNumber,
            passport : passport,
        })
        if(res.data.update){
            Swal.fire(
            'Cập Nhật Khách Hàng Thành Công!!!',
            'You clicked the button!',
            'success'
            )

            getIdPlaceTravel(`update ${customerID}`)
        }
        else{
            Swal.fire({
            icon: 'error',
            title: 'Cập Nhật Khách Hàng Thất Bại',
            // text: 'Địa Điểm Du Lịch Đã Tồn Tại!!!',
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>CẬP NHẬT KHÁCH HÀNG</span>
            <div className='container-form container-form-update'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Mã khách hàng</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={customerID} onChange = {(event) => setCustomerID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="" value={email} onChange = {(event) => setEmail(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="" value={password} onChange = {(event) => setPassword(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Căn Cước</Form.Label>
                        <Form.Control type="text" placeholder="" value={passport} onChange = {(event) => setPassport(event.target.value)}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label>Họ Tên</Form.Label>
                        <Form.Control type="text" placeholder="" value={fullName} onChange = {(event) => setFullName(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Ngày Sinh</Form.Label>
                        <Form.Control type="date" placeholder="" value={birthday} onChange = {(event) => setBirthday(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Giới Tính</Form.Label>
                        <Form.Select defaultValue={gender} onChange = {(event) => setGender(event.target.value)}>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label>Số Điện Thoại</Form.Label>
                        <Form.Control type="tel" placeholder="" value={phoneNumber} onChange = {(event) => setPhoneNumber(event.target.value)}/>
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <div className='btn-update'>
                    <Button variant="primary" className='button' onClick={handleClickUpdate}>
                        <MdSystemUpdateAlt className='icon-update-travel'/> Cập Nhật
                    </Button>{' '}
                </div>
            </div>
        </div>
    );
}

export default FormUpdateCustomer