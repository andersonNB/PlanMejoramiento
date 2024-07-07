import { useEffect } from 'react';
import { Col, Row, Form, Input, Button, Select } from 'antd';
import useSelectorProgramAcademic from '../../hooks/selectors/useSelectorProgramAcademic';
import useSelectorImprovementPlan from '../../hooks/selectors/useSelectorImprovementPlan.js';

export const ImprovementAction = () => {
	const [form] = Form.useForm();


	const { getAllAcademicProgram } = useSelectorProgramAcademic();
	const { getAllImprovementPlans, improvementPlans, improvementPlan } = useSelectorImprovementPlan();


	useEffect(() => {
		getAllAcademicProgram();
		getAllImprovementPlans();
	}, []);

	useEffect(() => {
		getAllImprovementPlans();
	}, [improvementPlans.length > 0]);


	const onSubmitPlan = (values) => {
		console.log(values);

	};

	//TODO: CREAR el formulario de accion de mejora (se me ocurre un Drawer)
	return (
		//TODO: Realizar la manera de seleccionar el plan de mejoramiento, usé el formulario por afan
		<Row style={{ backgroundColor: '#fafafa', borderRadius: '10px' }} justify="center" gutter={[16, 16]}>
			<Col xs={12} sm={12} md={24} lg={24}>
				<h3 style={{ textAlign: 'center' }}> Acciones de mejora</h3>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24}>
				<Form
					form={form}
					name="formLogin"
					layout="horizontal"
					onFinish={onSubmitPlan}
					labelCol={{
						span: 6
					}}
					wrapperCol={{
						span: 12,
						md: { span: 12 }
					}}
				>
					<Form.Item
						label="Plan de mejoramiento"
						name="plmeId"
						rules={[
							{
								required: true,
								message: 'Por favor, escoja un plan de mejoramiento'
							}
						]}
					>
						<Select placeholder="Selccionar plan Mejoramiento">
							{improvementPlans?.length > 0 &&
								improvementPlans.map((plan, index) => {
									return (
										<Select.Option key={index} value={plan?.plmeId}>
											{plan?.plmeNombre}
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
						<Button type="primary" htmlType="submit"
							  style={{ backgroundColor: '#D73925', color: 'white' }}>
							Seleccionar Plan
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24}>
				//TODO: Realizar listado de acciones de mejora segun el plan de mejoramiento seleccionado
			</Col>
		</Row>
	);
};
