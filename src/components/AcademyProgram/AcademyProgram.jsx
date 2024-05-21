import { Row, Col, Form, Input, Button } from 'antd';

export const AcademyProgram = () => {
	const onSubmitProgram = (values) => {
		console.log(values);
	};

	return (
		<Row style={{ backgroundColor: 'rgb(196 226 196)' }} justify='center' gutter={[16, 16]}>
			<Col xs={12} sm={12} md={24} lg={24} style={{ backgroundColor: 'gray' }}>
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24} style={{ backgroundColor: 'salmon' }}>
				<Form
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
						name='programName'
						rules={[
							{
								required: true,
								message: 'Digite un nombre para el programa académico',
							},
						]}
						style={{ backgroundColor: 'red' }}
						// wrapperCol={{
						// 	md: { span: 12, offset: 6 },
						// 	lg: { span: 12, offset: 6 },
						// }}
					>
						<Input placeholder='nombre programa academico' />
					</Form.Item>

					<Form.Item
						label='Codigo'
						name='programCode'
						style={{ backgroundColor: 'yellowgreen' }}
						rules={[
							{
								required: true,
								message: 'Por favor, digite un código para el programa académico',
							},
						]}
						// wrapperCol={{
						// 	md: { span: 12, offset: 6 },
						// 	lg: { span: 12, offset: 6 },
						// }}
					>
						<Input placeholder='codigo programa' />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							md: { span: 12, offset: 6 },
						}}
						style={{ textAlign: 'center' }}
					>
						<Button type='primary' htmlType='submit'>
							Agregar
						</Button>
					</Form.Item>
				</Form>
			</Col>
		</Row>
	);
};
