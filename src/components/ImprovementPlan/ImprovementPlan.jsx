import {useEffect} from 'react';
import { Col, Row, Form, Input, Button, Select } from 'antd';
import useSelectorProgramAcademic from '../../hooks/selectors/useSelectorProgramAcademic';
import TableImprovementPlan from './TableImprovementPlan';

export const ImprovementPlan = () => {
	const [form] = Form.useForm();


  const { getAllAcademicProgram, academicPrograms } = useSelectorProgramAcademic();

  useEffect(() => {
		getAllAcademicProgram();
	}, []);

	const onSubmitProgram = (values) => {
		console.log(values);
	};

	return (
		<Row style={{ backgroundColor: '#fafafa', borderRadius: '10px' }} justify='center' gutter={[16, 16]}>
			<Col xs={12} sm={12} md={24} lg={24}>
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24}>
				<Form
					form={form}
					name='formLogin'
					layout='horizontal'
					onFinish={onSubmitProgram}
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 12,
						md: { span: 12 },
					}}
				>
					<Form.Item
						label='Nombre'
						name='plmeNombre'
						rules={[
							{
								required: true,
								message: 'Digite un nombre para el plan de mejoramiento',
							},
						]}
					>
						<Input placeholder='nombre plan de mejoramiento' />
					</Form.Item>

					<Form.Item
						label='Programa Academico'
						name='pracId'
						rules={[
							{
								required: true,
								message: 'Por favor, escoja un programa académico',
							},
						]}
					>
						<Select placeholder='Programa Academico'>
							{academicPrograms?.length > 0 &&
								academicPrograms.map((program, index) => {
									return (
										<Select.Option key={index} value={program?.pracId}>
											{program?.pracNombre}
										</Select.Option>
									);
								})}
						</Select>
					</Form.Item>

					<Form.Item
						wrapperCol={{
							md: { span: 12, offset: 6 },
						}}
						style={{ textAlign: 'center' }}
					>
						<Button type='primary' htmlType='submit' style={{ backgroundColor: '#D73925', color: 'white' }}>
							Crear Plan
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24}>
				 <TableImprovementPlan />
			</Col>
		</Row>
	);
};
