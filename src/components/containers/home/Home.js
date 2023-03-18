import axios from 'axios';
import { useEffect, useState } from 'react';
import ChartTop5PlaceTravel from './ChartTop5PlaceTravel';
import Statistical from './Statistical';

import "../../../styles/statistical/home.scss"
import RevenueInYear from './RevenueInYear';

let Home = () => {

  const [dataChartPie, setDataChartPie] = useState([])
  const [dataRevenue, setDataRevenue] = useState([])

  useEffect(() => {
    let getDataTopTravel = async() => {
      let resTopTravel = await axios.get("http://localhost:8080/api/home/list-top-travel")
      setDataChartPie(resTopTravel.data.arrayTopTravel)
    }
    getDataTopTravel()
  }, [])

  useEffect(() => {
    let getDataRevenueInYear = async() => {
      let res = await axios.get("http://localhost:8080/api/home/revenue-travel-in-year")
      setDataRevenue(res.data.listRevenueInYear)
    }
    getDataRevenueInYear()
  }, [])

    return (
        <div className="home" style={{ width : "100%", height : "100%"}}>
          <div className='header-home'>
            <Statistical/>
          </div>
          <div className='statistical-top-travel'>
            <ChartTop5PlaceTravel dataChartPie = {dataChartPie}/>
          </div>
          <div className='revenue-in-year-current'>
            <RevenueInYear dataRevenue = {dataRevenue}/>
          </div>
        </div>
    )
}

export default Home