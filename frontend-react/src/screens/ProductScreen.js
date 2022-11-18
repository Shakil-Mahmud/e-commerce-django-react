import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Link, useParams, useNavigate } from 'react-router-dom'
import { detailProduct } from '../actions/productActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {Row, Col, Image, ListGroup, Button} from 'react-bootstrap'

function ProductScreen(props) {
    const dispatch = useDispatch()
    // const {loading, error, products} = useSelector()
    const productDetails = useSelector( state => state.productDetails )
    const {error, loading, product} = productDetails
    const [count, setCount] = useState(1);
    const params = useParams();
    const navigate = useNavigate();
    useEffect( ()=>{
      dispatch(detailProduct(params.id))
    }, [dispatch, params.id] )

    const addToCart = () =>{
      // props.history.push({path: `/cart/${params.id}?qty=${count}`})
      // props.history.push({  pathname: '/register', search:`?qty=${count}`});

      navigate(`/cart/${params.id}?qty=${count}`)
    }

  return (
    <div>
        {loading? <Loader />
          : error? <Message  variant='danger'>{error}</Message>
          : 
          <Row className='pt-3'>
            <Col sm={12} md={6} lg={6} >
              <Image style={{ maxHeight: '75vh', objectFit:'contain'}}
              src={product.image} fluid />
            </Col>
    
            <Col >
                <ListGroup className='' >
                  <ListGroup.Item><h2  className="product-name text-center">{product.name}</h2></ListGroup.Item>
                  <ListGroup.Item><h3  className='product-price text-center'>¥{product.price}</h3></ListGroup.Item>
                  <ListGroup.Item> {product.description}</ListGroup.Item>
                </ListGroup>          
            </Col>
    
            <Col>
              <ListGroup>
                { product.countInStock<=0 ?
                    <ListGroup.Item>
                      <h4 className='text-secondary text-center'>Out of Stock</h4>
                    </ListGroup.Item>
                  :
                    <div className="d-flex justify-content-center">
                      <ListGroup.Item> 
                        <div >
                          <button className="btn btn-link px-2"
                            onClick={ ()=> count>1 ? setCount(count-1) : setCount(1)}>
                            <i className="fas fa-minus"></i>
                          </button>
                            <span className='cout-box px-5 py-2 border-bottom'>{count}</span>
          
                          <button className="btn btn-link px-2"
                            onClick={ ()=>  count<product.countInStock? setCount(count+1) : product.countInStock }>
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <div className='mx-auto pt-2'>
                          <Button variant="primary" size="lg"
                            onClick={addToCart}    
                          >
                            <i className='fas fa-shopping-cart'></i>
                            Add to cart
                          </Button>
                        </div>
                      </ListGroup.Item>
                    </div>            
                    
                }
              </ListGroup>          
            </Col>
          </Row>
        }     
    </div>
  )
}

export default ProductScreen