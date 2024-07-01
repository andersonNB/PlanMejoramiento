import { useEffect } from 'react';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import useSelectorStrategicLine from '../../hooks/selectors/useSelectorStrategicLine.js';
import useSelectorStrategicAxis from '../../hooks/selectors/useSelectorStretegicAxis.js';
import useSelectorInvestmentProgram from '../../hooks/selectors/useSelectorInvestmentProgram.js';
import TableInvestmentProgram from '../InvestmentProgram/TableInvestmentProgram.jsx';

export const InvestmentProgram = () => {
	const [form] = Form.useForm();
	const { getAllStrategicAxes, strategicAxes } = useSelectorStrategicAxis();
	const { getAllStrategicLine, strategicLines } = useSelectorStrategicLine();
	const { createdInvestmentProgram, getAllInvestmentProgram, investmentPrograms } = useSelectorInvestmentProgram();

	useEffect(() => {
		getAllStrategicAxes();
		getAllStrategicLine();
		getAllInvestmentProgram();
	}, []);

	const onSubmitStrategicLine = (values) => {
		const { prinNombre, liesId, ejesId } = values;
		createdInvestmentProgram({ prinNombre, liesId, ejesId });
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
						name="prinNombre"
						rules={[
							{
								required: true,
								message: 'Digite un nombre para el programa de Inversion'
							}
						]}
					>
						<Input placeholder="Nombre Programa Inversión" />
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
						label="Asignar Linea estrategica"
						name="liesId"
						rules={[
							{
								required: false,
								message: 'Escoga un nombre por favor'
							}
						]}
					>
						<Select placeholder=" Linea estrategica">
							{strategicLines?.length > 0 &&
								strategicLines.map((line, index) => {
									return (
										<Select.Option key={index} value={line?.liesId}>
											{line?.liesNombre}
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
				<TableInvestmentProgram datasource={investmentPrograms}  />
			</Col>
		</Row>
	);
};
