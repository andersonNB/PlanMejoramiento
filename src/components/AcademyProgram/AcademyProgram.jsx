import { useEffect } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import TableDinamic from '../Table/Table';
import useSelectorProgramAcademic from '../../hooks/selectors/useSelectorProgramAcademic';

export const AcademyProgram = () => {
	const [form] = Form.useForm();
	const { getAllAcademicProgram, academicPrograms, createAcademicProgram } = useSelectorProgramAcademic();

	// TODO: Mirar por que se llama el servicio 3 veces
	console.log(academicPrograms.length);
	useEffect(() => {
		getAllAcademicProgram();
	}, []);

	const onSubmitProgram = (values) => {
		console.log(values);
		const { pracNombre, pracCodigo } = values;
		createAcademicProgram({ pracNombre, pracCodigo }, values);
		form.resetFields();
	};

	return (
		<Row style={{backgroundColor:"#fafafa", borderRadius:"10px"}} justify="center" gutter={[16, 16]}>
			<Col xs={12} sm={12} md={24} lg={24} >
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			<Col xs={12} sm={12} md={24} lg={24}>
				<Form
					form={form}
					name="formLogin"
					layout="horizontal"
					onFinish={onSubmitProgram}
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
						name="pracNombre"
						rules={[
							{
								required: true,
								message: 'Digite un nombre para el programa académico'
							}
						]}
					>
						<Input placeholder="nombre programa academico" />
					</Form.Item>

					<Form.Item
						label="Codigo"
						name="pracCodigo"
						rules={[
							{
								required: true,
								message: 'Por favor, digite un código para el programa académico'
							}
						]}
					>
						<Input placeholder="codigo programa" type="number" />
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
				<TableDinamic datasource={academicPrograms} />
			</Col>
		</Row>
	);
};
