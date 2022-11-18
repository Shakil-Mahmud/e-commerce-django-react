import React, { useEffect } from 'react'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeFromCart} from '../actions/cartActions'
import Product from '../components/Product'

function CartScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const qty = location.search ? Number(location.search.split('=')[1]): 1;
    // const qty = location.search.slice(5,);

    const params = useParams();
    const productId = params.id;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    // console.log("cartItems", cartItems);

    // const [count, setCount] = useState({});
    // cartItems.forEach( item =>{
    //     setCount(count[item.product] = item.qty )
    // })

    const removeFromCartHandler = (id)=>{
        dispatch(removeFromCart(id));
    }

    const checkOutHandler = () =>{
        navigate('/login?redirect=/shipping')
    }

    useEffect(()=> {
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty])

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length<=0?
                    (<Message variant='info' >
                        Your cart is empty <Link to='/'>Go Back</Link>
                    </Message>)
                    :(
                        <ListGroup variant='flush'>
                            {cartItems.map(item => (
                                <ListGroup.Item key={item.product}>
                                    <Row>
                                        <Col md={2}>
                                            <Image src={item.image} alt={item.name} fluid rounded />
                                        </Col>
                                        <Col md={3}>
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </Col>
                                        <Col md={2}>
                                            ${item.price}
                                        </Col>
                                        <Col md={3} >
                                            <p>{item.qty}</p>
                                            {/* <div className="d-flex justify-content-center">
                                                <ListGroup.Item> 
                                                    <div >
                                                    <button className="btn btn-link px-2"
                                                        onClick={ ()=> { count[item.product]>1 ? setCount(count[item.product]-1) : setCount(count[item.product]=1)}>
                                                        <i className="fas fa-minus"></i>
                                                    </button>
                                                        <span className='cout-box px-5 py-2 border-bottom'>{count[item.product]}</span>
                                    
                                                    <button className="btn btn-link px-2"
                                                        onClick={ ()=>  count[item.product]<item.countInStock? setCount(count[item.product]+1) : item.countInStock }>
                                                        <i className="fas fa-plus"></i>
                                                    </button>
                                                    </div>
                                                </ListGroup.Item>
                                            </div>                                             */}
                                        </Col>
                                        <Col md={1} >
                                            <Button 
                                                type='button'
                                                variant='light'
                                                onClick={()=> removeFromCartHandler(item.product)}
                                            >
                                                <i className='fas fa-trash' />
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>    
                    )
                }
            </Col>
            <Col md={4}>
                <Card className='mt-4'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce( (sum, item)=> sum+item.qty, 0 )}) items</h2>
                            ${cartItems.reduce( (sum, item)=> sum+item.qty*item.price, 0 )}
                        </ListGroup.Item>
                    </ListGroup>

                    <ListGroup>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled = {cartItems.length===0? true:false}
                            onClick={checkOutHandler}
                        >
                            Proceed To Checkout
                        </Button>        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;