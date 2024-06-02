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
	background-color: salmon;
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
		<Row style={{ backgroundColor: '#202020', width: '100%' }} justify='center' /*gutter={[16, 16]}*/>
			<Col xs={12} sm={12} md={24} lg={24} style={{ backgroundColor: 'gray' }}>
				<h3 style={{ textAlign: 'center' }}> Seguimiento y Gestión Plan De Mejoramiento</h3>
			</Col>
			{isAdmin ? (
				<Col xs={12} sm={12} md={24} lg={12} style={{ backgroundColor: 'gray' }}>
					<Form name='formLogin' layout='vertical' onFinish={onSubmitAdmin}>
						<Form.Item
							// label='Username'
							name='username'
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
							style={{ backgroundColor: 'red' }}
							wrapperCol={{
								md: { span: 12, offset: 6 },
								lg: { span: 12, offset: 6 },
							}}
						>
							<InputItem placeholder='Digite su usuario' />
						</Form.Item>

						<Form.Item
							// label='Password'
							name='password'
							style={{ backgroundColor: 'yellowgreen' }}
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
							wrapperCol={{
								md: { span: 12, offset: 6 },
								lg: { span: 12, offset: 6 },
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
				<ColUser xs={12} sm={12} md={24} lg={12}>
					<Form style={{ backgroundColor: 'gray', width: 500 }} form={form}>
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
							style={{ backgroundColor: 'red' }}
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
	);
};

LoginPage.propTypes = {
	isAdmin: PropTypes.bool.isRequired,
};

export default LoginPage;
