import React, { FC } from 'react'
import { Product } from '../productReducer'
import { Button, Card, Col, Row } from 'antd'

const { Meta } = Card

interface ProductListProps {
    products: Product[],
    onEdit: (product: Product) => void,
    onDelete: (product: Product) => void,
}

const ProductList: FC<ProductListProps> = ({products, onEdit, onDelete}) => {
    return (
        <Row gutter={[16, 16]} className='product-list'>
            {
                products.map(product => (
                    <Col span={6} xs={24} sm={8} lg={6} key={product.id}>
                        <Card 
                            hoverable={true}
                            actions={[
                                <Button onClick={() => onEdit(product)} type='default'>Edit</Button>,
                                <Button onClick={() => onDelete(product)} type='default'>Delete</Button>
                            ]}
                        >
                            <Meta 
                                title={product.name}
                                description={`Price: $${product.price}. Stock: ${product.stock}`}
                            />
                        </Card>
                    </Col>
                ))
            }
        </Row>
    )
}

export default ProductList