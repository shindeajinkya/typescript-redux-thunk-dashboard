import React, { FC, useEffect } from 'react'
import { Form, Modal, Input } from 'antd'
import { Product } from '../productReducer'

interface EditProductFormProps {
    visible: boolean;
    onUpdate: (values: any) => void;
    onCancel: () => void;
    product: Product
}

const EditProductForm: FC<EditProductFormProps> = ({
    visible,
    onUpdate,
    onCancel,
    product,
}) => {
    const [form] = Form.useForm()

    useEffect(() => {
        if(!visible) return
        form.resetFields()
    }, [visible, form])

    return (
        <Modal
            visible={visible}
            title='Edit a Product'
            okText='Edit'
            cancelText='Cancel'
            onCancel={onCancel}
            onOk={() => {
                form
                .validateFields()
                .then(values => {
                    form.resetFields()
                    onUpdate({...values, id: product.id})
                })
                .catch(err => console.log('Validate Failed: ', err))
            }}
        >
            <Form
                form={form}
                layout='vertical'
                name='product_form'
                initialValues={product}
            >
                <Form.Item
                    name='name'
                    label='Product Label'
                    rules={[{ required: true, message: 'Please input the name of product' }]}
                >
                    <Input type='text' />
                </Form.Item>

                <Form.Item
                    name='price'
                    label='Price'
                    rules={[{ required: true, message: 'Please input the price of product' }]}
                >
                    <Input type='number' />
                </Form.Item>
                
                <Form.Item
                    name='stock'
                    label='Stock'
                    rules={[{ required: true, message: 'Please input the available stock of product' }]}
                >
                    <Input type='number' />
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default EditProductForm