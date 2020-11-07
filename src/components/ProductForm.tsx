import React, { FC } from 'react'
import { Form, Modal, Input } from 'antd'

interface ProductFormProps {
    visible: boolean;
    onCreate: (values: any) => void;
    onCancel: () => void;
}

const ProductForm: FC<ProductFormProps> = ({
    visible,
    onCreate,
    onCancel
}) => {
    const [form] = Form.useForm()

    return (
        <Modal
            visible={visible}
            title='Add a new product'
            okText='Add'
            cancelText='Cancel'
            onCancel={onCancel}
            onOk={() => {
                form
                .validateFields()
                .then(values => {
                    form.resetFields()
                    onCreate(values)
                })
                .catch(err => console.log('Validate Failed: ', err))
            }}
        >
            <Form
                form={form}
                layout='vertical'
                name='product_form'
                initialValues={{ stock: 5, price: 0 }}
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

export default ProductForm