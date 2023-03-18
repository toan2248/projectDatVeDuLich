import { Route, Routes } from 'react-router-dom';
import './App.scss';
import ListCustomer from './components/containers/customer/ListCustomer';
import Home from './components/containers/home/Home';
import ListComments from './components/containers/placeTravel/comment/ListComments';
import InformationPlaceTravel from './components/containers/placeTravel/detailPlaceTravel/InformationPlaceTravel';
import DiscountTravel from './components/containers/placeTravel/discountPlaceTravel/DiscountTravel';
import ListFareTravel from './components/containers/placeTravel/fare/ListFareTravel';
import ListPlaceTravel from './components/containers/placeTravel/listPlaceTravel/ListPlaceTravel';
import SaleTravel from './components/containers/placeTravel/saleTravel/SaleTravel';
import SchedulePlaceTravel from './components/containers/placeTravel/schedulePlaceTravel/SchedulePlaceTravel';
import ListTicket from './components/containers/ticket/ListTicket';
import HomePage from './components/homepage/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/place-travel/list' element={<ListPlaceTravel/>}/>
          <Route path='/place-travel/information' element={<InformationPlaceTravel/>}/>
          <Route path='/place-travel/comments' element={<ListComments/>}/>
          <Route path='/place-travel/schedule' element={<SchedulePlaceTravel/>}/>
          <Route path='/place-travel/discount' element={<DiscountTravel/>}/>
          <Route path='/place-travel/sale' element={<SaleTravel/>}/>
          <Route path='/place-travel/fare' element={<ListFareTravel/>}/>
          <Route path='/customer/list' element={<ListCustomer/>}/>
          <Route path='/customer/history' element={<ListTicket/>}/>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
