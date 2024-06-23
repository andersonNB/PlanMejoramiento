import { memo, useEffect } from 'react';
import { Button, Col, Form, Input, Row } from 'antd';
import useSelectorTypeSituation from '../../hooks/selectors/useSelectorTypeSituation';
import TableTypeSituation from './TableTypeSituation';

const TypeSituationComponent = () => {
	const [form] = Form.useForm();
	const { createTypeSituation, typeSituations, getAllTypeSituation } = useSelectorTypeSituation();

	// TODO: Mirar por que se llama el servicio 3 veces
	useEffect(() => {
		getAllTypeSituation();
	}, [typeSituations.length > 0]);


	const onSubmitTypeSituation = (values) => {
		console.log(values);
		createTypeSituation(values);
		form.resetFields();
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
					onFinish={onSubmitTypeSituation}
					labelCol={{
						span: 6,
					}}
					wrapperCol={{
						span: 12,
						md: { span: 12 },
					}}
				>
					<Form.Item
						label='Tipo de Situación'
						name='tisiNombre'
						rules={[
							{
								required: true,
								message: 'Digite el tipo de situación',
							},
						]}
					>
						<Input placeholder='Tipo de situación' />
					</Form.Item>
					<Form.Item
						wrapperCol={{
							md: { span: 12, offset: 6 },
						}}
						style={{ textAlign: 'center' }}
					>
						<Button type='primary' htmlType='submit' style={{ backgroundColor: '#D73925', color: 'white' }}>
							Crear
						</Button>
					</Form.Item>
				</Form>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24}>
				{typeSituations.length > 0 && <TableTypeSituation datasource={typeSituations} />}
			</Col>
		</Row>
	);
};
TypeSituationComponent.displayName = 'TypeSituation';

export const TypeSituation = memo(TypeSituationComponent);
