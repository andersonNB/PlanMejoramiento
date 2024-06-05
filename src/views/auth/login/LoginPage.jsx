import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Form, Input, Button, Select } from 'antd';
import { GoogleLogin } from '@react-oauth/google';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import useSelectorLogin from '../../../hooks/selectors/useSelectorLogin';
import AuthContext from '../../../context/auth/AuthContext';
import useSelectorProgramAcademic from '../../../hooks/selectors/useSelectorProgramAcademic';
import useUser from '../../../hooks/selectors/useUser';

const ColUser = styled(Col)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 15px;
	// height: 15vh;
`;

const InputItem = styled(Input)`
	border: 1.5px solid #e7e7e9;
	height: 56px;
	width: 100%;
`;
const InputItemPassword = styled(Input.Password)`
	border: 1.5px solid #e7e7e9;
	height: 56px;
	width: 100%;
`;

const ButtonItem = styled(Button)`
	width: 100%;
	border-radius: 20px;
	height: 46px;
`;

const LoginPage = ({ isAdmin }) => {
	const { signIn } = useSelectorLogin();
	const [form] = Form.useForm();
	const { login } = useContext(AuthContext);
	const { getAllAcademicProgram, academicPrograms } = useSelectorProgramAcademic();
	const { getUserType } = useUser();
	const [typeUser, setTypeUser] = useState();
	const history = useNavigate();

	useEffect(() => {
		getAllAcademicProgram();

		const fetchUserType = async () => {
			try {
				const res = await getUserType();
				setTypeUser(res);
			} catch (error) {
				console.log(error);
			}
		};
		fetchUserType();
	}, [academicPrograms?.length]);

	// console.log({ academicPrograms, typeUser });

	const responseGoogle = (response) => {
		console.log(response);
		const parts = response.credential.split('.');
		if (parts.length !== 3) {
			throw new Error('Invalid token format');
		}
		const lastPath = localStorage.getItem('lastPath') || '/dashboard';
		// console.log(form.getFieldsValue())
		const { pracId, tiusId } = form.getFieldsValue();

		const infoUser = signIn({ token: response.credential, tiusId, pracId });
		console.log(infoUser);
		login(infoUser);

		history(lastPath, {
			replace: true,
		});
	};

	const onSubmitAdmin = (values) => {
		console.log(values);
	};

	return (
		<Row style={{ width: '100%', paddingTop: '10%' }} justify='center' /*gutter={[16, 16]}*/>
			<Row style={{ width: '100%' }} justify='center'>
				<Col xs={20} sm={20} md={12} lg={12}>
					<Row style={{ backgroundColor: '#fafafa', borderRadius: '10px' }} justify='center'>
						<Col xs={20} sm={20} md={24} lg={24} style={{ justifyContent: 'center' }}>
							<h3 style={{ textAlign: 'center', color: 'black' }}>
								{' '}
								Seguimiento y Gestión Plan De Mejoramiento
							</h3>
						</Col>
						<Col xs={20} sm={20} md={24} lg={24} style={{ display: 'flex', justifyContent: 'center', marginBottom: '5%' }}
						>
							<img src='http://www.enjambre.gov.co/imagenes/logo_ufps.png' width={300} />
						</Col>
						{isAdmin ? (
							<Col xs={12} sm={12} md={24} lg={24}>
								<Form name='formLogin' layout='vertical' onFinish={onSubmitAdmin}>
									<Form.Item
										// label='Username'
										name='username'
										rules={[
											{
												required: true,
												message: 'Ingrese un usuario por favor!',
											},
										]}
										wrapperCol={{
											md: { span: 23, offset: 1 },
											lg: { span: 24 },
										}}
										style={{
											width: '90%',
										}}
									>
										<InputItem placeholder='Digite su usuario' />
									</Form.Item>

									<Form.Item
										// label='Password'
										name='password'
										rules={[
											{
												required: true,
												message: 'La contraseña es requerida!',
											},
										]}
										wrapperCol={{
											md: { span: 23, offset: 1 },
											lg: { span: 24 },
										}}
										style={{
											width: '90%',
										}}
									>
										<InputItemPassword placeholder='Contraseña' />
									</Form.Item>

									<Form.Item
										wrapperCol={{
											// offset: 6,
											// span: 12,
											// push:12
											md: { span: 12, offset: 6 },
										}}
										style={{ textAlign: 'center' }}
									>
										<ButtonItem type='primary' htmlType='submit'>
											Iniciar Sesión
										</ButtonItem>
									</Form.Item>
									<Form.Item
										wrapperCol={{
											md: { span: 12, offset: 6 },
										}}
										style={{ textAlign: 'center' }}
									>
										<a href='#' style={{ textDecoration: 'underline' }}>
											Olvide mi contraseña
										</a>
									</Form.Item>
								</Form>
							</Col>
						) : (
							<ColUser xs={22} sm={22} md={24} lg={22}>
								<Form
									style={{
										width: 500,
									}}
									form={form}
								>
									<Form.Item
										name='pracId'
										rules={[
											{
												required: true,
												message: 'Seleccione un programa academico!',
											},
										]}
									>
										<Select placeholder='Programa academico'>
											{academicPrograms.length > 0 &&
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
										name='tiusId'
										rules={[
											{
												required: true,
												message: 'Seleccione un rol!',
											},
										]}
									>
										<Select placeholder='Seleccione un rol'>
											{typeUser?.length > 0 &&
												typeUser.map((type, index) => {
													return (
														<Select.Option key={index} value={type.tiusId}>
															{type.tiusNombre}
														</Select.Option>
													);
												})}
										</Select>
									</Form.Item>

									<Form.Item
										// label='Username'
										name='username'
										rules={[
											{
												required: true,
												message: 'Please input your username!',
											},
										]}
										wrapperCol={{
											md: { span: 12, offset: 6 },
											lg: { span: 12, offset: 6 },
										}}
									>
										<GoogleLogin
											onSuccess={(credentialResponse) => {
												responseGoogle(credentialResponse);
											}}
											onError={(error) => {
												console.log('Login Failed', error);
											}}
										></GoogleLogin>
									</Form.Item>
								</Form>
							</ColUser>
						)}
					</Row>
				</Col>
			</Row>
		</Row>
	);
};

LoginPage.propTypes = {
	isAdmin: PropTypes.bool.isRequired,
};

export default LoginPage;
