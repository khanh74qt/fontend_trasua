
import './App.css';
import Menu from './menu/menu';
import Pay from './pay/pay';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import ImagesPool from './imagesPool';
import Cart from './cart/cart';
import React from 'react';
import { useAlert } from 'react-alert'
import axios from 'axios';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,


} from "react-router-dom";




function App() {

  const alert = useAlert();
  //const [currentOrder, setCurrentOrder] = useState({ sugar: 0, ice: 0 })
  const [totalPrice,setTotalPrice] = useState(0);
  const [isLoadingLogin,setIsLoadingLogin] = useState("nodata");
  const [isLoadingPay,setIsLoadingPay] = useState(true);
  const [orderInfo, setOderInfo] = useState([]);
  const [itemSelected, setItemSelected] = useState(0);
  const [productData, setProductData] = useState([
    { 'id': 0, 'name': 'trà sữa truyền thống', 'price': 10000, 'imgSrc': 0, 'detailShow': false, 'orderShow': false },
    { 'id': 1, 'name': 'trà sữa thái xanh', 'price': 15000, 'imgSrc': 1, 'detailShow': false, 'orderShow': false },
    { 'id': 2, 'name': 'cafe sữa đá', 'price': 20000, 'imgSrc': 2, 'detailShow': false, 'orderShow': false },
    { 'id': 3, 'name': 'cafe đen đá', 'price': 30000, 'imgSrc': 3, 'detailShow': false, 'orderShow': false },
    { 'id': 4, 'name': 'rau má mix', 'price': 25000, 'imgSrc': 4, 'detailShow': false, 'orderShow': false },
    { 'id': 5, 'name': 'rau má đậu xanh', 'price': 10000, 'imgSrc': 5, 'detailShow': false, 'orderShow': false },
  ]);
  const [sugarChoosen, setSugarChoosen] = useState(
    { sugar0: false, sugar50: true, sugar100: false },
  )

  const [iceChoosen, setIceChoosen] = useState(
    { ice0: false, ice50: true, ice100: false },
  )

  const buttonBuyClick = (item, index) => {
    // ham xu ly khi khach hang nhan nut mua hang
    let newProductData = [...productData];
    newProductData[index].orderShow = true;
    setProductData(newProductData);
    setItemSelected(index);
  }
  const closeModal = (index) => {
    let newProductData = [...productData];
    newProductData[index].orderShow = false;
    setProductData(newProductData);
    setItemSelected(index);
  }
  const selectSugar = (index) => {
    switch (index) {
      case 0:
        setSugarChoosen({ sugar0: true, sugar50: false, sugar100: false })
        break;
      case 50:
        setSugarChoosen({ sugar0: false, sugar50: true, sugar100: false })
        break;
      case 100:
        setSugarChoosen({ sugar0: false, sugar50: false, sugar100: true })
        break;
    }
  }
  const resetSugarIceChoosen = () => {
    setSugarChoosen({ sugar0: false, sugar50: true, sugar100: false })
    setIceChoosen({ ice0: false, ice50: true, ice100: false })
  }
  const selectIce = (index) => {
    switch (index) {
      case 0:
        setIceChoosen({ ice0: true, ice50: false, ice100: false })
        break;
      case 50:
        setIceChoosen({ ice0: false, ice50: true, ice100: false })
        break;
      case 100:
        setIceChoosen({ ice0: false, ice50: false, ice100: true })
        break;

    }
  }
  const addToCart = (itemSelected) => {

    let data = { id: 0, name: "", price: "", imgSrc: 0, sugar: 0, ice: 0 }
    if (sugarChoosen.sugar0 === true) {
      data.sugar = 0;
    } else if (sugarChoosen.sugar50 === true) {
      data.sugar = 50;
    } else {
      data.sugar = 100;
    }
    //--------------
    if (iceChoosen.ice0 === true) {
      data.ice = 0;
    } else if (iceChoosen.ice50 === true) {
      data.ice = 50;
    } else {
      data.ice = 100;
    }
    data.id = productData[itemSelected].id;
    data.name = productData[itemSelected].name;
    data.price = productData[itemSelected].price;
    data.imgSrc = productData[itemSelected].imgSrc;
    setOderInfo(orderInfo => [...orderInfo, data])
    alert.show("Đã thêm vào giỏ hàng");
  }
  const deleteOrderInCart = (id) => {
    // xóa sản phẩm trong giỏ hàng

    let newArr = [...orderInfo];
    const index = newArr.findIndex((obj) => obj.id === id)// tìm index của phần tử có id trong orderInfo
    //console.log("check index>>>",index)
    newArr.splice(index, 1);
    setOderInfo(newArr);

  }
  const login = async (e) => {

    e.preventDefault();
    setIsLoadingLogin("loading");
    console.log(e.target.sdt.value);
    localStorage.setItem("sdt",e.target.sdt.value)
    await axios({
      method: 'post',
      url: process.env.REACT_APP_LOGINPHONE_URL,
      data: {
        sdt: e.target.sdt.value
      }
    }).then(function (response) {
      
      setIsLoadingLogin("loaded");
      console.log(response)
    })
  }
  const acceptPay = async()=>{
    // khi khachs hang chon xong hinh thuc thanh toan thi chyaj ham nay 
    let orderString = "";
    orderString = JSON.stringify(orderInfo);
    console.log(orderString);
    console.log("thanh toan")
    await axios({
      method: 'post',
      url: process.env.REACT_APP_ACCEPTPAY_URL,
      data: {
        sdt: localStorage.getItem("sdt"),
        content:orderString,
        status:"orderSuccess"
      }
    }).then(function(response)
    {
      console.log(response);
      setIsLoadingPay(false);
    })
  }
  const updateTotalPrice = (item)=>
  {
    // cập nhật lại tổng tiền mà khách hàng cần thanh toán
    let newPrice = totalPrice;
    newPrice += productData[item].price;
    setTotalPrice(newPrice);
  }
  const updateTotalPriceDelete = (item)=>{
    //hàm này dùng để cậ[ nhật lại tổng tiền khi khách hàng xóa sản phẩm ra khỏi giỏ hàng
    let newPrice = totalPrice;
    newPrice -= item.price;
    setTotalPrice(newPrice);
    
  }
  const resetIsLoadingPay = ()=>{
    setIsLoadingPay(true);
  }

  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <div className="App">
            <header className="App-header">


              {/* thanh navbar------------------------------------------- */}
              <div>
                <div className="topnav fixed-top">
                  <Link >Home</Link>
                  <Link to="/about">about</Link>

                  <Link to="/cart" className='split'>
                    <div>
                      <i className="fa-solid fa-cart-shopping fa-2xl"></i>
                      <span className="badge rounded-pill text-bg-danger translate-middle p-2 rounded-circle border border-light">{orderInfo.length}</span>
                      Giỏ hàng
                    </div>
                  </Link>
                </div>
              </div>
              {/* thanh navbar------------------------------------------ */}

              {/* phan hien thi menu -------------------------------------*/}
              <div>
                {/* <div class="ratio">
                  <iframe className='fixed-top' style={{ height: "300px", marginTop: "55px" }} src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" title="YouTube video" allowfullscreen></iframe>
                </div> */}
                {/* <embed className='rounded-4 border border-4 border-white fixed-top' style={{ width: '400px', height: '300px', marginLeft: '10px', marginTop: '80px', border: "" }} src='https://www.youtube.com/embed/FWSQxCDymmE?autoplay=1&mute=1'></embed>  */}
              </div>
              <div style={{ marginTop: '70px' }}>
                <Menu
                  productData={productData}
                  buttonBuyClick={(item, index) => { buttonBuyClick(item, index) }}
                  resetIsLoadingPay = {()=>{resetIsLoadingPay()}}
                >
                </Menu>
              </div>


              {/* phan hien thi menu -------------------------------------*/}

              {/* phan hien thi modal order--------------------------------- */}

              <Modal
                show={productData[itemSelected].orderShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Header>
                  <Modal.Title id="contained-modal-title-vcenter">
                    Mời bạn order
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                  <div style={{ textAlign: "center" }}>
                    <img style={{ width: "100px", height: "100px" }} src={ImagesPool[itemSelected].src} alt="" /> <br /><br />
                    <h4>{productData[itemSelected].name}</h4>
                    <h5 className='price'>{productData[itemSelected].price} VND</h5>
                  </div>
                  <div style={{ textAlign: "center" }} >
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input type="radio" class="btn-check" autocomplete="off" />
                      <button class="btn btn-outline-primary">Đường</button>

                      <input type="radio" class="btn-check" autocomplete="off" checked={sugarChoosen.sugar0} />
                      <button onClick={() => { selectSugar(0); }} class="btn btn-outline-primary" >0%</button>

                      <input type="radio" class="btn-check" autocomplete="off" checked={sugarChoosen.sugar50} />
                      <button onClick={() => { selectSugar(50); }} class="btn btn-outline-primary" >50%</button>

                      <input type="radio" class="btn-check" autocomplete="off" checked={sugarChoosen.sugar100} />
                      <button onClick={() => { selectSugar(100); }} class="btn btn-outline-primary" >100%</button>
                    </div>
                  </div>
                  <br />

                  <div style={{ textAlign: "center" }} >
                    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                      <input type="radio" class="btn-check" autocomplete="off" />
                      <button class="btn btn-outline-success">Đá</button>

                      <input type="radio" class="btn-check" autocomplete="off" checked={iceChoosen.ice0} />
                      <button onClick={() => { selectIce(0) }} class="btn btn-outline-success" >0%</button>

                      <input type="radio" class="btn-check" autocomplete="off" checked={iceChoosen.ice50} />
                      <button onClick={() => { selectIce(50) }} class="btn btn-outline-success" >50%</button>

                      <input type="radio" class="btn-check" autocomplete="off" checked={iceChoosen.ice100} />
                      <button onClick={() => { selectIce(100) }} class="btn btn-outline-success" >100%</button>
                    </div>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <button type='button' className='btn btn-success' onClick={() => { addToCart(itemSelected); closeModal(itemSelected); resetSugarIceChoosen();updateTotalPrice(itemSelected); }}>Thêm vào giỏ hàng</button>
                  <button type='button' className='btn btn-danger' onClick={() => { closeModal(itemSelected); resetSugarIceChoosen(); }}>Close</button>
                </Modal.Footer>
              </Modal>
            </header>
          </div>
        </Route>

        <Route path="/cart" exact>
          <Cart
            orderInfo={orderInfo}
            deleteOrderInCart={(id) => deleteOrderInCart(id)}
            acceptPay = {()=>{acceptPay()}}
            totalPrice = {totalPrice}
            updateTotalPriceDelete = {(item)=>{updateTotalPriceDelete(item)}}
          >

          </Cart>
        </Route>

        <Route path="/home" exact>
          home
        </Route>
        <Route path="/about" exact>
          Máy được nhóm 5 thành viên học tại trường Đại Học CÔng Nghiệp TPHCM phát triển
        </Route>
        <Route path="/" exact>
          <div style={{ textAlign: "center" }}>
            <br />
            <h5>Nhập sdt của bạn để mua hàng</h5>
            {isLoadingLogin==="nodata"?"":
              isLoadingLogin==="loading"?
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
              :
              <>
                <div style={{display:"flex",justifyContent:"center"}}>
                  <div style={{textAlign:"center"}}>
                    Số đơn hàng đã mua
                    <h5>0</h5>
                  </div>
                  <div style={{textAlign:"center",marginLeft:"30px"}}>
                    Tổng tiền đã chi
                    <h5>0 VND</h5>
                  </div>
                </div>
                <Link to="/home"><button type="button" class="btn btn-success">nhấn vào đây để mua hàng</button></Link>
              </>
              
            }
            <form onSubmit={(e)=>{login(e);}} >
              <div style={{ textAlign: "center", margin: "auto", width: "80%", marginTop: "50px" }} class="form-floating mb-3">
                <input type="text" name="sdt" class="form-control" id="floatingInput" />
                <label for="floatingInput">số điện thoại</label>
              </div>
              
              <button type="submit" class="btn btn-info">xác thực sdt</button>
            </form>
            
            
          </div>
        </Route>
        <Route path="/pay" exact>
          <Pay
            totalPrice = {totalPrice}
            isLoadingPay = {isLoadingPay}
          >

          </Pay>
        </Route>
      </Switch>
    </Router >
  );
}

export default App;
