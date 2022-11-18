import React from 'react'
import {Card } from 'react-bootstrap'
import {Link} from 'react-router-dom'

function Product( { product } ) {
  return (
    <Card >
        <Link to={`/product/${product._id}`}>
            <Card.Img variant='top'  style={{objectFit:'contain'}} src={product.image} className="p-2" />
        </Link>
        <Card.Body className='mx-auto'>
            <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color:'gray' }}>
            <Card.Title as="div" >
                <strong>{product.name}</strong>
            </Card.Title>
            </Link>
            <Card.Title>{product.price}</Card.Title>
        </Card.Body>
    </Card>
  )
}

export default Product