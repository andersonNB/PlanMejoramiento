import { useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import TableDinamic from './TableProcess.jsx';
import useSelectorProcess from '../../hooks/selectors/useSelectorProcess.js';

export const Process = () => {
	const [form] = Form.useForm();
	const { getAllProcess, processes, createProcess } = useSelectorProcess();

	// TODO: Mirar por que se llama el servicio 3 veces
	useEffect(() => {
		getAllProcess();
	}, []);

	const onSubmitProcess = (values) => {
		const { procNombre } = values;
		createProcess({ procNombre }, values);
		form.resetFields();
	};

	return (
		<Row justify="center" style={{backgroundColor:"#fafafa", borderRadius:"10px"}} gutter={[16, 16]}>
			<Col xs={12} sm={12} md={24} lg={24}>
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24} >
				<Form
					form={form}
					name="formLogin"
					layout="horizontal"
					onFinish={onSubmitProcess}
					labelCol={{
						span: 6
					}}
					wrapperCol={{
						span: 12,
						md: { span: 12 }
					}}
				>
					<Form.Item
						label="Nombre"
						name="procNombre"
						rules={[
							{
								required: true,
								message: 'Digite un nombre para el proceso'
							}
						]}
					>
						<Input placeholder="nombre proceso" />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							md: { span: 12, offset: 6 }
						}}
						style={{ textAlign: 'center' }}
					>
						<Button type="primary" htmlType="submit">
							Agregar
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24} >
				<TableDinamic datasource={processes} />
			</Col>
		</Row>
	);
};
