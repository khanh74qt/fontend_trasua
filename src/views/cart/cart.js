import "./cart.css";
import {
    Link
} from "react-router-dom";
import ImagesPool from "../imagesPool";


function Cart(props) {
    let orderInfo = props.orderInfo;
    let totalPrice = props.totalPrice;
    return (
        <div className="cart-content">
            <div className="topnav">
                <Link to="/home">Home</Link>
            </div>
            <table class="table" style={{ color: "white"}}>
                <thead>
                    <tr>
                        <th scope="col">Sản Phẩm</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Xóa</th>
                    </tr>
                </thead>
                <tbody>
                    {orderInfo.map((item, index) => {
                        return (
                            <>
                                <tr>
                                    <th scope="row"><img style={{height:"100px",width:"100px"}} src={ImagesPool[item.id].src} alt="" /></th>
                                    <td>
                                        {item.name} <br/>
                                        Lượng đường:{item.sugar} %<br/>
                                        Lượng đá:{item.ice} %
                                    </td>
                                    <td>{item.price}</td>
                                    <td> <i onClick={()=>{props.deleteOrderInCart(item.id);props.updateTotalPriceDelete(item)}} style={{fontSize:"30px"}} class="fa-solid fa-trash text-danger"></i> </td>
                                </tr>
                            </>
                        )
                    })}
                    <tr>
                        <th colSpan="3">TỔNG TIỀN</th>
                        <td>{totalPrice} VND</td>
                    </tr>
                    <tr>
                        <th colSpan="2"><button type="button" class="btn btn-info"><Link style={{color:"white",textDecoration:"none"}} to="/home">TIẾP TỤC MUA HÀNG</Link></button></th>
                        <th colSpan="2"><button onClick={()=>{props.acceptPay()}} type="button" class="btn btn-success"><Link style={{color:"white",textDecoration:"none"}} to="/pay">THANH TOÁN</Link></button></th>
                    </tr>

                </tbody>
            </table>
        </div>
    );
}
export default Cart;