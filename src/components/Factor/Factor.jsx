import { useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import TableDinamic from './TableFactor.jsx';

import useSelectorFactor from '../../hooks/selectors/useSelectorFactor.js';

export const Factor = () => {
	const [form] = Form.useForm();
	const { getAllFactorTypes, factorTypes, factors, createFactor, getAllFactor } = useSelectorFactor();

	// TODO: Mirar por que se llama el servicio 3 veces
	console.log(factorTypes.length);
	useEffect(() => {
		getAllFactor();
		getAllFactorTypes();
	}, []);

	const onSubmitFactor = (values) => {
		console.log(values);
		const { factNombre, tifaId } = values;
		createFactor({ factNombre, tifaId }, values);
		form.resetFields();
	};

	return (
		<Row style={{ backgroundColor: '#fafafa', borderRadius: '10px' }} justify="center" gutter={[16, 16]}>
			<Col xs={12} sm={12} md={24} lg={24}>
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24}>
				<Form
					form={form}
					name="formLogin"
					layout="horizontal"
					onFinish={onSubmitFactor}
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
						name="factNombre"
						rules={[
							{
								required: true,
								message: 'Digite un nombre para el factor'
							}
						]}
					>
						<Input placeholder="nombre factor" />
					</Form.Item>

					<Form.Item
						label="Tipo Factor"
						name="tifaId"
						rules={[
							{
								required: true,
								message: 'Por favor, elija un tipo de factor'
							}
						]}

					>
						<Select placeholder="Tipo factor">
							{factorTypes.length > 0 &&
								factorTypes.map((tipoFactor, index) => {
									return (
										<Select.Option key={index} value={tipoFactor?.tifaId}>
											{tipoFactor?.tifaNombre}
										</Select.Option>
									);
								})}
						</Select>
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
			<Col xs={12} sm={12} md={24} lg={24}>
				<TableDinamic datasource={factors} />
			</Col>
		</Row>
	);
};
