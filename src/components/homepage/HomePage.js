import Menu from "../menu/Menu"

import "../../styles/home/homepage.scss"
import { Outlet } from "react-router-dom"

let HomePage = () => {
    return (
        <div className="home-page">
            <div className="content-menu">
                <Menu/>
            </div>
            <div className="content-page">
                <Outlet/>
            </div>
        </div>
    )
}

export default HomePage