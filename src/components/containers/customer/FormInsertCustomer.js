import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Swal from 'sweetalert2'
import { MdPostAdd } from "react-icons/md";
import 'sweetalert2/src/sweetalert2.scss'
import bcrypt from 'bcryptjs';
import "../../../styles/placeTravel/formInsertPlaceTravel.scss"

let FormInsertCustomer = ({ getIdPlaceTravel}) => {

    const [customerID, setCustomerID] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fullName, setFullName] = useState("")
    const [gender, setGender] = useState(true)
    const [birthday, setBirthday] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [passport, setPassport] = useState("")
    const [refreshFormInsert, setRefreshFormInsert] = useState("")

    const [errorCustomerID, setErrorCustomerID] = useState(false)
    const [errorEmail, setErrorEmail] = useState(false)
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorFullName, setErrorFullName] = useState(false)
    const [errorBirthday, setErrorBirthday] = useState(false)
    const [errorPhoneNumber, setErrorPhoneNumber] = useState(false)
    const [errorPassport, setErrorPassport] = useState(false)


    let refEmail = useRef()

    useEffect(() => {
        let getAPINextID = async() => {
            let res = await axios.get("http://localhost:8080/api/customer/next-customerID")
            setCustomerID(res.data.customerID)
        }
        getAPINextID()
    }, [refreshFormInsert])

    let annouceError = (messageError) => {
        toast.error(messageError, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    let handleClickInsert = async() => {
        let salt = bcrypt.genSaltSync(10);
        let hashPassword = bcrypt.hashSync(password, salt);
        let res = await axios.post("http://localhost:8080/api/customer/insert-customer", {
            customerID : customerID,
            email : email,
            password : hashPassword,
            fullName : fullName,
            gender : gender,
            birthday : birthday + "",
            phoneNumber : phoneNumber,
            passport : passport,
        })
        if(res.data.insert){
            Swal.fire(
            'Thêm Khách Hàng Thành Công!!!',
            'You clicked the button!',
            'success'
            ).then(() => {
                setEmail("")
                setPassword("")
                setFullName("")
                setGender(true)
                setBirthday("")
                setPhoneNumber("")
                setPassport("")
                refEmail.current.focus()
            })

            getIdPlaceTravel(`insert ${customerID}`)
            setRefreshFormInsert(`insert ${customerID}`)
        }
        else{
            res.data.arrayPathError.forEach((path) => {
                if(path === "customerID"){
                    setErrorCustomerID(true)
                    let arrayErrorsCustomerID = res.data.arrayError.filter((errors) => {
                        return errors[0].path === "customerID"
                    })[0]
                    annouceError(arrayErrorsCustomerID[0].message)
                }
                else if(path === "email"){
                    setErrorEmail(true)
                    let arrayErrorsEmail = res.data.arrayError.filter((errors) => {
                        return errors[0].path === "email"
                    })[0]
                    annouceError(arrayErrorsEmail[0].message)
                }
                else if(path === "password"){
                    setErrorPassword(true)
                    let arrayErrorsPassword = res.data.arrayError.filter((errors) => {
                        return errors[0].path === "password"
                    })[0]
                    annouceError(arrayErrorsPassword[0].message)
                }
                else if(path === "fullName"){
                    setErrorFullName(true)
                    let arrayErrorsFullName = res.data.arrayError.filter((errors) => {
                        return errors[0].path === "fullName"
                    })[0]
                    annouceError(arrayErrorsFullName[0].message)
                }
                else if(path === "birthday"){
                    setErrorBirthday(true)
                    let arrayErrorsBirthday = res.data.arrayError.filter((errors) => {
                        return errors[0].path === "birthday"
                    })[0]
                    annouceError(arrayErrorsBirthday[0].message)
                }
                else if(path === "phoneNumber"){
                    setErrorPhoneNumber(true)
                    let arrayErrorsPhoneNumber = res.data.arrayError.filter((errors) => {
                        return errors[0].path === "phoneNumber"
                    })[0]
                    annouceError(arrayErrorsPhoneNumber[0].message)
                }
                else if(path === "passport"){
                    setErrorPassport(true)
                    let arrayErrorsPassport = res.data.arrayError.filter((errors) => {
                        return errors[0].path === "passport"
                    })[0]
                    annouceError(arrayErrorsPassport[0].message)
                }
            })
        }
    }

    return (
        <div className='form-insert-travel'>
            <span className='title-form'>THÊM ĐỊA ĐIỂM DU LỊCH</span>
            <div className='container-form'>
                <div className='Form'>
                    <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label style={{color : errorCustomerID ? "red" : "black"}}>Mã khách hàng</Form.Label>
                        <Form.Control type="text" disabled placeholder="" value={customerID} onChange = {(event) => setCustomerID(event.target.value)}/>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label style={{color : errorEmail ? "red" : "black"}}>Email</Form.Label>
                        <Form.Control type="email" autoFocus ref={refEmail}  placeholder="" value={email} 
                        onChange = {(event) => setEmail(event.target.value)}
                        onFocus = {() => setErrorEmail(false)}
                        />
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label style={{color : errorPassword ? "red" : "black"}}>Password</Form.Label>
                        <Form.Control type="password" placeholder="" value={password} 
                        onChange = {(event) => setPassword(event.target.value)}
                        onFocus = {() => setErrorPassword(false)}
                        />
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label style={{color : errorPassport ? "red" : "black"}}>Căn Cước</Form.Label>
                        <Form.Control type="text" placeholder="" value={passport} 
                        onChange = {(event) => setPassport(event.target.value)}
                        onFocus = {() => setErrorPassport(false)}
                        />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                        <Form.Label style={{color : errorFullName ? "red" : "black"}}>Họ Tên</Form.Label>
                        <Form.Control type="text" placeholder="" value={fullName} 
                        onChange = {(event) => setFullName(event.target.value)}
                        onFocus = {() => setErrorFullName(false)}
                        />
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label style={{color : errorBirthday ? "red" : "black"}}>Ngày Sinh</Form.Label>
                        <Form.Control type="date" placeholder="" value={birthday} 
                        onChange = {(event) => setBirthday(event.target.value)}
                        onFocus = {() => setErrorBirthday(false)}
                        />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Giới Tính</Form.Label>
                        <Form.Select defaultValue={gender} onChange = {(event) => setGender(event.target.value)}>
                            <option value={true}>Nam</option>
                            <option value={false}>Nữ</option>
                        </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                        <Form.Label style={{color : errorPhoneNumber ? "red" : "black"}}>Số Điện Thoại</Form.Label>
                        <Form.Control type="tel" placeholder="" value={phoneNumber} 
                        onChange = {(event) => setPhoneNumber(event.target.value)}
                        onFocus = {() => setErrorPhoneNumber(false)}
                        />
                        </Form.Group>
                    </Row>
                    </Form>
                </div>
                <div className='btn-insert'>
                    <Button variant="success" className='button' onClick={handleClickInsert}>
                        <MdPostAdd className='icon-post-travel'/> Thêm
                    </Button>{' '}
                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
            </div>
        </div>
    );
}

export default FormInsertCustomer