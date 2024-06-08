import { useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import TableDinamic from './TableStrategicLine.jsx';

const { TextArea } = Input;

import useSelectorStrategicLine from '../../hooks/selectors/useSelectorStrategicLine.js';
import useSelectorStrategicAxis from '../../hooks/selectors/useSelectorStretegicAxis.js';

export const StrategicLine = () => {
	const [form] = Form.useForm();
	const { getAllStrategicAxes, strategicAxes } = useSelectorStrategicAxis();
	const {
		getAllStrategicLine,
		createStrategicLine,
		strategicLines
	} = useSelectorStrategicLine();


	useEffect(() => {
		getAllStrategicAxes();
		getAllStrategicLine();
	}, []);

	const onSubmitStrategicLine = (values) => {
		const { liesNombre, liesObjetivos, ejesId } = values;
		createStrategicLine({ liesNombre, liesObjetivos, ejesId }, values);
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
					onFinish={onSubmitStrategicLine}
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
						name="liesNombre"
						rules={[
							{
								required: true,
								message: 'Digite un nombre para la linea estrategica'
							}
						]}
					>
						<Input placeholder="Nombre Linea Estrategica" />
					</Form.Item>

					<Form.Item
						label="Eje estrategico"
						name="ejesId"
						rules={[
							{
								required: true,
								message: 'Por favor, elija un eje estrategico'
							}
						]}

					>
						<Select placeholder="Ejes estrategicos">
							{strategicAxes.length > 0 &&
								strategicAxes.map((eje, index) => {
									return (
										<Select.Option key={index} value={eje?.ejesId}>
											{eje?.ejesNombre}
										</Select.Option>
									);
								})}
						</Select>
					</Form.Item>

					<Form.Item
						label="Objetivos"
						name="liesObjetivos"
						rules={[
							{
								required: false,
								message: 'Ingresa los objetivos si deseas'
							}
						]}
					>
						<TextArea placeholder="Objetivos" />
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
				<TableDinamic datasource={strategicLines} />
			</Col>
		</Row>
	);
};
