import ImagesPool from "../imagesPool";
import "./menu.css";
import { useEffect } from 'react';

function Menu(props) {
    const productData = props.productData;
    useEffect(()=>{
        props.resetIsLoadingPay();
    },[])
    return (
        <div className="menuProduct">
            {productData.map((item, index) => {
                return (
                    <div key={index} className="card">
                        <img style={{ style: "width:100px", height:"150px" }} src={ImagesPool[index].src} alt='' />
                        <h5 style={{color:"black"}} >{item.name}</h5>
                        <p className="price">{item.price} VND</p>
                        <p>
                            <button onClick={()=>props.buttonBuyClick(item,index)} className="bg-primary rounded-2 border-light">Mua</button>
                        </p>
                    </div>

                )
            })}
        </div>
     
    )
}
export default Menu;