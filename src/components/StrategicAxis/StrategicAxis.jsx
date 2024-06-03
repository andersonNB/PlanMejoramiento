import { useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import TableDinamic from './TableStrategicAxes.jsx';
import useSelectorStrategicAxis from '../../hooks/selectors/useSelectorStretegicAxis.js';

export const StrategicAxis = () => {
	const [form] = Form.useForm();
	const { getAllStrategicAxes, strategicAxes, createStrategicAxis, updateStrategicAxis } = useSelectorStrategicAxis();

	// TODO: Mirar por que se llama el servicio 3 veces
	console.log(strategicAxes.length);
	useEffect(() => {
		getAllStrategicAxes();
	}, []);

	const onSubmitStrategicAxis = (values) => {
		console.log(values);
		const { ejesNombre } = values;
		createStrategicAxis({ ejesNombre }, values);
		form.resetFields();
	};

	return (
		<Row style={{ backgroundColor: 'rgb(196 226 196)' }} justify="center" gutter={[16, 16]}>
			<Col xs={12} sm={12} md={24} lg={24} style={{ backgroundColor: 'gray' }}>
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24} style={{ backgroundColor: 'salmon' }}>
				<Form
					form={form}
					name="formLogin"
					layout="horizontal"
					onFinish={onSubmitStrategicAxis}
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
						name="ejesNombre"
						rules={[
							{
								required: true,
								message: 'Digite un nombre para el eje strategico'
							}
						]}
						style={{ backgroundColor: 'red' }}
						// wrapperCol={{
						// 	md: { span: 12, offset: 6 },
						// 	lg: { span: 12, offset: 6 },
						// }}
					>
						<Input placeholder="nombre factor" />
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
			<Col xs={12} sm={12} md={24} lg={24} style={{ backgroundColor: '#7979fd' }}>
				<TableDinamic datasource={strategicAxes} />
			</Col>
		</Row>
	);
};
