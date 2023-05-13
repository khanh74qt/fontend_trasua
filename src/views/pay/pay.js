import "./pay.css"
import {
    Link
} from "react-router-dom";
import vnpay from '../../public/images/vnpay.jpg'
import cash from '../../public/images/cash.jpg'
function Pay(props) {
    let totalPrice = props.totalPrice;
    let isLoadingPay = props.isLoadingPay;
    return (
        <div className="pay-content" style={{ textAlign: "center" }}>
            <div className="topnav">
                <Link to="/home">Home</Link>
            </div>
            <br />
            <h3>Tổng tiền cần thanh toán: {totalPrice} VND</h3>
            {isLoadingPay === true ?
                <>
                    <div class="spinner-grow" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div class="spinner-grow" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </>
                
                
                :
                <>
                    <h4>Thanh toán với VNPAY</h4>
                    <a href=""><img style={{ height: '200px', width: '200px', }} src={vnpay} class="img-thumbnail" alt='k'></img></a><br /><br />
                    <h4>Thanh toán bằng tiền mặt</h4>
                    <a href=""><img onClick={() => { props.acceptPay(); }} style={{ height: '200px', width: '200px', }} src={cash} class="img-thumbnail" alt='k'></img></a>
                </>
            }

        </div>
    )
}
export default Pay;